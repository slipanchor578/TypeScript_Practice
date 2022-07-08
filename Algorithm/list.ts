// 子ノード
class ChildNode
{
    value: number; // 値

    nextNode: ChildNode | null = null; // 次のNodeへの参照

    constructor(value: number)
    {
        this.value = value;
    }
}

// ノードを持つリスト
class LinkedList
{
    #firstNode: ChildNode | null; // 先頭のNodeへの参照を持つ

    constructor(){this.#firstNode = null;}

    // 先頭のNodeを返すメソッド
    getFirstNode(): ChildNode | null
    {
        // リストに1つもNodeが追加されていない時はnullを返す
        if(this.#firstNode === null)
        {
            return null;
        }

        // firstNodeを返す
        return this.#firstNode;
    }

    // 最後方のNodeを取得するメソッド
    getLastNode(): ChildNode | null
    {
        // リストに1つもNodeが追加されていない時はnullを返す
        if(this.#firstNode === null)
        {
            return null;
        }

        // 先頭のNodeを取得する
        let node = this.#firstNode;

        // NodeのnextNodeプロパティを辿っていく
        // 最後方のNodeは次のNodeへの参照が無い = nextNode = null なのでそこでwhileループを抜ける
        while(node.nextNode !== null)
        {
            // NodeのnextNodeプロパティを辿って行って最後方のNodeを返す
            node = node.nextNode;
        }

        return node;
    }

    add(value: number): void
    {
        // 引数を値にした新しいNodeを作る
        let node = new ChildNode(value);

        // リストが1つもNodeを持っていない時
        if(this.#firstNode === null)
        {
            // 新しく作ったNodeをfirstNodeに当ててreturnする
            this.#firstNode = node;

            return;
        }

        // 現状一番後ろにあるNodeを持ってくる
        let lastNode = this.getLastNode();

        // NodeのNextNodeプロパティに新しく作ったNodeをセットする
        // 最後方のNodeが更新されることになる
        lastNode!.nextNode = node;
    }

    // 子ノードのvalueを文字列として繋げて返すメソッド
    toString(): string
    {
        // リストが1つもNodeを持っていない時
        if(this.#firstNode === null)
        {
            // 空の文字列を返す
            return "";
        }

        // 先頭のNodeを取得
        let node = this.#firstNode;

        // Nodeの値を文字列にして取得する
        let str = node.value.toString();

        // 最後方のNodeまで次々と辿って行く
        while(node.nextNode !== null)
        {
            // 1個後ろのNodeを取得する
            node = node.nextNode;

            // 1個後ろのNodeの値を文字列にして変数strに足していくのを繰り返す
            str = str + ", " + node.value.toString();
        }

        // 先頭, 先頭 - 1, 先頭 - 2, 先頭 - 3, ... 最後方のNodeまでの値を文字列にして足していった文字列を返す
        return str;
    }
}

export {LinkedList};

// 単方向リスト