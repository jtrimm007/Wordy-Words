import os
import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import DistilBertTokenizer
import torch
from nltk.corpus import wordnet
import nltk
from nltk.corpus import names
import requests
nltk.download('wordnet')

def get_non_human_words_from_wordsapi():
    url = "https://wordsapiv1.p.rapidapi.com/words/"
    headers = {
        "X-RapidAPI-Key": "bfc11aace7mshd9eeab647a1cf6dp1439c5jsn867f9a9c44c3",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
    }
    non_human_words = []

    # Example categories to search for non-human words
    categories = ["animal", "plant", "object", "place"]

    for category in categories:
        response = requests.get(url + category, headers=headers)
        print("response")
        print(response)
        if response.status_code == 200:
            data = response.json()
            if 'results' in data:
                for result in data['results']:
                    if 'synonyms' in result:
                        non_human_words.extend(result['synonyms'])
    
    # Remove duplicates and replace underscores with spaces
    non_human_words = list(set([word.replace('_', ' ') for word in non_human_words]))
        # Create a DataFrame with columns 'Name' and 'Label'
    df = pd.DataFrame(non_human_words, columns=['Names'])
    df['Label'] = 0  # Set the 'Label' column to 1 for all rows
    return df

def human_names():
    # Get human synonyms
    human_words = []

    for synset in wordnet.all_synsets(pos='n'):  # Noun category
        if "person" in synset.lexname():  # Filter out human-related terms
            human_words.extend([lemma.replace('_', ' ') for lemma in synset.lemma_names()])
    
    # Create a DataFrame with columns 'Name' and 'Label'
    df = pd.DataFrame(human_words, columns=['Names'])
    df['Label'] = 1  # Set the 'Label' column to 1 for all rows
    
    return df

def non_human():
    # Get non-human synonyms
    non_human_words = []

    for synset in wordnet.all_synsets(pos='n'):  # Noun category
        if "person" not in synset.lexname():  # Filter out human-related terms
            non_human_words.extend([lemma.replace('_', ' ') for lemma in synset.lemma_names()])
   
    
    # Create a DataFrame with columns 'Name' and 'Label'
    df = pd.DataFrame(non_human_words, columns=['Names'])
    df['Label'] = 0  # Set the 'Label' column to 0 for all rows
    
    return df

def load_csv_files_from_directory(directory):
    # List all files in the directory
    files = os.listdir(directory)
    # Filter out non-CSV files
    csv_files = [f for f in files if f.endswith('.csv')]
    
    # Load all CSV files into a list of DataFrames and drop the first row from each
    dataframes = [pd.read_csv(os.path.join(directory, f)).drop(0).reset_index(drop=True) for f in csv_files]
    
    # Concatenate all DataFrames into a single DataFrame
    combined_df = pd.concat(dataframes, ignore_index=True)
    
    return combined_df

def load_and_split_data(test_size=0.2, random_state=42):
    splits = {'train': 'data/train-00000-of-00001-0e84cb2beba9ea7e.parquet', 'test': 'data/test-00000-of-00001-df4a3dda87fb136c.parquet'}
    df = pd.read_parquet("hf://datasets/jbrazzy/baby_names/" + splits["train"])

    # Add the 'isName' column with a constant value (e.g., True)
    df['Label'] = 1

    # Retain only the 'name' and 'isName' columns
    df = df[['Names', 'Label']]
    
    non_human_df = non_human()
    human = human_names()
    
    # Read the CSV file
    # csv_df = pd.read_csv('../data/non_human_names.csv')

    csv_df = load_csv_files_from_directory('../data/non_human_names')

    # Drop the first row
    csv_df = csv_df.drop(0).reset_index(drop=True)
    non_human_df = non_human_df.drop(0).reset_index(drop=True)


    # Check that there are no strings in the 'Label' column
    if csv_df['Label'].apply(lambda x: isinstance(x, str)).any():
        raise ValueError("The 'Label' column contains string values.")

    df = pd.concat([df, csv_df], ignore_index=True)
    df = pd.concat([df, non_human_df], ignore_index=True)
    df = pd.concat([df, human], ignore_index=True)

    # Create a CSV file from the dataframe
    df.to_csv('../data/merged_data.csv', index=False)

    # Split into train/test sets
    train_data, test_data = train_test_split(df, test_size=test_size, random_state=random_state)
    return train_data, test_data

def tokenize_data(data, tokenizer, max_length=16):
    # Tokenize inputs
    tokenized = tokenizer(
        list(data['Names']), 
        truncation=True, 
        padding='max_length', 
        max_length=max_length, 
        return_tensors="pt"
    )
    # Add labels as tensors
    labels = torch.tensor(data['Label'].values)
    return tokenized, labels

if __name__ == "__main__":
    # File path for the dataset
    # file_path = "data/names_dataset.csv"
    print("ran")
    # Load and split data
    train_data, test_data = load_and_split_data()
    print("141")
    # Initialize tokenizer
    tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
    print("144")
    # Tokenize datasets
    train_tokens, train_labels = tokenize_data(train_data, tokenizer)
    test_tokens, test_labels = tokenize_data(test_data, tokenizer)

    # Save processed data (optional)
    torch.save((train_tokens, train_labels), "../data/training_data/train_tokens.pt")
    torch.save((test_tokens, test_labels), "../data/training_data/test_tokens.pt")