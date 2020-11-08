require('dotenv').config()

const Discord = require('discord.js')

const client = new Discord.Client()

client.on('ready', () => {
    console.log('Ready!')
})

client.on('message', msg => {
    if (msg.system) return
    if (msg.author.bot) return
    if (!msg.content.startsWith('embed\n')) return

    const content = msg.content.slice(6)
    const sections = content.split('\n&&&&\n')
    
    const embed = new Discord.MessageEmbed()
        .setTitle(sections[0])
        .setDescription(sections[1])
    msg.channel.send(embed)
})

client.login()