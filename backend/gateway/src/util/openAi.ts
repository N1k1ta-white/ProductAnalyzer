import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://oddly-skilled-cicada.ngrok-free.app/v1", // LM Studio API endpoint
  apiKey: "sk-no-key-required", // LM Studio doesn't need a key, but OpenAI SDK requires this field
});

export async function chatWithLLM(message: string) {
  const response = await openai.chat.completions.create({
    model: "meta-llama-3.1-8b-instruct", // e.g., "mistral", "llama3"
    messages: [{ role: "system", content: "You are a helpful assistant." }, 
               { role: "user", content: message }],
    max_tokens: 200
  });

  console.log(response.choices[0]?.message?.content);

  return response.choices[0]?.message?.content
}
