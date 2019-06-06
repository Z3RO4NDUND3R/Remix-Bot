const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEverybody: true
});
const config = require("./botconfig")
const embedColor = '#000000'
const db = require('quick.db')
const chalk = require('chalk')
const moment = require('moment')

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("a risky game | Made by Threqt#477", {
    type: "PLAYING"
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on("guildMemberAdd", async member => {
  db.set(`rpgInfo_${member.user.id}.started`, false)
})

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.on("message", async message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;



  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  //Economy
  if (cmd === `bal`) {
    let user = message.mentions.members.first() || message.author;

    let money = db.fetch(`userInfo_${user.id}.balance`)
    if (money == null) money = 0;

    message.channel.send(`${user} has $${money}`)
  } else
  if (cmd === `work`) {
    let workarr = [1, 1, 2]
    let rng = workarr[Math.floor(Math.random() * workarr.length)]
    let moneyplus = getRandomInt(6, 100)
    let moneyminus = getRandomInt(20, 60)
    switch (rng) {
      case 1:
        db.add(`userInfo_${message.author.id}.balance`, moneyplus)
        const workEmbed = new Discord.RichEmbed()
          .setColor(bot.embedColor)
          .setDescription(`${message.author} has gained $${moneyplus}`)
        message.channel.send(workEmbed)
        return;
      case 2:
        db.subtract(`userInfo_${message.author.id}.balance`, moneyminus)
        const workEmbed2 = new Discord.RichEmbed()
          .setColor(bot.embedColor)
          .setDescription(`${message.author} has lost $${moneyminus}`)
        message.channel.send(workEmbed2)
        return;
    }
  } else
    //Utility
    if (cmd === `ping`) {
      const msg = await message.channel.send("Testing ping...");
      const pingEmbed = new Discord.RichEmbed()
        .setColor(bot.embedColor)
        .setDescription(`:stopwatch: ${Math.floor(bot.ping)}ms \n:hourglass_flowing_sand: ${msg.createdTimestamp - message.createdTimestamp}ms`)
      msg.delete()
      message.channel.send(pingEmbed)
    } else
  if (cmd === `kick`) {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    let role = message.member.guild.roles.find(r => r.name === "Moderator")
    if (!message.member.highestRole.position >= role.position) {
      return message.channel.send("Insufficient Permissions")
    }
    if (kUser.user.id == message.author.id) {
      return message.channel.send("Cannot Kick Yourself!!")
    }
    if (kUser.highestRole.position >= message.member.highestRole.position) {
      return message.channel.send("Can't kick this person!")
    }
    let kickEmbed = new Discord.RichEmbed()
      .setColor(embedColor)
      .setDescription(`Kicked  User: ${kUser} with ID ${kUser.id} \nKicked By: <@${message.author.id}> with ID ${message.author.id} \nKicked In: ${message.channel.name} \nKick Time: ${message.createdAt} \nKick Reason: ${kReason}`)

    message.guild.member(kUser).kick(kReason);
    return message.channel.send(kickEmbed);
  } else
  if (cmd === `ban`) {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    let role = message.member.guild.roles.find(r => r.name === "Moderator")
    if (!message.member.highestRole.position >= role.position) {
      return message.channel.send("Insufficient Permissions")
    }
    if (bUser.user.id == message.author.id) {
      return message.channel.send("Cannot Ban Yourself!!")
    }
    if (bUser.highestRole.position >= message.member.highestRole.position) {
      return message.channel.send("Can't ban this person!")
    }
    let banEmbed = new Discord.RichEmbed()
    banEmbed.setcolor(embedColor)
    banEmbed.setDescription(`Banned User: ${bUser} with ID ${bUser.id} \nBanned By: <@${message.author.id}> with ID ${message.author.id} \nBanned In: ${message.channel.name} \nBanned Time: ${message.createdAt} \nBanned Reason: ${bReason}`)

    message.guild.member(bUser).ban(banReason);
    return message.channel.send(banEmbed);

  } else
    //Threqt's RPG (Wink)
    if (cmd === `startrpg`) {
      if (db.fetch(`rpgInfo_${message.author.id}.started`) == true) {
        return message.channel.send("You have already started Ionix RPG!").then(m => m.delete(5000))
      }
      if (db.fetch(`rpgInfo_${message.author.id}.started`) == false) {
        await message.channel.send("Creating profile...")
        db.set(`rpgInfo_${message.author.id}.started`, true)
        await message.channel.send('Setting location..')
        db.set(`rpgInfo_${message.author.id}.locaton`, 'Sedona Town')
        await message.channel.send('Adding items data..')
        db.set(`rpgInfo_${message.author.id}.items`, [])
        let woodenSword = {
          name: 'Wooden Sword',
          type: 'Weapon',
          description: 'A sturdy wooden sword that is used for practice.',
          stats: {
            damage: 10,
            upgrades: 0,
            upgradesLeft: 7
          }
        }
        db.push(`rpgInfo_${message.author.id}.items`, woodenSword)
        await message.channel.send("Finishing Up...")
        db.set(`rpgInfo_${message.author.id}.equippedWeapon`, woodenSword)
        console.log(db.fetch(`rpgInfo_${message.author.id}.items`))
        message.channel.send("Initiation complete; Welcome to Ionix RPG.")
      }
    } else
  if (cmd === `resetstats`) {
    if (!args[0]) return;
    if (args[0].includes('<@') && message.author.id == '28015677368251187') {
      let user = message.mentions.users.first()
      if (user.bot) return;
      if (db.fetch(`rpgInfo_${user.id}.started`) == true) {
        let arr = db.fetch(`rpgInfo_${user.id}`)
        Object.keys(arr).forEach(function(key, index) {
          db.delete(`rpgInfo_${user.id}.${key}`)
        });
        db.set(`rpgInfo_${user.id}.started`, false)
        message.channel.send(`Successfully reset stats for ${user.username}`)
      } else {
        message.channel.send(`Could not reset stats for ${user.username} because the user has not started Ionix RPG.`)
      }
    } else
    if (args[0].toLowerCase() == 'allguild' && message.author.id == '280156773682511872') {
      let guildname = message.content.toLowerCase().slice(message.content.toLowerCase().indexOf('allguild') + 9, message.content.size)
      let guild = bot.guilds.find(g => g.name.toLowerCase() == guildname.toLowerCase())
      if (!guild) {
        return message.channel.send("Invalid Guild")
      }
      guild.members.forEach(m => {
        let user = m.user
        if (user.bot) return;
        if (db.fetch(`rpgInfo_${user.id}.started`) == true) {
          let arr = db.fetch(`rpgInfo_${user.id}`)
          Object.keys(arr).forEach(function(key, index) {
            db.delete(`rpgInfo_${user.id}.${key}`)
          });
          db.set(`rpgInfo_${user.id}.started`, false)
          message.channel.send(`Successfully reset stats for ${user.username}`)
        } else {
          message.channel.send(`Could not reset stats for ${user.username} because the user has not started Ionix RPG.`)
        }
      })
    }
  }
});

bot.login(config.token);
