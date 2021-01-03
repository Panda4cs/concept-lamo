require("dotenv").config();
const { Client } = require("discord.js");
const axios = require("axios");
const bot = new Client();
const subreddit = "dogelore";

let urls = [];
axios(`http://www.reddit.com/r/${subreddit}/.json?&limit=111`)
  .then((data) => {
    let raw = data.data.data.children
      .map((data) => data.data)
      .forEach((img) => {
        if (img.url.includes(`https://i.redd.it/`)) {
          urls.push(img.url);
        }
      });
    console.log(urls);
  })
  .catch((err) => console.log(err));

bot.on("message", (msg) => {
  if (msg.content.toLocaleLowerCase() === "!concept") {
    msg.channel.send(urls[getRndInteger(0, urls.length)]);
  }
});
bot.login(process.env.TOKEN);
// .data.children.map((data) => data.data)
// .images[0].source.url
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
console.log(urls[getRndInteger(0, 112)]);
