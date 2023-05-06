import { api } from "../constants/Api";
import { Group } from "../utils/Group";
import { Role } from "../structures/Role";
import { Guild } from "../structures/Guild";
import { GuildRole } from "../utils/Routes";
import { Client } from "../entities/Client";
import { GuildRoles } from "../utils/Routes";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import type { CreateRoleOptions, EditRoleOptions, RawGuildRole, RoleResolvable } from "../types";

export class RoleManager extends BasicManager {
    override cache: Group<Snowflake, Role> = new Group<Snowflake, Role>();

    public readonly highest: Role;
    public readonly guild: Guild;
    public readonly everyone: Role;

    constructor(client: Client) {
        super(client);

        this.guild = this.client.guilds.cache.get(this.cache.first().guildId as string)!;
        this.everyone = this.cache.get(this.guild.id)!;
        this.highest = this.cache.reduce((maxRole: Role, role: Role): Role => maxRole.position > role.position ? maxRole : role);
    };

    /**
     * Compare the positions between the first and second role
     * @param {RoleResolvable} role1 - The first role
     * @param {RoleResolvable} role2 - The second role
     * @returns {number}
     */

    comparePosition(role1: RoleResolvable, role2: RoleResolvable): number {
        return role1.position > role2.position ? role1.position - role2.position : role2.position - role1.position;
    };

    /**
     * Create a new role in the guild
     * @param {CreateRoleOptions} options - The role options
     * @returns {Promise<Role>}
     */

    async create(options: CreateRoleOptions): Promise<Role> {
        const { data }: { data: RawGuildRole } = await api.post(GuildRoles(this.guild.id), { name: options.name, permissions: options.permissions, color: options.color, hoist: options.hoist, icon: options.icon, unicode_emoji: options.unicode_emoji, mentionable: options.mentionable }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options.reason } });

        this.cache.set(data.id, new Role(data, this.client, this.guild.id));

        return this.cache.get(data.id)!;
    };

    /**
     * Delete a role
     * @param {RoleResolvable} role - The role
     * @param {string} reason - Reason for delete the role
     * @returns {Promise<void>}
     */

    async delete(role: RoleResolvable, reason?: string): Promise<void> {
        await api.delete(GuildRole(this.guild.id, role.id), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        this.cache.delete(role.id);

        return;
    };

    /**
     * Edit a role
     * @param {RoleResolvable} role - The role
     * @param {EditRoleOptions} options - The options to edit
     * @returns {Promise<Role>}
     */

    async edit(role: RoleResolvable, options: EditRoleOptions): Promise<Role> {
        const data: Role = await this.cache.get(role.id)!.edit(options);

        return data;
    };

    /**
     * Resolves a RoleSelvable into a role's ID
     * @param {RoleResolvable} role - The role
     * @returns {Snowflake}
     */

    resolveId(role: RoleResolvable): Snowflake {
        return role.id;
    };
};