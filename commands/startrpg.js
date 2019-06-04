const Discord = require("discord.js");
const db = require("quick.db")

exports.run = async (bot, message, args) => {
  if(db.fetch(`userInfo_${message.author.id}.started`) == true){
    return message.reply("You have already started Ionix RPG!")
  } else
  if(db.fetch(`userInfo_${message.author.id}.started`) == false || db.fetch(`userInfo_${message.author.id}.started`) == 'null') {
    let msg = await message.reply("Creating your profile...")
    db.set(`userInfo_${message.author.id}`, { started: true })
    db.set(`userInfo_${message.author.id}`, { location: 'Sedona Town'})
    db.set(`userInfo_${message.author.id}`, { items: ['Wooden Stick']})
  }
};
