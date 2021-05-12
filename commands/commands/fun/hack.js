const darkrandom = require("random");
const darkemail = require("random-email"); 
const darkpassword = require("generate-password");

module.exports = {
        commands: 'hack',
        description: 'Hack someone! (fake)',
        expectedArgs: '[user]',
        callback:  async (message) => {

            const impostorpassword = darkpassword.generate({
                length: 10,
                numbers: true,
              });
            
               const user = message.mentions.users.first();
              if (!user) {
                return message.channel.send(hack1);
              } else {
                if (user.bot) {
                return message.channel.send('I can not hack one of my fellow kind');
              }
              }
              const member = message.guild.member(user);
              const mostCommon = [`${hack2}`, `${hack3}`, `${hack3}`, `${hack4}`, `${hack5}`, `${hack6}`];
              const lastdm = [
               `${hack7}`,
                `${hack8}`,
                `${hack9}`,
                `${hack10}`,
              ];
            
             
              message.channel.send(`${hack11} "${member.user.username}" ${hack12}`)
                .then(async (msg) => {
                  setTimeout(async function () {
                    await msg.edit(`[▘] ${hack13}`).catch(() => {});
                  }, 2000);
                  setTimeout(async function () {
                    await msg.edit(
                      `[▝] Email: \`${darkemail({
                        domain: "gmail.com",
                      })}\`\nPassword: \`${impostorpassword}\``
                    ).catch(() => {});
                  }, 4000);
                  setTimeout(async function () {
                    await msg.edit(
                      `[▖] Last DM: "${lastdm[Math.floor(Math.random() * lastdm.length)]}"`
                    ).catch(() => {});
                  }, 6000);
                  setTimeout(async function () {
                    await msg.edit(`[▘] ${hack14}`).catch(() => {});
                  }, 10000);
                  setTimeout(async function () {
                    await msg.edit(
                      `[▝] mostCommon = "${
                        mostCommon[Math.floor(Math.random() * mostCommon.length)]
                      }"`
                    ).catch(() => {});
                  }, 13000);
                  setTimeout(async function () {
                    await msg.edit(`[▗] Finding IP address...`).catch(() => {});
                  }, 17000)
                  setTimeout(async function () {
                    await msg.edit(
                      `[▖] IP address: \`127.0.0.1:${darkrandom.int(100, 9999)}\``
                    ).catch(() => {});
                  }, 20000);
                  setTimeout(async function () {
                    await msg.edit(`[▘] ${hack15}`).catch(() => {});
                  }, 25000);
                  setTimeout(async function () {
                    await msg.edit(`[▝] ${hack16}`).catch(() => {});
                  }, 27000);
                  setTimeout(async function () {
                    await msg.edit(`${hack17} ${member.user.username}`).catch(() => {});
                  }, 32000);
                  setTimeout(async function () {
                    await message.channel.send(
                      `${hack18}`
                    ).catch(() => {});
                  }, 34000);
                });
            
              }}    
      

   