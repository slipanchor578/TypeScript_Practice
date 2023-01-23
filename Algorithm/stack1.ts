class Stack<T>
{
	#arr: T[];

	#length: number;

	constructor()
	{
		this.#arr = [];

		this.#length = 0;
	}

	// 要素を追加して配列長を増やす
	push(value: T)
	{
		this.#arr[this.#length] = value;
		this.#length++;
	}

	// 一番最近追加した要素を取り出す
	pop(): T
	{
		// 常に最新の要素を取り出す
		const popValue = this.#arr[this.#length - 1];

		// 取り出したので、その要素を削除する
		delete this.#arr[this.#length - 1];

		// 要素を減らしたので配列長を減らす
		this.#length--;

		// 要素を返す
		return popValue;
	}
}

const stack = new Stack<number>();
const stack2 = new Stack<string>();

for(let i = 0; i < 10; ++i)
{
	stack.push(i);
}

for(let i = 0; i < 10; ++i)
{
	stack2.push(i.toString());	
}

for(let i = 0; i < 10; ++i)
{
	const value = stack.pop();
	console.log(value); // 9 8 7 6 5 4 3 2 1 0
}

for(let i = 0; i < 10; ++i)
{
	const value = stack2.pop();
	console.log(value); // 9 8 7 6 5 4 3 2 1 0
}