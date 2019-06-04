const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  const pingEmbed = new Discord.RichEmbed()
    .setColor(bot.embedColor)
    .setDescription(`:stopwatch: ${Math.floor(bot.ping)}`)
  message.channel.send(pingEmbed)
};
