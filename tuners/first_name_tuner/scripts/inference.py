from transformers import DistilBertForSequenceClassification, DistilBertTokenizer
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
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

@app.route('/predict', methods=['POST'])
async def predict():
    print("Request received")
    data = request.json
    print(data)
    word = data.get('word')
    if not word:
        return jsonify({'error': 'No word provided'}), 400

        # Load fine-tuned model and tokenizer
    model = DistilBertForSequenceClassification.from_pretrained("../../../models/first-name-classifier")
    tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")

    # Predict for new words
    # test_word = "t-mobile"
    result = predict_name(word, model, tokenizer)
    print(f"Prediction for '{word}': {result}")

    # result = predict_name(word, model, tokenizer)
    return jsonify({'prediction': result, 'word': word})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
