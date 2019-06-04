const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  const msg = await message.channel.send("Testing ping...");
  const pingEmbed = new Discord.RichEmbed()
    .setColor(bot.embedColor)
    .setDescription(`:stopwatch: ${Math.floor(bot.ping)}ms \n :hourglass_flowing_sand: ${msg.createdTimestamp - message.createdTimestamp}ms`)
  msg.delete()
  message.channel.send(pingEmbed)
};
