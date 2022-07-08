class Stack<T>
{
    // 内部は配列
    #elements: Array<T>;

    // 要素数。最初は0
    #length: number = 0;

    constructor()
    {
        // T型の配列を用意する
        this.#elements = new Array<T>();
    }

    // 要素を追加する
    push(value: T): void 
    {
        // elements[n], elements[n + 1], elements[n + 2], ...
        // 常に後方に要素が追加されていく
        this.#elements[this.#length] = value;

        // 要素数を増やす
        this.#length++;
    }

    pop(): T | undefined 
    {
        // 要素を1つも持たないときはundefinedを返す
        if(this.#length == 0)
        {
            return undefined;
        }

        // 末尾の要素を取り出す
        // 配列のインデックスは「0始まり」なので、例えば要素数3の時はelements[2]に要素が入っている
        // そのため「[this.length - 1]」となる
        const popValue = this.#elements[this.#length - 1];

        // 末尾の要素を取り出したのでdeleteする
        delete this.#elements[this.#length - 1];

        // lengthを1つ減らして、deleteした後のelementsのサイズに合わせる
        this.#length--;

        // 取り出した末尾の要素を返す
        return popValue;
    }

    // 要素数を返す
    getLength(): number
    {
        // これでforループを回せたりする
        return this.#length;
    }
}

export {Stack};

/*
    ジェネリクスなスタック構造の簡単な仕組み
    LIFO(Last in, First out)になっていて、後に入れたものから先に取り出すことができる

    pushやpopメソッドをもっと洗練したものが
    Array.prototype.push
    Array.prototype.pop
    メソッドになる。

    簡単に「push/pop」で処理できる裏側では何十行もコードが働いている事を理解することが大事
*/