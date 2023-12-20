import { EmbedBuilder, InteractionResponse, Message, ModalSubmitInteraction } from "discord.js";

export class MessageError {
  private readonly message: Message | ModalSubmitInteraction;
  private readonly content: string;

  constructor (message: Message | ModalSubmitInteraction, content: string) {
    this.message = message;
    this.content = content;
    this.replyMessage();
  }

  private async replyMessage (): Promise<Message | InteractionResponse> {
    return await this.message.reply({
      embeds: [
        new EmbedBuilder() 
          .setColor("Red")
          .setDescription(this.content)
      ]
    })
  }
}