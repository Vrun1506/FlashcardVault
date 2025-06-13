<div align="center">
  <img src="https://raw.githubusercontent.com/Vrun1506/FlashcardVault/main/public/images/FlashcardVaultLogo.jpeg" alt="Centered Image" width="300" />
</div>


## Welcome
Welcome to Flashcard Vault where my aim is to help you ace your exams one card at a time. 

This is a project I developed to save people's time when it comes to creating revision resources. 


## Purpose of Project
When it came to studying for my A levels, in some of my subjects, there were limited resources available so I had to be extremely careful and wise with how I used them up while revising for exams. 

Through looking at some revision websites, I found that flashcards were particularly useful with studying certain subjects, but the existing ones were extremely vague and weren't to the required level of detail needed to secure the top grades. 

Through making my own flashcards, I found it to be a painstaking process that would takes months to do for each subject, though once the desired endproduct was achieved, it was really easy to learn. 

Therefore, to tackle this tedious process and save time, I designed my website to facilitate this process by providing premium quality flashcards that have been tried and tested by my friends and I as well as the opportunity to create custom flashcards through the AI Flashcard Maker I have implemented. 


## Tech Stack and languages used

Tech Stack:

<li>Frontend Framework: Next.js
<li>Backend Framework: Flask
<li>Database: PostgreSQL
<li>AI/LLM Integration: OpenRouter API (for Llama 3.3 LLM model), Langchain to implement custom behaviours. 
<li>Cloud Storage: S3 bucket 
<li>Payment Processing: Stripe API

Languages used: JavaScript and Python 


## Installation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


1) Clone the repository:

```bash
git clone https://github.com/Vrun1506/FlashcardVault
```

2) Change into the directory you've cloned by running the following command:
```bash
cd FlashcardVault
```



```bash
# i) Create the virtual environment

## Linux/MacOS
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate # For CMD
source venv/Scripts/activate # For Git Bash
```


3) Download the Python packages by running the following commands:

```bash
# ii) Install the required packages
pip install -r requirements.txt
```


4) Download the JavaScript packages by running the following command:
```bash
#Install the required JavaScript packages
npm install
```

5) Run the Flask server using the following command:
```bash
# Run the Flask server
flask --app server run
```

6) 
run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
