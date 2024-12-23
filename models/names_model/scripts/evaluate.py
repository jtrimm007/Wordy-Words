import torch
from transformers.tokenization_utils_base import BatchEncoding
from transformers import DistilBertForSequenceClassification, DistilBertTokenizer
from sklearn.metrics import classification_report

# Add BatchEncoding to the safe globals
torch.serialization.add_safe_globals([BatchEncoding])

def load_data(token_path):
    tokens, labels = torch.load(token_path)
    return tokens, labels

if __name__ == "__main__":
    # Load test data
    test_tokens, test_labels = load_data("../data/training_data/test_tokens.pt")
    print(test_tokens)
    print(test_labels)
    # Load fine-tuned model
    model = DistilBertForSequenceClassification.from_pretrained("models/fine_tuned_distilbert")
    tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")

    # Perform inference
    outputs = model(
        input_ids=test_tokens["input_ids"], 
        attention_mask=test_tokens["attention_mask"]
    )
    predictions = torch.argmax(outputs.logits, axis=1).numpy()

    # Evaluate results
    print(classification_report(test_labels, predictions, target_names=["Not a Person Name", "Person Name"]))