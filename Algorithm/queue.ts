// キュークラス
class Queue<T>
{
    // 内部はジェネリクスな配列で管理
    #elements: T[];

    // 要素数
    #length: number = 0;

    constructor()
    {
        // ジェネリクスな配列を作る
        this.#elements = new Array<T>();
    }

    // 要素を追加するだけの単純なメソッド
    enqueue(value: T): void
    {
        this.#elements[this.#length] = value;

        // 追加したら要素数も増やしておく
        this.#length++;
    }

    // FIFO(First in, First out)を実現するためのメソッド
    dequeue(): T | undefined
    {
        // 要素数0の時はundefinedを返す
        if(this.#length == 0)
        {
            return undefined;
        }

        // 先頭の要素を取得する
        const value = this.#elements[0];

        // 末尾の要素までループ
        for(let i = 0; i < this.#length; ++i)
        {
            // 既に先頭の要素は取得しているのでスキップする
            if(i == 0)
            {
                continue;
            }

            // 要素を全て1つずつ前にずらしていく
            // [1, 2, 3]と格納されていた時は[2, 3, 空]とする(1は既に取得済み)
            this.#elements[i - 1] = this.#elements[i];
        }

        // 1つずつ要素をずらしたので末尾の要素を削除する
        delete this.#elements[this.#length];

        // 要素数も減らす
        this.#length--;

        return value;
    }

    // 現在の要素数を返す
    getLength(): number
    {
        return this.#length;
    }
}

export {Queue};