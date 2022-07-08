// ジェネリクス版
// Object.prototype.toStringを使いたいので「T型はObjectを継承している」事を示している
class ChildNode2<T extends Object>
{
    value: T;

    nextNode: ChildNode2<T> | null = null;

    constructor(value: T)
    {
        this.value = value;
    }
}

class LinkedList2<T extends Object>
{
    #firstNode: ChildNode2<T> | null;

    constructor(){this.#firstNode = null;}

    getFirstNode(): ChildNode2<T> | null
    {
        if(this.#firstNode === null)
        {
            return null;
        }

        return this.#firstNode;
    }

    getLastNode(): ChildNode2<T> | null
    {
        if(this.#firstNode === null)
        {
            return null;
        }

        let node = this.#firstNode;

        while(node.nextNode !== null)
        {
            node = node.nextNode;
        }

        return node;
    }

    add(value: T): void
    {
        let node = new ChildNode2(value);

        if(this.#firstNode === null)
        {
            this.#firstNode = node;

            return;
        }

        let lastNode = this.getLastNode();

        lastNode!.nextNode = node;
    }

    insertAfter(index: number, value: T): void
    {
        if(this.#firstNode === null)
        {
            return
        }
        else if(index < -1) return;

        let check = 0;

        let prevNode = this.#firstNode;

        for(; (prevNode.nextNode !== null) && check < index; ++check)
        {
            prevNode = prevNode.nextNode;
        }

        const newNode = new ChildNode2(value);

        newNode.nextNode = prevNode.nextNode;

        prevNode.nextNode = newNode;
    }

    toString(): string
    {
        if(this.#firstNode === null)
        {
            return "";
        }

        let node = this.#firstNode;

        // [T extends Object]をしないと、「T型はtoStringメソッドを持っていない」とかエラーが出る
        let str: string = node.value.toString();

        while(node.nextNode !== null)
        {
            node = node.nextNode;

            str = str + ", " + node.value.toString();
        }

        return str;
    }

    getLength(): number
    {
        let count = 0;

        if(this.#firstNode === null)
        {
            return count;
        }

        ++count;

        let node = this.#firstNode;

        while(node.nextNode !== null)
        {
            ++count;

            node = node.nextNode;
        }

        return count;
    }
}

export {LinkedList2};