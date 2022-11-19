const Discord = require("discord.js");
const generateImage = require("./generateimage");
require("dotenv").config();

var bot_version = require("./package.json");

const nodeVersion = process.version;

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = {
  client, 
  prefix: "h.",
  owners: ["290544333843857418"]
}

// client.commands = new Discord.Collection()
// client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()
// client.buttons = new Discord.Collection()

// client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
// client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
// client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)

// client.loadEvents(bot, false)
// client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
// client.loadButtons(bot, false)


module.exports = bot 

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

const welcomeChannelId = "1043521776799461416";

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}> Welcome to the server!`,
    files: [img],
  });
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return 
  if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

  const slashcmd = client.slashcommands.get(interaction.commandName)

  if (!slashcmd) return interaction.reply("Invalid slash command")

  if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm))
      return interaction.reply("You do not have permission for this command")

  slashcmd.run(client, interaction)
})

client.login(process.env.TOKEN);
