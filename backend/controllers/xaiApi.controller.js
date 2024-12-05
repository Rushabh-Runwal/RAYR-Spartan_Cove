import AIChat from "../models/xaichat.model.js";
import dotenv from "dotenv";
dotenv.config();

export async function saveChat(userId, role, content) {
  let chatSession = await AIChat.findOne({ userId });
  chatSession.messages.push({ role, content });
  await chatSession.save();

  return chatSession;
}

export async function getChatHistory(userId) {
  let chatSession = await AIChat.findOne({ userId });
  if (!chatSession) {
    // Create a new chat session if none exists
    chatSession = await AIChat.create({ userId });
  }
  return chatSession;
}

export async function getGrokResponse(userId, userQuery, onStreamData) {
  // Fetch chat history
  const previousMessages = await getChatHistory(userId);

  const url = "https://api.x.ai/v1/chat/completions";
  const apiKey = process.env.XAI_API_KEY;

  const payload = {
    messages: [
      ...previousMessages.messages,
      {
        role: "user",
        content: userQuery,
      },
    ],
    model: "grok-beta",
    stream: true,
    temperature: 0,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Read the response stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Decode the incoming chunk
      buffer += decoder.decode(value, { stream: true });
      // Split by newline to process each line separately
      let lines = buffer.split("\n");
      buffer = lines.pop(); // Retain incomplete line in the buffer

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          // Remove "data: " prefix and parse JSON
          const jsonLine = line.replace("data: ", "").trim();
          // save all data in the database
          if (jsonLine === "[DONE]") {
            // Stream end signal
            console.log("Stream completed.");
            return;
          }

          try {
            const parsed = JSON.parse(jsonLine);
            if (onStreamData) {
              onStreamData(parsed); // Process parsed JSON
            }
          } catch (error) {
            console.error("Failed to parse JSON:", jsonLine);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching the chat completion:", error);
    throw error;
  }
}
