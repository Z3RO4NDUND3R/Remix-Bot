module.exports = (bot, member) => {
  db.set(`userInfo_${member.user.id}`, { started: false })
};
