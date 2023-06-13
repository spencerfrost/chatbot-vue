# EventConnect AI Chatbot

The EventConnect AI Chatbot is a conversational AI system designed to provide comprehensive assistance and information about the EventConnect app and company. It leverages a powerful language model and integrates with various knowledge bases, codebases, APIs, and databases to deliver accurate and helpful responses to user queries.

## (Planned) Features

- **Natural Language Understanding:** The chatbot utilizes advanced natural language processing techniques to understand user queries and provide contextually relevant answers.
- **Knowledgebase Integration:** It is equipped with a vast knowledgebase that contains information about the EventConnect app and company, enabling it to provide detailed insights and explanations.
- **Codebase Access:** The chatbot has access to the codebase of the EventConnect app, allowing it to retrieve code snippets, explanations, and provide technical assistance.
- **API Integration:** It seamlessly integrates with the EventConnect API, enabling it to fetch real-time data, provide event-related information, and perform various tasks on behalf of the user.
- **Database Connectivity:** The chatbot connects to the EventConnect database, allowing it to retrieve and present data from past events, attendee lists, schedules, and more.
- **Contextual Conversations:** It can maintain context and carry on dynamic conversations, providing a human-like conversational experience to users.

## Installation

1. Clone the EventConnect AI Chatbot repository to your local machine.
2. Install dependencies

```shell
# Install web dependencies
pnpm install

# Install server dependencies
cd server && pnpm install
```

3. Create a .env file to provide the required environment variables

Create a .env file *inside the server folder* and configure the following environment variables:

```
# OpenAI API key
OPENAI_API_KEY=""

# Pinecone vector database API key
PINECONE_API_KEY=""
PINECONE_ENVIRONMENT=""
PINECONE_INDEX=""
```

## Usage

1. Start the web server

```shell
pnpm dev
```

2. Start the server

```shell
cd server && pnpm dev
```

## Getting Started

To interact with the EventConnect AI Chatbot, follow these steps:

1. Follow the above installation steps
2. Launch the chatbot application and access it at `http://localhost:5173/`.
3. Start interacting with the chatbot by asking questions, seeking assistance, or requesting information related to the EventConnect app and company.

## Usage Examples

- User: "What are the upcoming events organized by NSA in the next month?"
  Chatbot: "Here are the upcoming events: [Event 1], [Event 2], [Event 3]."

- User: "What hotels do we have blocks for for XYZ Event?"
  Chatbot: "Sure, let me fetch the attendee list for you..."
  _The chatbot retrieves and presents the hotel block list for Event XYZ._

## Next Steps

The development of the EventConnect AI Chatbot is an ongoing process, with future enhancements planned, including:

- Utilize the GitHub Repo document reader to help it understand a codebase.
- WIP
