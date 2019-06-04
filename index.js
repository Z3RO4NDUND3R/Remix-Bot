//Init vars
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEverybody: true
})
const config = require("./botconfig")
bot.config = config;
const embedColor = '#000000'
const db = require('quick.db')
const Enmap = require("enmap");
const fs = require("fs");
//Async functions



fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

bot.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    bot.commands.set(commandName, props);
  });
});

bot.login(config.token);
