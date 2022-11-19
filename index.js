const Discord = require("discord.js");
require("dotenv").config();

var bot_version = require("./package.json");

const nodeVersion = process.version;

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content == "wasted") {
    message.reply("wasted world");
  }
  if (message.content == "java version") {
    message.reply(nodeVersion);
  }

  if (message.content == "version") {
    message.reply(bot_version.version);
  }

  if (message.content == "69") {
    message.reply("NICE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }
});

client.login(process.env.TOKEN);
