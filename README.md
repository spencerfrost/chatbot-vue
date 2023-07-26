# SpinnGPT

SpinnGPT is an AI-powered conversational system designed to be an expert on specific, niche topics. Unlike traditional chatbots, this version allows you to train the chatbot on specialized topics, such as video games like ARK and 7 Days to Die, or the documentation of cutting-edge technologies that other chatbots might not be familiar with due to their knowledge cutoff.

## Key Features

- **Niche Topic Expertise:** Train the chatbot on specific topics, such as ARK, 7 Days to Die, or any other niche subject matter. The chatbot will then access the relevant knowledgebase for that topic, enabling it to provide detailed insights and answers.
- **Dynamic Conversations:** The chatbot excels in maintaining context during conversations, creating a seamless and human-like interaction for users.
- **Natural Language Understanding:** It uses advanced natural language processing techniques to grasp user queries accurately and respond in context.
- **Vector Database Namespace:** The chatbot leverages vector database namespaces to store and access knowledge specific to each trained topic, ensuring efficient information retrieval.

## Installation

1. Clone the Expert Chatbot - Specialized Knowledge Edition repository to your local machine.
2. Install dependencies:

```shell
# Install web dependencies
pnpm install

# Install server dependencies
cd server && pnpm install
```

3. Create a .env file to provide the required environment variables

Create a .env file in the root folder of the project to configure the baseUrl of the app:

```
VITE_APP_API_URL=http://localhost:8080
```

Create a .env file *inside the server folder* and configure the following environment variables:

```
# OpenAI API key
OPENAI_API_KEY=""

# Vector database API key
VECTOR_DB_API_KEY=""
VECTOR_DB_NAMESPACE_ARK=""
VECTOR_DB_NAMESPACE_7DTD=""
VECTOR_DB_NAMESPACE_TECH=""
```

## Usage

1. Start the web server:

```shell
pnpm dev
```

2. Start the server:

```shell
cd server && pnpm dev
```

## Getting Started

To interact with the Expert Chatbot - Specialized Knowledge Edition, follow these steps:

1. Follow the above installation steps.
2. Train the chatbot on your desired topic using the appropriate vector database namespace. For example, if you want to train it on ARK, use the `VECTOR_DB_NAMESPACE_ARK`; for 7 Days to Die, use `VECTOR_DB_NAMESPACE_7DTD`, and so on.
3. Launch the chatbot application and access it at `http://localhost:5173/`.
4. Start interacting with the chatbot by asking questions or seeking assistance on the trained topic.

## Usage Examples

- User: "What are the crafting recipes for a metal pickaxe in ARK?"
  Chatbot: "Let me fetch the crafting recipes for a metal pickaxe in ARK..."
  _The chatbot retrieves information from the trained ARK topic and provides the required crafting recipes._

- User: "Explain the horde night mechanics in 7 Days to Die."
  Chatbot: "Sure, let me access my knowledge on horde night mechanics..."
  _The chatbot uses its expertise in 7 Days to Die to provide a detailed explanation of the horde night mechanics._

## Next Steps

The development of the Expert Chatbot - Specialized Knowledge Edition is an ongoing process, with several exciting enhancements planned, including:

- Expanding the range of niche topics that the chatbot can be trained on.
- Improving the accuracy and efficiency of information retrieval from the vector database namespaces.
- Incorporating user feedback to make the chatbot even more helpful and insightful for users.
- Leveraging Langsmith to troubleshoot and debug during the development process.
