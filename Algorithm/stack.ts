class Stack<T>
{
    #elements: Array<T>;

    #length: number = 0;

    constructor()
    {
        this.#elements = new Array<T>();
    }

    push(value: T): void 
    {
        this.#elements[this.#length] = value;

        this.#length++;
    }

    pop(): T | undefined 
    {
        if(this.#length == 0)
        {
            return undefined;
        }

        const popValue = this.#elements[this.#length - 1];

        delete this.#elements[this.#length - 1];

        this.#length--;

        return popValue;
    }

    getLength(): number
    {
        return this.#length;
    }
}

export {Stack};