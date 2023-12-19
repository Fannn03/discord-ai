import { model } from "@domains/schemas";
import { createUserInterface } from "@domains/services/user";

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
