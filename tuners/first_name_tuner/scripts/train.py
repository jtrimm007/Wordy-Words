import torch
from torch.utils.data import Dataset
from transformers import Trainer, TrainingArguments, DistilBertForSequenceClassification, DistilBertTokenizer

model_dir = "../../../models/first-name-classifier"

torch.set_num_threads(10)  # Use 10 threads for intra-op parallelism
torch.set_num_interop_threads(2)  # Use 2 threads for inter-op parallelism
def load_data(token_path):
    # Load preprocessed tokens and labels
    tokens, labels = torch.load(token_path, weights_only=False)
    return tokens, labels


class CustomDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

# Define the model
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased")

# Define training arguments
training_args = TrainingArguments(
    output_dir="../results/checkpoints/",
    dataloader_num_workers=2,
    num_train_epochs=3,
    per_device_train_batch_size=32,
    per_device_eval_batch_size=32,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="../logs/",
    evaluation_strategy="epoch",
    gradient_accumulation_steps=2,  # Accumulate gradients over 2 steps
    fp16=False,   # Keep evaluation strategy as 'epoch'
)
if __name__ == '__main__':
    from multiprocessing import freeze_support
    freeze_support()

    train_tokens, train_labels = load_data("../data/training_data/train_tokens.pt")
    # Create the dataset
    train_dataset = CustomDataset(train_tokens, train_labels)

       # Load the evaluation data
    eval_tokens, eval_labels = load_data("../data/training_data/test_tokens.pt")
    eval_dataset = CustomDataset(eval_tokens, eval_labels)


    # Define the trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,  
    )

    # Train the model
    trainer.train(resume_from_checkpoint="../results/checkpoints/checkpoint-46266")
    # trainer.train()
        # Save the final model
    model.save_pretrained(model_dir)

    tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
    tokenizer.save_pretrained(model_dir)
    tokenizer

    # Move model to MPS device if available
    device = torch.device("mps" if torch.has_mps else "cpu")
    model.to(device)

    # Switch the model to evaluation mode
    model.eval()

    # Create a dummy input for ONNX export
    dummy_input = tokenizer("Joshua", return_tensors="pt").to(device)

    # Export the model to ONNX
    torch.onnx.export(
        model,                                          # The model to be exported
        (dummy_input["input_ids"], dummy_input["attention_mask"]),  # Model inputs
        model_dir + "/model.onnx",                                   # Path to save the ONNX model
        input_names=["input_ids", "attention_mask"],    # Input names
        output_names=["output"],                        # Output names
        dynamic_axes={"input_ids": {0: "batch_size"}, "attention_mask": {0: "batch_size"}, "output": {0: "batch_size"}},  # Dynamic axes
        opset_version=14                               # ONNX opset version
    )
    print("Model exported to ONNX!")