const Discord = require("discord.js");
const generateImage = require("./generateimage");
require("dotenv").config();

var bot_version = require("./package.json");

const nodeVersion = process.version;

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
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

const welcomeChannelId= "1043521776799461416"

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member)
  member.guild.channels.cache.get(welcomeChannelId).send({
      content: `<@${member.id}> Welcome to the server!`,
      files: [img]
  })
})

client.login(process.env.TOKEN);
