import { model } from "@domains/schemas";
import { createUserInterface, updateUserInterface } from "@domains/services/user";

const user = model.user;

export const createUser = async (data: createUserInterface) => {
  try {
    return await user.create({
      id: data.id
    })
  } catch (err) {
    throw err;
  }
}

export const findUser = async (id: string) => {
  return await user.findOne({
    id: id
  })
}

export const updateuser = async (data: updateUserInterface) => {
  try {
    await user.updateOne({ id: data.user_id }, {
      assistant: data.assistant_id
    })
  } catch (err) {
    throw err;
  }
}
