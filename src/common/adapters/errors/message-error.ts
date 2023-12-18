import { EmbedBuilder, Message } from "discord.js";

export class MessageError {
  private readonly message: Message;
  private readonly content: string;

  constructor (message: Message, content: string) {
    this.message = message;
    this.content = content;
    this.replyMessage();
  }

  private async replyMessage (): Promise<Message> {
    return await this.message.reply({
      embeds: [
        new EmbedBuilder() 
          .setColor("Red")
          .setDescription(this.content)
      ]
    })
  }
}