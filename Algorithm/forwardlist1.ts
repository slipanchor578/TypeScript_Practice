// ノード
class Node<T extends number | string>
{
	// 値
	value: T;

	// 次のノード
	nextNode: Node<T> | null;

	constructor(value: T)
	{
		this.value = value;

		this.nextNode = null;
	}
}

// 連結リスト(単方向)
class LinkedList<T extends number | string>
{
	// 最初の子ノード
	#firstNode: Node<T> | null;

	constructor()
	{
		// 最初は子ノードnullのままで初期化する
		this.#firstNode = null;
	}

	getLastNode() : Node<T> | null
	{
		// まだ子ノードを持たない場合はnull
		if(this.#firstNode == null)
		{
			return null;
		}

		// #firstNodeの子ノードを取得する
		let node = this.#firstNode;

		// nextNodeを辿って行き、nullが返ってきたらその前の子ノードが終端ということで返す
		while(node.nextNode != null)
		{
			node = node.nextNode;
		}

		// 最後の子ノード
		return node;
	}

	// ノードの要素数を返すgetter
	get Length(): number
	{
		// #firstNode == null なら長さは0
		if(this.#firstNode == null)
		{
			return 0;
		}

		// ここに到達するということは最低長さ1はある
		let length = 1;
		let node = this.#firstNode;

		while(node.nextNode != null)
		{
			node = node.nextNode;
			length++;
		}

		// 長さを返す
		return length;
	}

	add(value: T)
	{
		// 引数で新しい子ノードを作る
		const node = new Node<T>(value);

		// #firstNodeがまだnullの場合は最初のノードとして追加する
		if(this.#firstNode == null)
		{
			this.#firstNode = node;
			// returnする
			return;
		}

		// ここに処理が移った時点で、#firstNodeはnullではないことになる
		// 「Length = 1」の時は、getLastNode = #firstNodeを返すし
		// 「Length = 2」の時は、getLastNode = #firstNode.nextNodeを返す
		const lastNode = this.getLastNode();

		// よってaddメソッド内で使うgetLastNodeメソッドは必ず子ノードを返すので「!」演算子を付けていい
		// nextNodeに作った子ノードを連結する
		lastNode!.nextNode = node;
	}

	addFirst(value: T)
	{
		// 新しい子ノードを作る
		const node = new Node(value);

		// 新しい子ノードのnextNodeに元から持っていた子ノードを入れる
		// #firstNodeを持たない時に呼び出されても別にいい。nextNodeはnullを許容するため
		// この場合単なる先頭への要素追加になる
		node.nextNode = this.#firstNode;

		// 新しく作った子ノードを#firstNodeに設定する
		this.#firstNode = node;
	}

	toString(): string
	{
		// 子ノード0の時は空文字を返す
		if(this.#firstNode == null)
		{
			return "";
		}

		// #firstNodeを取得
		let node = this.#firstNode;

		// 最初の子ノードの値を文字列化する
		let str = node.value.toString();

		// 終端までループ
		while(node.nextNode != null)
		{
			// 次の子ノードを取得
			node = node.nextNode;

			// 「(1つ前の子ノードの値)-(今の子ノードの値)」という文字列を作り、次々変数に入れ替えていく
			str = `${str}-${node.value.toString()}`;
		}

		// 返す
		return str;
	}
}

const list = new LinkedList<number>();

console.log(list.Length); // 0

for (let i = 0; i < 10; ++i)
{
	list.add(i); // 子ノードを追加していく
}

console.log(list.toString()); // 0-1-2-3-4-5-6-7-8-9

list.addFirst(1000); // 先頭に追加

console.log(list.toString()); // 1000-0-1-2-3-4-5-6-7-8-9

console.log(list.Length); // 11

/*
	list.add(1)
	list.firstNode = {value: 1, nextNode: null}

	list.add(2)
	list.firstNode = {value: 1, nextNode: {value:2, nextNode: null}}

	list.add(3)
	list.firstNode = {value: 1, nextNode: {value:2, nextNode: {value: 3, nextNode: null}}}

	こんな感じでどんどん連結する
	配列のようにメモリ上に一列で並んでいるわけではないのでランダムアクセスができない
	が、先頭に新しい要素を突っ込むことにかけては速い
*/