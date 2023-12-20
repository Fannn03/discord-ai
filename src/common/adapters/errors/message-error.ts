import { ButtonInteraction, EmbedBuilder, InteractionResponse, Message, ModalSubmitInteraction } from "discord.js";

export class MessageError {
  private readonly message: Message | ModalSubmitInteraction | ButtonInteraction;
  private readonly content: string;

  constructor (message: Message | ModalSubmitInteraction | ButtonInteraction, content: string) {
    this.message = message;
    this.content = content;
    this.replyMessage();
  }

  // TODO: Fix this fckin' bullshit
  private async replyMessage (): Promise<Message | InteractionResponse> {
    if(this.message instanceof ButtonInteraction) {
      return await this.message.reply({
        embeds: [
          new EmbedBuilder() 
            .setColor("Red")
            .setDescription(this.content)
        ]
      })
    }

    return await this.message.reply({
      embeds: [
        new EmbedBuilder() 
          .setColor("Red")
          .setDescription(this.content)
      ]
    })
  }
}