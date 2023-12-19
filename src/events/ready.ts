import { connectMongodb } from "@configs/mongodb";
import { eventInterface } from "@domains/models/event";
import { clientCommands } from "main";

export default {
  name: 'ready',
  once: true,
  execute: async function (): Promise<void> {
    try {
      await connectMongodb();
      console.log(`loaded ${clientCommands.length} commands`);
      console.log('bot ready');
    } catch (err) {
      throw err;
    }
  }
} as eventInterface