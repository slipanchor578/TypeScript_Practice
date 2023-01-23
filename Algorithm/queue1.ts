class Queue<T>
{
	#arr: T[];

	#length: number;

	constructor()
	{
		this.#arr = [];

		this.#length = 0;
	}

	// 要素を追加する。ここまではスタックと同じ
	enqueue(value: T)
	{
		this.#arr[this.#length] = value;
		this.#length++;
	}

	// 要素の取り出し
	dequeue(): T
	{
		// キューなので、一番最初に入れた要素を常に取り出す
		const dequeueValue = this.#arr[0];

		// ループ用変数
		let len = 0;

		// 要素を取り出したら、1つ後ろにある要素を前に移動させる
		while(len < this.#length)
		{
			// 例えば一番最初の要素(#arr[0])を取り出した場合
			// 「this.#arr[0] = this.#arr[1];」ということを毎回する
			this.#arr[len] = this.#arr[len + 1];
			len++;
		}
		
		// 動かした要素については残しておくと重複するので元の要素は削除する
		// 上の例でいくと、whileループを抜ける時には「len = 1」となっているので
		// 「delete this.#arr[1]」とすることで、動かした後に要らなくなった要素を削除する
		delete this.#arr[len];

		// 配列長を変更する
		this.#length--;

		// 取り出した要素を返す
		return dequeueValue;
	}

	get length()
	{
		return this.#length;
	}
}

const que1 = new Queue<number>();

console.log(que1.length); // まだ追加していないので「0」

console.log();

for(let i = 0; i < 10; ++i)
{
	// 要素を追加する
	que1.enqueue(i);	
}

console.log(que1.length); // 10

console.log();

for(let i = 0; i < 10; ++i)
{
	const value = que1.dequeue();
	console.log(value); // 0 1 2 3 4 5 6 7 8 9
}

console.log();

console.log(que1.length); // 全ての要素を取り出したので「0」