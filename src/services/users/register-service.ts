import { createUser, findUser } from "@domains/repositories/user";
import { User } from "discord.js";

export const registerUser = async (user: User): Promise<void> => {
  const registeredUser = await findUser(user.id);
  if(!registeredUser) {
    try {
      await createUser({
        id: user.id
      })
    } catch (err) {
      throw err;
    }
  }
}