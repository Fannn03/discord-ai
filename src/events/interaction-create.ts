import { BaseInteraction } from "discord.js";
import path from "path";
import fs from "fs";
import { buttonDefaultInterface } from "@domains/models/button";
import { modalDefaultInterface } from "@domains/models/modal";

export default {
  name: 'interactionCreate',
  once: false,
  execute: async function (interaction: BaseInteraction): Promise<void> {
    if(interaction.isButton()) {
      const buttonPath = path.join(__dirname, "../common/adapters/buttons");
      const buttons = fs.readdirSync(buttonPath);

      for (let button of buttons) {
        const file = path.join(buttonPath, button);
        const fileButton: buttonDefaultInterface =  await import(file);
        
        if(fileButton.default.name == interaction.customId) return fileButton.default.execute(interaction);
      }
    }

    if(interaction.isModalSubmit()) {
      // This make every modal submit should use editReply methods
      await interaction.deferReply();

      const modalPath = path.join(__dirname, "../common/adapters/modals");
      const modals = fs.readdirSync(modalPath);

      for (let modal of modals) {
        const file = path.join(modalPath, modal);
        const fileModal: modalDefaultInterface =  await import(file);
        
        if(fileModal.default.name == interaction.customId) return fileModal.default.execute(interaction);
      }
    }
  }
}