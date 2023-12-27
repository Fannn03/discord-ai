import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, bold, inlineCode } from "discord.js";
import { commandInterface } from "@domains/models/command";
import { findAssistant } from "@domains/repositories/assistant";

export default {
  name: 'assistant',
  aliases: [],
  run: async function (message: Message, args: string[]) {
    const getAssistant = await findAssistant(message.author.id);
    const assistantId =(getAssistant?.assistant_id) ? getAssistant?.assistant_id : 'not set';
    const assistantName = (getAssistant?.name) ? getAssistant.name : 'not set';
    const assistantDesc = (getAssistant?.instructions) ? getAssistant.instructions : 'not set';

    let text = "";
    text += `${bold('ID :')} ${inlineCode(assistantId)}\n`;
    text += `${bold('Name :')} ${inlineCode(assistantName)}\n`;
    text += `${bold('Instructions :')} ${inlineCode(assistantDesc)}`;

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
    
    const selectAssistant = new ButtonBuilder()
      .setCustomId('selectAssistant')
      .setLabel("Select Assistant")
      .setStyle(ButtonStyle.Primary)

    const deleteAssistant = new ButtonBuilder()
      .setCustomId("deleteAssistant")
      .setLabel("Delete Assistant")
      .setStyle(ButtonStyle.Danger)

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        createAssistant,
        selectAssistant,
        deleteAssistant
      )
    
    const button = await message.reply({
      embeds: [embed],
      components: [row]
    });

    return setTimeout(async () => {
      createAssistant.setDisabled(true);
      selectAssistant.setDisabled(true);
      deleteAssistant.setDisabled(true);

      await button.edit({
        embeds: [embed],
        components: [row]
      })
    }, 30000);
  }
} as commandInterface