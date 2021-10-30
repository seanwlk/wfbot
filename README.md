# wfbot 
[![made-with-nodejs](https://img.shields.io/badge/Made%20with-Node.js-1f425f.svg)](https://nodejs.org) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/seanwlk/wfbot/issues/new) [![LICENSE !](https://img.shields.io/github/license/seanwlk/wfbot)](https://github.com/seanwlk/wfbot/blob/master/LICENSE) 
<p align="center">
    <a href="https://wf.my.com"><img src="https://i.imgur.com/AB5fREI.png"></a> <a href="https://discord.com"><img src="https://discordapp.com/assets/2c21aeda16de354ba5334551a883b481.png"></a> <br>
    Warface Discord bot with useful tools for the community.
</p>

## Functionalities
Among the tools you could find there is stuff like checking current amount of online player per channel, game news, reference to useful materials, game ladders, player statistics and more to come.
The list of available commands will be registered in the chat (if the bot has the correct permissions) and you will be able to access them by typing `/`

## Prefix
This version of wfbot has no prefix but uses the new slash commands standard released by Discord which will be mandatory from May 2022.

## Language
The default language is English but a user with `ADMINISTRATOR` permissions in a server can set a supported language by using `/language` command. 
If your language is not currently supported you are more than welcome to submit one either by opening a pull request and creating a language.json file that you can find in `langs` folder or send the file to me via DM on discord and I'll add it.<br>
NOTE: the current slash commands implementation does not allow a proper way to configure command aliases in other languages. Hopefully in a future release of Discord APIs this will be possible.

## News channel setup
To setup a news channel you can use the command `/push_news #news_channel_name` but there are a few conditions.
- Only server owner is able to use said command
- It is possible to configure only **one** channel by type for each server (you can add PC international, PC Russia, Xbox, Playstation news to the same server)

## Feedback
If you have any feedback or ideas on new functionalities to be added to the bot please don't hesitate to [open an issue](https://github.com/seanwlk/wfbot/issues/new) or contact me on discord if you see me around, all ideas are very well appreciated since i would like to make an useful tool for everyone.

## Configuration and permissions
I will not configure anything for anyone, you are the one that will have to fix the eventual missing permissions for the bot. **It requires to read, write and send embeds** in the channels. It's up to you to configure it in a way that users won't abuse/spam the commands in normal chats.

## Add to your server
You just have to click [here](https://discord.com/oauth2/authorize?client_id=310134676620574720&scope=bot+applications.commands&permissions=67619905) and then select the server you want to add the bot to, like in the following picture.

![example](https://i.imgur.com/dT5NWjS.png)

## Disclaimer 
Take the functionalities as they are, at the moment I do not plan to add a custom prefix per server and deep customization of commands. There can be downtimes of certain commands due to their backend that runs on my homeserver instead of the VPS. I reserve the right of adding/removing/changing features.

## Donate
Please consider donating to support the project and maintain the server on which the bot is running. Thanks.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/seanwlk)
