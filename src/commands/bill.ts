import { Command } from "@sapphire/framework";
import { useMainPlayer, useQueue } from "discord-player";
import type { GuildMember } from "discord.js";

export class BillCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			description: "BROTHER",
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
		);
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		const { emojis, voice, options } = this.container.client.utils;
		const player = useMainPlayer();
		const queue = useQueue(interaction.guild!.id);
		const permissions = voice(interaction);
		const member = interaction.member as GuildMember;

		const activate = `${emojis.success} | **BROTHERMAN BILL ACTIVATED!**`;

		const song = await player.search(
			"https://www.youtube.com/watch?v=6UQ-M6nLfLI"
		);

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
				content: permissions.client,
				ephemeral: true,
			});
		}
		if (permissions.clientToMember) {
			await player.play(member.voice.channel!.id, song, {
				nodeOptions: options(interaction),
			});

			return interaction.reply({
				content: permissions.clientToMember,
				ephemeral: true,
			});
		}

		queue.clear();
		queue.node.skip();

		await player.play(member.voice.channel!.id, song, {
			nodeOptions: options(interaction),
		});

		return interaction.reply({
			content: activate,
		});
	}
}
