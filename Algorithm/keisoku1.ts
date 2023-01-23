import { LinkedList } from "./forwardlist1.js";

function Keisoku1()
{
	const start = performance.now();

	const arr = new Array<number>();

	let num = 0;

	for(let i = 0; i < 1000; ++i)
	{

		// 0回目はj = i = 0 なのでループに入らない
		// 1回目はj = i = 1 なので1回ループする
		// 10回目はj = i = 10 なので10回ループする
		for(let j = i; j > 0; --j)
		{
			
			// 要するに毎回arr[0]に新しい値が入ってくるので、要素を1つずつ後ろにずらしている
			// arr[2] = arr[1]
			// arr[1] = arr[0]
			// j > 0 を満たさないので抜ける
			arr[j] = arr[j - i];

			// 移動した回数だけnumを増やす
			num++;
		}

		// 毎回先頭に新しい値をセットする
		arr[0] = Math.random();
	}

	const end = performance.now();

	const diff = (end - start).toFixed(1);

	console.log(`${num}回. ${diff}ミリ秒`);
}

function Keisoku2()
{
	const start = performance.now();

	const list = new LinkedList();

	let num = 0;

	for(let i = 0; i < 1000; ++i)
	{
		list.addFirst(Math.random());
		num++;
	}

	const end = performance.now();

	const diff = (end - start).toFixed(1);

	console.log(`${num}回. ${diff}ミリ秒`);
}

Keisoku1();
Keisoku2();


/*
	499500回. 771.7ミリ秒
	1000回. 0.8ミリ秒

	配列の方は毎回要素の数だけ要素を移動している
	1000回のループの中で499500回要素を移動している
	1/2 * 999(999 + 1) = 1/2 * 999 * 1000 = 499500

	連結リストの場合は子ノードが増えたとしても毎回やることは同じで、新しい子ノードを作った後に
	その子ノードに今まであった#firstNodeを据え付けるので必ず1回の要素移動となる
	よって1000回要素を移動していることになる

	この違いが圧倒的な処理時間の差を生む
*/