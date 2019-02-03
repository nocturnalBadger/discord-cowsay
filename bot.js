var cowsay = require('cowsay');
var Discord = require('discord.js');
var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', message => {
    if (message.content.startsWith('cowsay')) {
        var text = message.content.split('cowsay')[1];

        var cowSaid = cowsay.say({
            text: text,
        });

        message.channel.send('```' + cowSaid + '```');

    }
    else if (message.content.startsWith('cowthink')) {
        var text = message.content.split('cowthink')[1];

        var cowSaid = cowsay.think({
            text: text,
        });

        message.channel.send('```' + cowSaid + '```');

    }
});

