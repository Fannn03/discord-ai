import { BaseInteraction } from "discord.js";
import path from "path";
import fs from "fs";
import { buttonDefaultInterface } from "@domains/models/button";

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
  }
}