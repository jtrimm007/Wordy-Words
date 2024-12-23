import pandas as pd
from sklearn.model_selection import train_test_split

import pandas as pd

splits = {'train': 'data/train-00000-of-00001-0e84cb2beba9ea7e.parquet', 'test': 'data/test-00000-of-00001-df4a3dda87fb136c.parquet'}
df = pd.read_parquet("hf://datasets/jbrazzy/baby_names/" + splits["train"])

# Add the 'isName' column with a constant value (e.g., True)
df['Label'] = 1

# Retain only the 'name' and 'isName' columns
df = df[['Names', 'Label']]

# Read the CSV file
csv_df = pd.read_csv('./classifiers/non_human_names.csv')

df = pd.concat([df, csv_df], ignore_index=True)

# Split into train/test sets
train_data, test_data = train_test_split(df, test_size=0.2, random_state=42)