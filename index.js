const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEverybody: true
});
const config = require("./botconfig")
const embedColor = '#000000'
const db = require('quick.db')
const chalk = require('chalk')

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("a risky game | Made by Threqt#477", {
    type: "PLAYING"
  });
});

bot.on("message", async message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;



  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(cmd === `ping`){
    const msg = await message.channel.send("Testing ping...");
    const pingEmbed = new Discord.RichEmbed()
      .setColor(bot.embedColor)
      .setDescription(`:stopwatch: ${Math.floor(bot.ping)}ms \n :hourglass_flowing_sand: ${msg.createdTimestamp - message.createdTimestamp}ms`)
    msg.delete()
    message.channel.send(pingEmbed)
  }
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.login(config.token);
