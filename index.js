//Init vars
const config = require("./botconfig")
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEverybody: true
})
const embedColor = '#000000'
const db = require('quick.db')

//Async functions



//Startup events
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("a risky game", {
    type: "PLAYING"
  });
});


bot.on("message", async message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === `ping`) {
    const pingEmbed = new Discord.RichEmbed()
      .setColor(embedColor)
      .setDescription(`:stopwatch: ${bot.ping}`)
    message.channel.send(pingEmbed)
  }
});

//Logging stuff
bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

//Logs into the bot user
bot.login(config.token);
