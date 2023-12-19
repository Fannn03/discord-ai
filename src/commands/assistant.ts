import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, bold, inlineCode } from "discord.js";
import { commandInterface } from "@domains/models/command";
import { findUser } from "@domains/repositories/user";

export default {
  name: 'assistant',
  aliases: [],
  run: async function (message: Message, args: string[]) {
    const getUser = await findUser(message.author.id);
    const assistant = (getUser?.assistant) ? getUser.assistant : 'not set';

    let text = "";
    text += `${bold('ID :')} ${inlineCode(getUser?.id)}\n`;
    text += `${bold('Assistant :')} ${inlineCode(assistant)}`;

    const embed = new EmbedBuilder()
      .setTitle("ChatAi Assistant")
      .setDescription(text)
      .setTimestamp()
      .setColor("Random")
      .setThumbnail(message.guild?.iconURL() as string)

    const createAssistant = new ButtonBuilder()
      .setCustomId('createAssistant')
      .setLabel("Create Assistant")
      .setStyle(ButtonStyle.Success)
    
    const deleteAssistant = new ButtonBuilder()
      .setCustomId("deleteAssistant")
      .setLabel("Delete Assistant")
      .setStyle(ButtonStyle.Danger)

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(createAssistant, deleteAssistant)
    
    const button = await message.reply({
      embeds: [embed],
      components: [row]
    });

    return setTimeout(async () => {
      createAssistant.setDisabled(true);
      deleteAssistant.setDisabled(true);

      await button.edit({
        embeds: [embed],
        components: [row]
      })
    }, 30000);
  }
} as commandInterface