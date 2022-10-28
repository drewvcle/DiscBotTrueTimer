import { config } from 'dotenv';
config();
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
import schedule from 'node-schedule';

//const { Client, GatewayIntentBits, Partials, Collection, CommandInteractionOptionResolver } = require("discord.js");
import { ChannelType, time, Client, GatewayIntentBits, Partials, Collection, CommandInteractionOptionResolver, userMention, channelMention, roleMention } from 'discord.js';
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
//const { userMention, memberNicknameMention, channelMention, roleMention } = require('discord.js');
//const { time } = require('discord.js');
//const wait = require('node:timers/promises').setTimeout;
import { REST } from '@discordjs/rest';
import { channel } from 'node:diagnostics_channel';

const rest = new REST({ version: '10'}).setToken(TOKEN);
//IMPORTANT: when uploading to GitHub, FileSystem will likely not work. If it doesn't work, check https://github.com/nodejs/node/blob/main/doc/api/fs.md
//var fs = require('fs');
import * as fs from 'node:fs';

// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

function scheduleMessage(){
  const date = new Date (new Date().getTime() + 2000)
  schedule.scheduleJob(date, () => console.log('Scheduled Message!'));
}


// Discord stuff
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

//const { loadEvents } = require("./Handlers/eventHandler");
import { loadEvents } from './Handlers/eventHandler.js';

//client.config = require("./config.json");
//import 'config.json';

//client.events = new Collection();
//loadEvents(client);

const day = 86400000;

// If a certain role and 2 messages are included in a text, the user will be pinged after 24 hours.
client.on('ready', () => {
  console.log('The bot is ready.');
})
 client.on('messageCreate', async message => {
  if(((message.content.includes('<@&892900925071577128>')) || message.content.includes('<@&892901214046535690>')) && message.content.includes('Auctioneer:') && message.content.includes('Auction 1:')){
    const getchannel = await client.channels.fetch(message.channel.id);
    const userping = message.author.id;
    const privchannel = client.channels.cache.get(`892865839374692352`);

    const date = new Date(new Date().getTime() + day);
    const rela = time(date, 'F');
    //interaction.reply({content: `Your message has been scheduled for ${date.toTimeString()}`, ephemeral: true});
    //await message.reply({content: `The auction will end at ` + rela + ".", ephemeral: true});
    schedule.scheduleJob(date, () => {
      //getchannel.send({content: '<@' + userping + '>, the auction has completed.', ephemeral: true});
      privchannel.send('<@' + userping + '>, <#' + getchannel + '> is done.');
      
    });

  }

 }); 



//client.login(client.config.token);
client.login(TOKEN);






// Ping handler after 24 hours...

//git init
// git add *
// git commit -m "some title"
// git branch -M main
// git remote add origin https://github.com/drewvcle/DiscBotHeroku.git
// git push -u origin main

//OR
// git add *
// git commit -m "some title"
// git push


//npm i node-schedule
//npm i discord.js @discordjs/rest
//npm i -D nodemon dotenv