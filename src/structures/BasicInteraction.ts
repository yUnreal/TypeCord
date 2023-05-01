import { Basic } from "./Basic";
import { User } from "../managers/User";
import { Guild } from "../managers/Guild";
import { Client } from "../entities/Client";
import { Message } from "../managers/Message";
import { Snowflake } from "../types/Snowflake";
import { GuildMember } from "../managers/GuildMember";
import { ComponentTypes } from "../props/ComponentTypes";
import { ContextMenuTypes } from "../props/ContextMenuTypes";
import { InteractionTypes } from "../props/InteractionTypes";
import { IInteractionData } from "../interfaces/IInteractionData";
import { RawInteractionData } from "../interfaces/IRawInteractionData";

export class BasicInteraction extends Basic implements RawInteractionData {
    public id: Snowflake;
    public application_id: Snowflake;
    public type: InteractionTypes;
    public data?: IInteractionData;
    public guild: Guild;
    public channel_id?: Snowflake;
    public member?: GuildMember;
    public user?: User;
    public token: string;
    public version: number;
    public message?: Message;
    public app_permissions?: string;
    public locale?: string;
    public guild_locale?: string;
    public component_type?: ComponentTypes;
    public creation_timestamp: number;
    public creation_date: Date;

    /**
     * Represents a basic interaction
     * @param {RawInteractionData} data - The minimum data for a interaction
     * @param {Client} client - The client for the BasicInteraction
     * @constructor
     */

    constructor(data: RawInteractionData, client: Client) {
        super(client);

        this.id = data.id;
        this.application_id = data.application_id;
        this.type = data.type;
        this.data = data.data;
        this.guild = new Guild(data.guild, this.client);
        this.channel_id = data.channel_id;
        this.member = data.member ? new GuildMember(data.member, this.client, this.guild.id) : void 0;
        this.user = data.user ? new User(data.user, this.client) : void 0;
        this.token = data.token;
        this.version = data.version;
        this.message = data.message ? new Message(data.message, this.client) : void 0;
        this.app_permissions = data.app_permissions;
        this.locale = data.locale;
        this.guild_locale = data.guild_locale;
        this.component_type = this.data?.component_type;
        this.data?.type;
        this.creation_timestamp = (+this.id / 4194304) + 1420070400000;
        this.creation_date = new Date(this.creation_timestamp);

        Object.assign(this, data);
    };

    /**
     * Check if the interaction was used in a cached guild
     * @returns {boolean}
     */

    inCachedGuild(): boolean {
        return this.client.guilds.cache.has(this.guild.id);
    };

    /**
     * Check if the interaction was used in an uncached guild
     * @returns {boolean}
     */

    inUncachedGuild(): boolean {
        return !this.client.guilds.cache.has(this.guild.id);
    };

    /**
     * Check if the interaction was used in a guild
     * @returns {boolean}
     */

    inGuild(): boolean {
        return this.guild.id ? true : false;
    };

    /**
     * Check if the interaction is an application command autocomplete
     * @returns {boolean}
     */

    isApplicationCommandAutocomplete(): boolean {
        return this.type === InteractionTypes.ApplicationCommandAutocomplete;
    };

    /**
     * Check if the interaction is a modal submit interaction
     * @returns {boolean}
     */

    isModalSubmit(): boolean {
        return this.type === InteractionTypes.ModalSubmit;
    };

    /**
     * Check if the interaction is a message component interaction
     * @returns {boolean}
     */

    isMessageComponent(): boolean {
        return this.type === InteractionTypes.MessageComponent;
    };

    /**
     * Check if the interaction is an application command
     * @returns {boolean}
     */

    isApplicationCommand(): boolean {
        return this.type === InteractionTypes.ApplicationCommand;
    };

    /**
     * Check if the interaction is a button
     * @returns {boolean}
     */

    isButton(): boolean {
        return this.component_type === ComponentTypes.Button;
    };

    /**
     * Check if the interaction is a channel select menu
     * @returns {boolean}
     */

    isChannelSelectMenu(): boolean {
        return this.component_type === ComponentTypes.ChannelSelectMenu;
    };

    /**
     * Check if the interaction is a string select menu
     * @returns {boolean}
     */

    isStringSelectMenu(): boolean {
        return this.component_type === ComponentTypes.StringSelectMenu;
    };

    /**
     * Check if the interaction is an user select menu
     * @returns {boolean}
     */

    isUserSelectMenu(): boolean {
        return this.component_type === ComponentTypes.UserSelectMenu;
    };

    /**
     * Check if the interaction is a role select menu
     * @returns {boolean}
     */

    isRoleSelectMenu(): boolean {
        return this.component_type === ComponentTypes.RoleSelectMenu;
    };

    /**
     * Check if the interaction is a mentionable select menu
     * @returns {boolean}
     */

    isMentionableSelectMenu(): boolean {
        return this.component_type === ComponentTypes.MentionableSelectMenu;
    };

    /**
     * Check if the interaction is any select menu (String, Channel, Mentionable, Role or User)
     * @returns {boolean}
     */

    isAnySelectMenu(): boolean {
        return [ComponentTypes.StringSelectMenu, ComponentTypes.ChannelSelectMenu, ComponentTypes.MentionableSelectMenu, ComponentTypes.RoleSelectMenu, ComponentTypes.UserSelectMenu].includes(this.component_type!);
    };

    /**
     * Check if the interaction is a text input
     * @returns {boolean}
     */

    isTextInput(): boolean {
        return this.component_type === ComponentTypes.TextInput;
    };

    /**
     * Check if the interaction is message context menu
     * @returns {boolean}
     */

    isMessageContextMenu(): boolean {
        return this.data?.target_id && this.data.type === ContextMenuTypes.Message ? true : false;
    };

    /**
     * Check if the interaction is user context menu
     * @returns {boolean}
     */

    isUserContextMenu(): boolean {
        return this.data?.target_id && this.data.type === ContextMenuTypes.User ? true : false;
    };

    /**
     * Check if the interaction is any context menu (User or Message)
     * @returns {boolean}
     */

    isAnyContextMenu(): boolean {
        return this.data?.target_id ? true : false;
    };
};