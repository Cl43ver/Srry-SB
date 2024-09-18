const { WebEmbed } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "vcfind",
    aliases: ["findvc"],
    description: "Finds and joins the voice channel of a specified user.",
    run: async (message, args, command, client) => {
        message.delete();

       
        const findfdp = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!findfdp) {
            return await message.channel.send("Veuillez mentionner un utilisateur ou fournir son ID.").then(m => deleteMessage(m));
        }


        const voiceChannel = findfdp.voice.channel;

        if (!voiceChannel) {
            return await message.channel.send(`${findfdp.user.tag} n'est pas dans un salon vocal.`).then(m => deleteMessage(m));
        }

        try {

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
                selfDeaf: false,  // si tu veux être mute fdp
            });

            await message.channel.send(`Rejoint le salon vocal de ${findfdp.user.tag}: ${voiceChannel.name}`);
        } catch (error) {
            await message.channel.send("Erreur lors de la tentative de rejoindre le salon vocal.").then(m => deleteMessage(m));
        }
    }
};

async function deleteMessage(me) {
    setTimeout(() => {
        me.delete();
    }, 1000);
}
