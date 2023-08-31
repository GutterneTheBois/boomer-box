import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";

export class NickiCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			description: "Displays help for the **BOOMERS** out there.",
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
		const paginatedMessage = new PaginatedMessage();

		const commands = `
			/where: I will join your voice channel.\n
			/what <song/playlist>: Plays the given query in VC.\n
			/nowwhat: Displays what song is currently playing.\n
			/ignore: Skip the song currently playing.\n
			/huh: Lists the current queue.\n
			/pause: What do you think?\n
			/hearingaid <volume %>: Adjusts the volume of the music.\n
			/trash: Clears the current queue.\n
			/parkinson: Shuffles the queue.\n
			/retire: I will disconnect from the VC.\n
			/wreckmyspeaker: I will play crazy music\n
			/bill: Just try it out...`;

		paginatedMessage.addPageEmbed((embed) =>
			embed
				.setColor("Blue")
				.setDescription("Available commands:")
				.setFooter({
					text: commands,
				})
		);

		return paginatedMessage.run(interaction);
	}
}
