const Guild = require('@schemas/Guild');
module.exports = {
    commands: ["dicksize", "ds", "pp" ,"ppsize"],
	description: "Shows you your PP size",
    callback: async (message) => {
		let user = message.mentions.users.first();
		if (!user) {
			user = message.author;
		}
		const size = (user.id.slice(-3) % 20) + 1;
		const sizee = size/2.54
		const random = (user.id.slice(-6) % 40) + 3;
		await message.channel.send({
			embed: {
				color: 'LUMINOUS_VIVID_PINK',
				description: `${sizee.toFixed(2)} inch\n8${"=".repeat(size)}D`,
			},
		});
	}
};
