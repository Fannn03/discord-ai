import { model } from "@domains/schemas";
import { createAssistantInterface } from "@domains/services/assistant";

const assistant = model.assistant;

export const createAssistant = async (data: createAssistantInterface) => {
  try {
    return await assistant.create({
      assistant_id: data.assistant_id,
      user_id: data.user_id,
      name: data.name,
      instructions: data.instructions
    })
  } catch (err) {
    throw err;
  }
}

export const findAllAssistant = async (userId: string) => {
  return await assistant.find({ user_id: userId });
}