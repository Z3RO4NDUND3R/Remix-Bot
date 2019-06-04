module.exports = (bot) => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("a risky game | Made by Threqt#477", {
    type: "PLAYING"
  });
};
