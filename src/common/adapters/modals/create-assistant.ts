import { EmbedBuilder, ModalSubmitInteraction, bold, inlineCode } from "discord.js";
import { modalInterface } from "@domains/models/modal";
import { openAI } from "@configs/openai";
import { MessageError } from "../errors/message-error";
import { createAssistant } from "@domains/repositories/assistant";
import { updateuser } from "@domains/repositories/user";

export default {
  name: 'createAssistant',
  execute: async function (interaction: ModalSubmitInteraction) {
    const getAssistantName = interaction.fields.getTextInputValue('name');
    const getIntructions = interaction.fields.getTextInputValue('intructions');

    try {
      const assistant = await openAI.beta.assistants.create({
        instructions: getIntructions,
        name: getAssistantName,
        model: 'gpt-3.5-turbo-16k'
      })

      // Insert user assistant
      const insertAssistant = await createAssistant({
        assistant_id: assistant.id,
        user_id: interaction.user.id,
        name: assistant.name,
        instructions: assistant.instructions
      })

      // Update user assistant
      await updateuser({
        user_id: insertAssistant.user_id,
        assistant_id: insertAssistant.assistant_id
      })

      let textMessage = '';
      textMessage += `${bold('Assistant Id :')} ${inlineCode(insertAssistant.assistant_id)}\n`;
      textMessage += `${bold('Assistant Name :')} ${inlineCode(insertAssistant.name)}\n`;
      textMessage += `${bold('Instructions :')} ${inlineCode(insertAssistant.instructions)}`;

      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setTitle("Asssitant Created")
            .setThumbnail(interaction.guild?.iconURL() as string)
            .setDescription(textMessage)
        ],
      });
    } catch (err: any) {
      throw new MessageError(interaction, err.message);
    }
  }
} as modalInterface