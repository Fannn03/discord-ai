import { Message } from "discord.js";
import { eventInterface } from "domains/models/event";

export default {
  name: 'messageCreate',
  once: false,
  execute: async function (message: Message): Promise<void> {
   if(message.author.bot) return;
  }
} as eventInterface