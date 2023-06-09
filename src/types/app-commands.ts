import { Snowflake } from "./Snowflake";
import { ApplicationCommandTypes, AttachmentData, BasicFetchOptions, ChannelTypes, GuildMemberData, Locales, RawDiscordAPIUserData, RawGuildRole } from "./index";

export type CreateApplicationCommandOptions = EditApplicationCommandOptions;
export type EditApplicationCommandOptions = Pick<ApplicationCommandData, "name" | "name_localizations" | "description" | "description_localizations" | "options" | "default_member_permissions" | "default_permission" | "nsfw">;

export enum ApplicationCommandOptionType {
    SubCommand = 1,
    SubCommandGroup,
    String,
    Integer,
    Boolean,
    User,
    Channel,
    Role,
    Mentionable,
    Number,
    Attachment
}

export interface SlashCommandStringOption extends BasicSlashCommandOption {
    setMinLength: (length: number) => this;
    setMaxLength: (length: number) => this;
    setAutocomplete: (autocomplete: boolean) => this;
    addChoices: (choices: { setName: (name: string) => typeof choices; setValue: (value: string | number) => typeof choices; setNameLocalizations: (locales: Locales) => typeof choices }) => this;
}

export interface BasicSlashCommandOption {
    setName: (name: string) => this;
    setDescription: (description: string) => this;
    setType: (type: ApplicationCommandOptionType) => this;
    setRequired: (required: boolean) => this;
    setNameLocalizations: (locales: Locales) => this;
    setDescriptionLocalizations: (locales: Locales) => this;
}

export interface FetchApplicationCommandOptions extends BasicFetchOptions {
    guild_id?: Snowflake;
    with_localizations?: boolean;
}

export interface ApplicationCommandOptionChoicesData {
    name: string;
    value: string | number;
    name_localizations?: Locales;
}

export interface ApplicationCommandOptionsData {
    type: ApplicationCommandOptionType;
    name: string;
    name_localizations?: Locales;
    description: string;
    description_localizations?: Locales;
    required?: boolean;
    choices?: Array<ApplicationCommandOptionChoicesData>;
    options?: Array<ApplicationCommandOptionsData>;
    channel_types?: Array<ChannelTypes>;
    min_value?: ApplicationCommandOptionsData["type"] extends ApplicationCommandOptionType.Number | ApplicationCommandOptionType.Integer ? number : never;
    max_value?: ApplicationCommandOptionsData["type"] extends ApplicationCommandOptionType.Number | ApplicationCommandOptionType.Integer ? number : never;
    min_length?: ApplicationCommandOptionsData["type"] extends ApplicationCommandOptionType.String ? number : never;
    max_length?: ApplicationCommandOptionsData["type"] extends ApplicationCommandOptionType.String ? number : never;
    autocomplete?: number;
}

export interface RawApplicationCommandData {
    id: Snowflake;
    type: ApplicationCommandTypes;
    application_id: Snowflake;
    guild_id?: Snowflake;
    name: string;
    name_localizations?: Locales;
    description: string;
    description_localizations?: Locales;
    options?: Array<ApplicationCommandOptionsData>;
    default_member_permissions?: string;
    dm_permission?: boolean;
    default_permission?: boolean;
    nsfw?: boolean;
    version: string;
}

export type ApplicationCommandData = Omit<RawApplicationCommandData, "version" | "id" | "application_id" | "guild_id">;

export enum ContextMenuTypes {
    User = 2,
    Message
}

export type ContextMenuData = Omit<ApplicationCommandData, "description" | "description_localizations">;

export interface ApplicationCommandInteractionOptionData {
    name: string;
    type: ApplicationCommandOptionType;
    value?: SlashCommandValueOption;
    options?: ApplicationCommandInteractionOptionData;
    focused?: boolean;
}

export interface AutocompleteFocusedOption {
    name: string;
    type: ApplicationCommandOptionType;
    value: string;
    focused: boolean;
}

export type SlashCommandMentionableOptionValue = GuildMemberData | RawGuildRole;
export type SlashCommandValueOption = string | number | boolean | SlashCommandMentionableOptionValue | RawDiscordAPIUserData | AttachmentData;