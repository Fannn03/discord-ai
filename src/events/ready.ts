import { connectMongodb } from "@configs/mongodb";
import { eventInterface } from "@domains/models/event";

export default {
  name: 'ready',
  once: true,
  execute: async function () {
    try {
      await connectMongodb();
      console.log('bot ready');
    } catch (err) {
      throw err;
    }
  }
} as eventInterface