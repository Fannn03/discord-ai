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
import { commandDefaultInterface, commandInterface } from "@domains/models/command";

const client: Client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds
  ]
});

export const clientCommands: commandInterface[] = [];

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

const commandPath = path.join(__dirname, './commands');
const commandsFolder = fs.readdirSync(commandPath);

for (let command of commandsFolder) {
  const file = path.join(commandPath, command);
  import(file).then((data: commandDefaultInterface) => {
    const { name, aliases, run } = data.default;

    const payload = {
      name: name,
      aliases: aliases,
      run: run
    }

    clientCommands.push(payload);
  })
}

client.login(process.env.TOKEN);