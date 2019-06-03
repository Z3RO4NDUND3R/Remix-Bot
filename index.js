//Init vars
const config = require("./botconfig")
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEverybody: true
})
const embedColor = '#000000'

//Async functions

//Startup events
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});

//Command events
bot.on("message", async message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === `ping`) {
    const pingEmbed = new Discord.RichEmbed()
      .setColor(embedColor)
      .setDescription(`:stopwatch: ${client.ping}`)
    message.channel.send(pingEmbed)
  }
})

bot.login(config.token);
