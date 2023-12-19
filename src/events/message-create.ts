import { Message } from "discord.js";
import { RateLimitError } from "openai";
import { openAI } from "@configs/openai";
import { eventInterface } from "@domains/models/event";
import { MessageError } from "@common/adapters/errors/message-error";
import { clientCommands } from "main";
import { commandInterface } from "@domains/models/command";

export default {
  name: 'messageCreate',
  once: false,
  execute: async function (message: Message): Promise<void | Message | MessageError> {
    if(message.author.bot) return;

    // listen command message
    const prefix = process.env.PREFIX as string;
    if(message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(' ');
      const commandName = args.shift();
      
      const command: commandInterface | undefined = clientCommands.find((command: commandInterface) => commandName == command.name || command.aliases.includes(commandName as string));

      if(command) return command.run(message, args);
      else return new MessageError(message, "Command name not found");
    }

    if(message.channelId !== "1186307613231689808") return;
    if(!message.content.length || message.content == " ") return new MessageError(message, "Message prompt cannot has empty or blank value!");

    try {
      await message.channel.sendTyping();

      const completion = await openAI.chat.completions.create({
        model: 'gpt-3.5-turbo-16k-0613',
        messages: [
          {role: "user", content: message.content}
        ]
      })

      await message.channel.sendTyping();
      return await message.reply(completion.choices[0].message.content as string);
    } catch (err: any) {
      if(err instanceof RateLimitError) {
        new MessageError(message, "Rate limit, try again later.");
      } else {
        new MessageError(message, err.message)
      }
    }
  }
} as eventInterface