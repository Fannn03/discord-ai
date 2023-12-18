import { Client, GatewayIntentBits } from "discord.js";
import path from "path";
import fs from "fs";
import 'dotenv/config';
import { eventInterface } from "domains/models/event";

const client: Client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ]
});

const eventPath = path.join(__dirname, './events');
const eventsFolder = fs.readdirSync(eventPath);

for (let event of eventsFolder) {
  const file = path.join(eventPath, event);
  import(file).then((data: eventInterface) => {
    const { name, once, execute } = data.default;

    if(once) {
      client.once(name, (client: Client, ...args: any[]) => execute(client, ...args));
    } else {
      client.on(name, (client: Client, ...args: any[]) => execute(client, ...args));
    }
  })
}

client.login(process.env.TOKEN);