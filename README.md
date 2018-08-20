# wfbot 
[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/seanwlk/wfbot/issues/new)
<p align="center">
    <a href="https://wf.my.com"><img src="https://i.imgur.com/AB5fREI.png"></a> <a href="https://discord.com"><img src="https://discordapp.com/assets/2c21aeda16de354ba5334551a883b481.png"></a> <br>
    Warface Discord bot with useful tools for the community.
</p>

## Functionalities
Among the tools you could find there is stuff like checking current amount of online player per channel, game news, create timers for events that you will host on your server (for example a Marathon run at a certain time but your community is in different timezones, the timer will be the same for everyone), reference to useful materials, game ladders, player statistics and more to come. When you are bored while looking for rooms you can even "chat" with the bot AI and have fun.

To have the full list of commands and functionalities type `!help` in chat.

## Extra features
There are some features that I don't allow all users to use by default to prevent abuse and have a clean backend. For example the event timer can be used only as advanced user and you can simply request it to me by contacting and explaining your reasons, for example, you run a clan that plays a lot of specops and want to schedule the runs, or clanwars, ranked teams, etc...
The same goes for the automatic news setup. The bot is able to push all *new* Warface news on a specific channel of the server. To prevent people from adding the push notification in every channel and flood my database and significantly slow down the experience for everyone.
For both these cases (and future similar commands with similar limitations) just [open an issue](https://github.com/seanwlk/wfbot/issues/new)

## Feedback
If you have any feedback or ideas on new functionalities to be added to the bot please don't hesitate to [open an issue](https://github.com/seanwlk/wfbot/issues/new) or contact me on discord if you see me around, all ideas are very well appreciated since i would like to make an useful tool for everyone.

## Configuration and permissions
I will not configure anything for anyone, you are the one that will have to fix the eventual missing permissions for the bot. **It requires to read, write and send embeds** in the channels. It's up to you to configure it in a way that users won't abuse/spam the commands in normal chats.

## Add to your server
You just have to click [here](https://discordapp.com/oauth2/authorize?client_id=310134676620574720&scope=bot&permissions=67619905) and then select the server you want to add the bot to, like in the following picture.

![example](https://i.imgur.com/HOHUEy7.png)

## Disclaimer 
Take the functionalities as they are, at the moment I do not plan to add a custom prefix per server and deep customization of commands. There can be downtowns of certain commands due to their backend that runs on my homeserver instead of the VPS. I reserve the right of adding/removing/changing features so if something stops working just check `!help`

## Donate
Please consider donating to support the project and maintain the server on which the bot is running. Thanks.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/seanwlk)
