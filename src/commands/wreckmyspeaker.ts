import { Command } from "@sapphire/framework";
import { useMainPlayer, useQueue } from "discord-player";
import { GuildMember } from "discord.js";

export class wreckmyspeakerCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			description: "Hehe",
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder //
				.setName(this.name)
				.setDescription(this.description);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		const { voice, options } = this.container.client.utils;
		const player = useMainPlayer();
		const queue = useQueue(interaction.guild!.id);
		const permissions = voice(interaction);
		const member = interaction.member as GuildMember;

		const tracks: string[] = [
			"https://soundcloud.com/vertile-music/no-sleep?si=01d83030641d4de681e5d452d3e99681&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
			"https://soundcloud.com/subzeroproject/dj-isaac-burn-sub-zero-project-remix?si=b58e8409d282477a891d2836ff7e44d9&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
			"https://soundcloud.com/user-660907175/dr-peacock-trip-to-valhalla?si=f9f4aeef29bf47b6bcbf817fa8f65598&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
			"https://soundcloud.com/boudnb/magic-carpet?si=0e0e2393dfd64a8caf2fb8df0acc1426&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
			"https://soundcloud.com/aversionnl/activation?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
		];

		const randomLink: string =
			tracks[Math.floor(Math.random() * tracks.length)];
		const song = await player.search(randomLink);

		const activate = "🔥 | Burning speakers!!!";

		if (!queue) {
			await player.play(member.voice.channel!.id, song, {
				nodeOptions: options(interaction),
			});

			return interaction.reply({
				content: activate,
				ephemeral: true,
			});
		}
		if (!queue.currentTrack) {
			await player.play(member.voice.channel!.id, song, {
				nodeOptions: options(interaction),
			});

			return interaction.reply({
				content: activate,
				ephemeral: true,
			});
		}
		if (permissions.clientToMember) {
			await player.play(member.voice.channel!.id, song, {
				nodeOptions: options(interaction),
			});

			return interaction.reply({
				content: activate,
				ephemeral: true,
			});
		}

		queue.clear();
		queue.node.skip();

		try {
			await player.play(member.voice.channel!.id, song, {
				nodeOptions: options(interaction),
			});

			return interaction.reply({
				content: activate,
			});
		} catch (error: any) {
			await interaction.reply({
				content: "My lighter is gone...",
			});
			return console.log(error);
		}
	}
}
