// 5秒後に引数を2倍にして返す関数
function Twice(value: number)
{
	return new Promise<number>((resolve) => 
	{
		setTimeout(() => {
			resolve(value * 2);
		}, 5000);
	})
}

async function Test1()
{
	const arr = [1, 2, 3];
	const result: number[] = [];

	for(const n of arr)
	{
		// 毎回5秒待ってPromiseを解決してからpushしている
		result.push(await Twice(n));
	}

	// 単純に15秒はかかる
	console.log(result.reduce((prev,current) => prev + current));
}

async function Test2()
{
	const arr = [4, 5, 6];

	// とりあえず配列内の全ての要素にTwice関数を実行する
	// pending状態のままのPromise<number>[]をPromise.allメソッドで全て解決するまで一度に待つ
	const result = await Promise.all(arr.map(Twice));

	// だいたい5秒で終わる
	console.log(result.reduce((prev, current) => prev + current));
}

Test1();
Test2();

/*
	結果:

	30
	12

	Test1メソッドの方が先に実行しているのに後から実行したTest2メソッドの方が先に終わっている
	内部のawaitの待ち方で結果が変わる
	Test1メソッドではPromise<number>に対して毎回awaitしてnumber型に剥がしたものをpushしている
	Test2メソッドではTwice関数を配列の要素に対して実行するのは同じだが、pending状態のままとりあえず配列に突っ込む
	それをPromise.allメソッドでまとめて解決されるまで待つ。なのでだいたい5秒で全てのPromise<number>[] => number[]に剥がせる
	Test1メソッドはせっかく非同期処理をしているのに、毎回「Promiseを解決されるまで待つ => 次の要素に対してTwice関数を適用」を繰り返しているため
	実際直列処理になってしまっている
*/