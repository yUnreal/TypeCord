import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { GuildWelcomeScreen } from "../utils/Routes";
import type { GuildWelcomeScreenData, GuildWelcomeScreenEditOptions, RawWelcomeScreenChannel } from "../types";

export class WelcomeScreen extends Basic {
    public description: string | undefined;
    public welcomeChannels: RawWelcomeScreenChannel[] | undefined;
    public guild: Guild;

    constructor(data: GuildWelcomeScreenData, client: Client, guild: Guild) {
        super(client);

        this.description = data.description;
        this.welcomeChannels = data.welcome_channels;
        this.guild = guild;

        Object.assign(this, data);
    }

    /**
     * Edit the welcome's screen's options
     * @param {GuildWelcomeScreenEditOptions} options - Options to edit
     * @returns {Promise<WelcomeScreen>}
     */

    async edit(options: GuildWelcomeScreenEditOptions): Promise<WelcomeScreen> {
        const { data }: { data: GuildWelcomeScreenData; } = await rest.patch(GuildWelcomeScreen(this.guild.id), { enabled: options.enabled, welcome_channels: options.welcome_channels, description: options.description }, { headers: { Authorization: this.client.auth, "X-Audit-Log-Reason": options.reason } });

        return new WelcomeScreen(data, this.client, this.guild);
    }
}