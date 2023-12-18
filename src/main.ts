import { Client, GatewayIntentBits } from "discord.js";
import 'dotenv/config';

const client: Client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ]
});

client.login(process.env.TOKEN);
client.on('ready', () => {
  console.log('bot ready');
})