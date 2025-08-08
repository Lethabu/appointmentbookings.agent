import chainlit as cl
import httpx
import json

@cl.on_message
async def main(message: str):
    """
    Chainlit handler for incoming messages.
    """
    # 1. Prepare the request data
    payload = {
        "messages": [{"role": "user", "content": message}]
    }

    # 2. Make the POST request to the FastAPI endpoint
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post("http://localhost:8000/chat", json=payload, timeout=60)
            response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
            json_response = response.json()
            agent_response = json_response["response"]
            tool_used = json_response["tool_used"]

        except httpx.HTTPStatusError as e:
            await cl.Message(content=f"HTTP error: {e}").send()
            return
        except httpx.RequestError as e:
            await cl.Message(content=f"Request error: {e}").send()
            return
        except json.JSONDecodeError as e:
            await cl.Message(content=f"JSON decode error: {e}").send()
            return

    # 3. Stream the response back to the Chainlit UI
    await cl.Message(content=agent_response, tool_used=tool_used).send()


@cl.on_chat_start
async def start():
    """
    Chainlit handler for chat start.
    """
    await cl.Message(content="Hello! How can I help you today?").send()