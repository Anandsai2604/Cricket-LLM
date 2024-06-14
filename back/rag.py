

import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch
import numpy as np
import sys
import json
import re
from transformers import pipeline, AutoTokenizer, AutoModel

# Function to remove citation references
def clean_text(text):
    text =  re.sub(r'\[\d+\]', '', text)
    text = re.sub(r'\([^)]*\)', '', text)   
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Input and output file names
file1 = "chunks_and_embeddings_df.json"
file2 = "basic.json"
file3 = "tbasic.json"
file4 = "datap.json"
output_file = "combined_chunks_and_embeddings_df.json"

# Read JSON files into pandas DataFrames
df1 = pd.read_json(file1)
df2 = pd.read_json(file2)
df3 = pd.read_json(file3)
df4 = pd.read_json(file4)

# Clean the text in the chunks
df1["chunk"] = df1["chunk"].apply(clean_text)
if 'chunk' in df2.columns:  
    df2["chunk"] = df2["chunk"].apply(clean_text)
elif 'context' in df2.columns:  
    df2["context"] = df2["context"].apply(clean_text)

if 'chunk' in df3.columns:  
    df3["chunk"] = df3["chunk"].apply(clean_text)
elif 'context' in df3.columns:  
    df3["context"] = df3["context"].apply(clean_text)

if 'chunk' in df4.columns:  
    df4["chunk"] = df4["chunk"].apply(clean_text)
elif 'context' in df4.columns:  
    df4["context"] = df4["context"].apply(clean_text)

# Extract embeddings and chunks from each DataFrame
embeddings1 = np.array(df1["embedding"].to_list())
chunks1 = df1["chunk"].to_list()

if 'chunk' in df2.columns:  
    embeddings2 = np.array(df2["embedding"].to_list())
    chunks2 = df2["chunk"].to_list()
elif 'context' in df2.columns:  
    embeddings2 = np.array(df2["embedding"].to_list())
    chunks2 = df2["context"].to_list()
else:
    raise KeyError("The second JSON file does not have 'chunk' or 'context' column.")

if 'chunk' in df3.columns:  
    embeddings3 = np.array(df3["embedding"].to_list())
    chunks3 = df3["chunk"].to_list()
elif 'context' in df3.columns:  
    embeddings3 = np.array(df3["embedding"].to_list())
    chunks3 = df3["context"].to_list()
else:
    raise KeyError("The third JSON file does not have 'chunk' or 'context' column.")

if 'chunk' in df4.columns:  
    embeddings4 = np.array(df4["embedding"].to_list())
    chunks4 = df4["chunk"].to_list()
elif 'context' in df4.columns:  
    embeddings4 = np.array(df4["embedding"].to_list())
    chunks4 = df4["context"].to_list()
else:
    raise KeyError("The fourth JSON file does not have 'chunk' or 'context' column.")

combined_embeddings = np.concatenate((embeddings1, embeddings2, embeddings3, embeddings4), axis=0)
combined_chunks = chunks1 + chunks2 + chunks3 + chunks4

combined_df = pd.DataFrame({
    "chunk": combined_chunks,
    "embedding": combined_embeddings.tolist() 
})

combined_df = combined_df.drop_duplicates(subset="chunk")

combined_df.to_json(output_file, orient="records", lines=True)

df_combined = pd.read_json(output_file, lines=True)

if len(sys.argv) > 1:
    query = ' '.join(sys.argv[1:])
else:
    query = input("Enter your query: ")

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
query_emb = embedding_model.encode(query, convert_to_tensor=True)

embeddings_tensor = torch.tensor(np.array(df_combined["embedding"].to_list()), dtype=torch.float)
dot = util.dot_score(query_emb, embeddings_tensor)
top = torch.topk(dot, k=5)

top_chunks = []
for score, idx in zip(top.values[0], top.indices[0][:5]):
    idx_item = idx.item()
    if 0 <= idx_item < len(df_combined['chunk']):
        chunk_text = df_combined['chunk'][idx_item]
        top_chunks.append(chunk_text)

combined_answer = " ".join(top_chunks)

response_data = {"result": combined_answer}
print(json.dumps(response_data))

