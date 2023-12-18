import { eventInterface } from "domains/models/event";

export default {
  name: 'ready',
  once: true,
  execute: async function () {
    console.log('bot ready');
  }
} as eventInterface