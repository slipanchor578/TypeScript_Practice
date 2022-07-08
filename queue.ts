class Queue<T>
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
        if(this.#length == 0)
        {
            return undefined;
        }

        const value = this.#elements[0];

        for(let i = 0; i < this.#length; ++i)
        {
            if(i == 0)
            {
                continue;
            }

            this.#elements[i - 1] = this.#elements[i];
        }

        delete this.#elements[this.#length];

        this.#length--;

        return value;
    }

    getLength(): number
    {
        return this.#length;
    }
}

export {Queue};