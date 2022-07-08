class Queue2<T>
{
    #elements: T[];

    #length: number = 0;

    constructor()
    {
        this.#elements = new Array<T>();
    }

    enqueue(value: T): void
    {
        this.#elements[this.#length] = value;

        this.#length++;
    }

    dequeue(): T | undefined
    {
        const value = this.#elements.shift();

        this.#length--;

        return value;
    }

    getLength(): number
    {
        return this.#length;
    }
}

export {Queue2};