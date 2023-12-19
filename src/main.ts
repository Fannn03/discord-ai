import moduleAlias from "module-alias";
moduleAlias.addAliases({
  "@common": __dirname + "/common",
  "@configs": __dirname + "/configs",
  "@domains": __dirname + "/domains",
});

import 'module-alias/register';
import { Client, GatewayIntentBits } from "discord.js";
import path from "path";
import fs from "fs";
import 'dotenv/config';
import { eventDefaultInterface } from "@domains/models/event";

const client: Client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds
  ]
});

const eventPath = path.join(__dirname, './events');
const eventsFolder = fs.readdirSync(eventPath);

for (let event of eventsFolder) {
  const file = path.join(eventPath, event);
  import(file).then((data: eventDefaultInterface) => {
    const { name, once, execute } = data.default;
    
    if(once) {
      client.once(name, (...args: any) => execute(...args));
    } else {
      client.on(name, (...args: any) => execute(...args));
    }
  })
}

client.login(process.env.TOKEN);