require('dotenv').config()

const Discord = require('discord.js')

const client = new Discord.Client()

client.on('ready', () => {
    console.log('Ready!')
})

client.on('message', async msg => {
    if (msg.system) return
    if (msg.author.bot) return
    if (!msg.content.startsWith('embed\n')) return

    const hooks = await msg.channel.fetchWebhooks()
    const webhook = hooks.find(h => h.name === 'EmbedItWebhook') || await msg.channel.createWebhook('EmbedItWebhook')

    const content = msg.content.slice(6)
    const sections = content.split('\n&&\n')
    
    msg.delete()

    webhook.send({
        username: msg.member.nickname || msg.author.username,
        avatarURL: msg.author.displayAvatarURL(),
        embeds: [{
            title: sections[0],
            description: sections[1]
        }]
    })
})

client.login()