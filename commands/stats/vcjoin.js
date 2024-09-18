const { WebEmbed } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "vcjoin",
    aliases: ["jrv"],
    description: "Joins a random voice channel in the server.",
    run: async (message, args, command, client) => {
        message.delete();

        const caca = message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE');

        if (caca.size === 0) {
            return await message.channel.send("Aucun salon vocal disponible.").then(m => deleteMessage(m));
        }

        const randomChannel = caca.random();

        try {
            const cotoifdp = joinVoiceChannel({
                channelId: randomChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
                selfDeaf: false,  // met true si tu veux etre mute fdp
            });

            await message.channel.send(`Rejoint le salon vocal : ${randomChannel.name}`);
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
