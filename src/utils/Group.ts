import { EMPTY_GROUP_VALUE } from "../constants/constants.json";

export class Group<K, V> extends Map<K, V> {
    /**
   * Returns the value of the first element in this group where predicate is true, and undefined otherwise.
   * @param func
   * find calls predicate once for each element of this group, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
   * @example
   * group.find((channel) => channel.name === 'general');
   */

    find(func: (value: V, index: number, obj: V[]) => unknown, thisArg?: unknown): V | undefined {
        return this.toArray().find(func, thisArg);
    }

    /**
   * Calls a defined callback function on each element of this group, and returns an array that contains the results.
   * @param func — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in this group.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
   * @example
   * group.map(([id, user]) => user.tag);
   */

    map(func: (value: [K, V], index: number, array: [K, V][]) => unknown, thisArg?: unknown): unknown[] {
        return [...this.entries()].map(func, thisArg);
    }

    /**
   * Returns the elements of this group that meet the condition specified in a callback function.
   * @param func — A function that accepts up to three arguments. The filter method calls the predicate function one, time for each element in  this group.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   * @example
   * group.filter((user) => user.bot);
   */

    filter(func: (value: V, index: number, array: V[]) => value is V, thisArg?: unknown): V[] {
        return this.toArray().filter(func, thisArg);
    }

    /**
   * Determines whether all the members of this group satisfy the specified test.
   * @param func
   * A function that accepts up to three arguments. The every method calls the predicate function for each element in this group until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every
   * @example
   * group.every((user) => user.bot);
   */

    every(func: (value: V, index: number, array: V[]) => value is V, thisArg?: unknown): this is V[] {
        return this.toArray().every(func, thisArg);
    }

    /**
  * Determines whether the specified callback function returns true for unknown element of this group.
  * @param func 
  * A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of this group.
  * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  * @example
  * group.some((channel) => channel.type === ChannelTypes.GuildText);
  */

    some(func: (value: V, index: number, array: V[]) => unknown, thisArg?: unknown): boolean {
        return this.toArray().some(func, thisArg);
    }

    /**
   * Returns the Group values.
   * @returns {V[]}
   */

    toArray(): V[] {
        return Array.from(this.values());
    }

    /**
   * Returns the Group in JSON format.
   * @returns { { [key: string]: V; } }
   */

    toJSON(): { [key: string]: V; } {
        return Object.fromEntries(this.entries());
    }

    /**
   * Get a item by an index.
   * @param {number} index - Index to get the value.
   * @returns {V | undefined}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/at
   */

    at(index: number): V | undefined {
        return this.toArray().at(index);
    }

    /**
   * Calls the specified callback function for all the elements in this group. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function
   * @param callbackfn - A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in this group
   * @returns {V}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
   * @example
   * group.reduce((acc, guild) => acc + guild.memberCount, 0);
   */

    reduce(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V {
        return this.toArray().reduce(callbackfn);
    }

    /**
   * Returns true if all keys is in this group keys.
   * @param {K[]} keys - Keys to be checked.
   * @returns {boolean}
   * @example
   * group.hasAll('123', '321');
   */

    hasAll(...keys: K[]): boolean {
        return keys.every((key: K): boolean => super.has(key));
    }

    /**
   * Returns true if unknown keys is in this group keys.
   * @param {K[]} keys - Keys to be checked .
   * @returns {boolean}
   * @example
   * group.hasAny('312', '123');
   */

    hasAny(...keys: K[]): boolean {
        return keys.some((key: K): boolean => super.has(key));
    }

    /**
   * Get the first x entries of this group.
   * @param {number} amount - The amount of items to return.
   * @returns {T extends 1 ? V : { [key: string]: V; }}
   */

    first<T extends number = 1>(amount?: T): T extends 1 ? V : { [key: string]: V; } {
        const entries: [K, V][] = [...this.entries()];

        return typeof amount !== "undefined" ? Object.fromEntries(entries.slice(0, amount)) : entries.at(0);
    }

    /**
   * Get the last x entries of this group.
   * @param {number} amount - The amount of items to return.
   * @returns { T extends this["size"] ? V : { [key: string]: V; } }
   */

    last<T extends number = this["size"]>(amount?: T): T extends this["size"] ? V : { [key: string]: V; } {
        const entries: [K, V][] = [...this.entries()];

        return typeof amount !== "undefined" ? Object.fromEntries(entries.slice(-amount)) : entries.at(0);
    }

    /**
   * Combines the elements of two groups into a new group. If a key already exists in the current group, its value will be updated with the value from the other group.
   * @param group - The other group to merge with the current group.
   * @returns {this} - The merged group.
   * @example
   * group.merge(otherGroup);
   */

    merge(group: Group<K, V> | Map<K, V>): this {
        group.forEach((value: V, key: K): Group<K, V> => this.set(key, value));

        return this;
    }

    /**
   * Pick a random element in the Group, if the Group is empty, so returns undefined.
   * @returns {V}
   */

    get random(): V {
        const values: V[] = this.toArray();

        return values[Math.random() * values.length];
    }

    /**
   * Check if the Group is empty.
   * @returns {boolean}
   */

    get empty(): boolean {
        return this.size === EMPTY_GROUP_VALUE;
    }

    /**
   * Returns the key of the first element in this group where predicate is true, and undefined otherwise.
   * @param predicate find calls predicate once for each element of this group, in ascending order, until it finds one where predicate returns true. If such an element is found, findKey immediately returns that key. Otherwise, findKey returns undefined.
   * @returns {K | undefined}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
   * @example
   * group.finKey((user) => user.username === 'Unreal');
   */

    findKey(predicate: (value: V, index: number, obj: V[]) => unknown, thisArg?: unknown): K | undefined {
        const index: number = this.toArray().findIndex(predicate, thisArg);

        return [...this.keys()][index];
    }

    /**
   * Calls the specified callback function for all the elements in this group, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in this group.
   * @returns {V}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
   */

    reduceRight(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V {
        return this.toArray().reduceRight(callbackfn);
    }

    /**
   * Obtains unique random key(s) from this group.
   * @returns {K}
   */

    get randomKey(): K {
        const keys: K[] = [...this.keys()];

        return keys[Math.random() * keys.length];
    }

    /**
   * Sorts a group in place. This method mutates the group and returns a reference to the same group.
   * @param compareFunction - Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * @returns {V[]}
   * @example
   * group.sort((channelX, channelY) => channelX.creationTimestamp - channelY.creationTimestamp);
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   */

    sort(compareFunction?: ((a: V, b: V) => number) | undefined): V[] {
        return this.toArray().sort(compareFunction);
    }

    /**
   * Reverses the elements in a group in place. This method mutates the group and returns a reference to the same group.
   * @returns {V[]}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
   */

    reverse(): V[] {
        return this.toArray().reverse();
    }

    /**
   * Creates an identical shallow copy of this group.
   * @returns {Group<K, V>}
   * @example
   * const newGroup = group.clone();
   */

    clone(): Group<K, V> {
        const entries: [K, V][] = [...this.entries()];
        const newGroup: Group<K, V> = new Group<K, V>();

        entries.forEach(([key, value]: [K, V]): Group<K, V> => newGroup.set(key, value));

        return newGroup;
    }

    /**
   * Calls a defined callback function on each element of this Group.
   * @param func — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in this Group.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
   * @example
   * group.mapValues((id) => id);
   */

    mapValues<U>(callbackfn: (value: V, index: number, array: V[]) => U, thisArg?: unknown): U[] {
        return this.toArray().map(callbackfn, thisArg);
    }

    /**
     * Sweep this group, delete the keys that satisfy the condition
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one, time for each element in  this group.
     * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
     * @returns 
     */

    sweep(predicate: (value: [K, V], index: number, array: [K, V][]) => unknown, thisArg?: unknown): this {
        const filtered: [K, V][] = [...this.entries()].filter(predicate, thisArg);

        filtered.forEach(([key]: [K, V]): boolean => this.delete(key));

        return this;
    }
}