from transformers import DistilBertForSequenceClassification, DistilBertTokenizer
import torch

def predict_name(word, model, tokenizer):
    # Tokenize the input word
    tokens = tokenizer(word, truncation=True, padding='max_length', max_length=16, return_tensors="pt")
    print(tokens)
    # Perform inference
    outputs = model(**tokens)
    print(outputs.logits)
    prediction = torch.argmax(outputs.logits).item()
    print(prediction)

    # Map predictions to labels
    labels = ["Not a Person Name", "Person Name"]
    return labels[prediction]

if __name__ == "__main__":
    # Load fine-tuned model and tokenizer
    model = DistilBertForSequenceClassification.from_pretrained("models/fine_tuned_distilbert")
    tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")

    # Predict for new words
    test_word = "City"
    result = predict_name(test_word, model, tokenizer)
    print(f"Prediction for '{test_word}': {result}")