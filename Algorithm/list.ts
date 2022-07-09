// 子ノード
class ChildNode
{
    value: number; // 値

    nextNode: ChildNode | null = null; // 次の子ノードへの参照

    constructor(value: number)
    {
        this.value = value;
    }
}

// 子ノードを持つリスト
class LinkedList
{
    #firstNode: ChildNode | null; // 先頭の子ノードへの参照を持つ

    constructor(){this.#firstNode = null;}

    // 先頭の子ノードを返すメソッド
    getFirstNode(): ChildNode | null
    {
        // リストに1つも子ノードが追加されていない時はnullを返す
        if(this.#firstNode === null)
        {
            return null;
        }

        // firstNodeを返す
        return this.#firstNode;
    }

    // 最後方の子ノードを取得するメソッド
    getLastNode(): ChildNode | null
    {
        // リストに1つも子ノードが追加されていない時はnullを返す
        if(this.#firstNode === null)
        {
            return null;
        }

        // 先頭の子ノードを取得する
        let node = this.#firstNode;

        // 子ノードのnextNodeプロパティを辿っていく
        // 最後方の子ノードは次の子ノードへの参照が無い = nextNode = null なのでそこでwhileループを抜ける
        while(node.nextNode !== null)
        {
            // 子ノードのnextNodeプロパティを辿って行って最後方の子ノードを返す
            node = node.nextNode;
        }

        return node;
    }

    add(value: number): void
    {
        // 引数を値にした新しい子ノードを作る
        let node = new ChildNode(value);

        // リストが1つも子ノードを持っていない時
        if(this.#firstNode === null)
        {
            // 新しく作った子ノードをfirstNodeに当ててreturnする
            this.#firstNode = node;

            return;
        }

        // 現状一番後ろにある子ノードを持ってくる
        let lastNode = this.getLastNode();

        // 子ノードのNextNodeプロパティに新しく作った子ノードをセットする
        // 最後方の子ノードが更新されることになる
        lastNode!.nextNode = node;
    }

    // 先頭に子ノードを挿入するメソッド
    addFirst(value: number): void
    {
        // 新しい子ノードを作る
        const node = new ChildNode(value);

        // 新しい子ノードの次のノードに、現在LinkedListが持っているfirstNodeを繋ぐ
        node.nextNode = this.#firstNode;

        // 新しく作った子ノードをfirstNodeにする
        this.#firstNode = node;

        // 要素の入れ替えで先頭にデータを持ってくるのではなく
        // 参照先を変えて先頭に持ってくるのが、普通の配列での操作との違い
    }

    // 任意のindexの後ろに値を挿入するメソッド
    insertAfter(index: number, value: number): void
    {
        // LinkedListに1度も子ノードを追加していない時はリターン
        if(this.#firstNode === null)
        {
            return
        }
        // indexがマイナスの時もリターン
        else if(index < -1) return;

        // カウンタ。js(ts)はポインタが無いので任意の位置をカウンタを使って計算する
        let check = 0;

        // 新しく追加する子ノードの「1つ前」の子ノードを取得
        // 「prevNode -> newNode -> prevNode.nextNode」 のようにしたい
        let prevNode = this.#firstNode;

        // (0), (1) と子ノードがあったとして、(0)の後に子ノードをinsertしたい時は
        // check = 0 の時にprevNodeに(0)を持つ子ノードが入っている
        for(; (prevNode.nextNode !== null) && check < index; ++check)
        {
            prevNode = prevNode.nextNode;
        }

        // check = index の時は末尾に追加していることになる
        // ここでaddメソッドに処理を引き渡すと再度末尾まで計算する必要があるので
        // そのままinsertAfterメソッドに処理を任せた方が良い...?

        // 新しい子ノードを作成
        const newNode = new ChildNode(value);

        // 新しい子ノードが[N]の位置にあるとすると、[N + 1]の位置に
        // prevNode.nextNodeが入れば良い
        newNode.nextNode = prevNode.nextNode;

        // [N - 1]の位置のprevNodeから見て、[N]の位置に新しい子ノードが来ればいいので
        // prevNode.nextNode = newNode とする
        prevNode.nextNode = newNode;

        // 「prevNode -> newNode -> prevNode.nextNode」 のようになる
    }

    // 子ノードのvalueを文字列として繋げて返すメソッド
    toString(): string
    {
        // リストが1つも子ノードを持っていない時
        if(this.#firstNode === null)
        {
            // 空の文字列を返す
            return "";
        }

        // 先頭の子ノードを取得
        let node = this.#firstNode;

        // 子ノードの値を文字列にして取得する
        let str = node.value.toString();

        // 最後方の子ノードまで次々と辿って行く
        while(node.nextNode !== null)
        {
            // 1個後ろの子ノードを取得する
            node = node.nextNode;

            // 1個後ろの子ノードの値を文字列にして変数strに足していくのを繰り返す
            str = str + ", " + node.value.toString();
        }

        // 先頭, 先頭 + 1, 先頭 + 2, 先頭 + 3, ... 最後方の子ノードまでの値を文字列にして足していった文字列を返す
        return str;
    }

    // 子ノードをいくつ持っているか確認するメソッド
    getLength(): number
    {
        let count = 0;

        // 1つも持たない場合
        if(this.#firstNode === null)
        {
            return count;
        }

        ++count;

        let node = this.#firstNode;

        // 子ノードの末尾まで辿っていく
        while(node.nextNode !== null)
        {
            // インクリメントしていく
            ++count;

            node = node.nextNode;
        }

        // 返す
        return count;
    }
}

export {LinkedList};