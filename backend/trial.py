from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()


client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key= os.getenv("OPENAI_API_KEY"),
)

completion = client.chat.completions.create(
  extra_headers={
    "HTTP-Referer": "<YOUR_SITE_URL>", # Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", # Optional. Site title for rankings on openrouter.ai.
  },
  extra_body={},
  model="meta-llama/llama-3.3-8b-instruct:free",
  messages=[
    {
      "role": "user",
      "content": "What is the best chess opening for white as someone who is rated 2200 ECF and currently plays the Vienna Game and Gambit as white and the French Defence as black?",
    }
  ]
)
print(completion.choices[0].message.content)