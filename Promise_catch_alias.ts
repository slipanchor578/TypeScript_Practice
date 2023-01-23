// 1/2の確率でResolve/Rejectする関数
async function Sample1()
{
	if(Math.random() < 0.5)
	{
		return "Resolve";
	}
	else
	{
		throw "Reject"
	}
}

// async functionはreturnした値をResolve扱いし、throwした値やErrorをReject扱いしてくれる糖衣構文
// 別に内部でawaitを使えるようにするだけの関数ではない
// なので自分でPromiseを書いた関数と最終的に同じになる
function Sample2()
{
	return new Promise<string>((resolve, reject) => 
	{
		if(Math.random() < 0.5)
		{
			resolve("Resolve");
		}
		else
		{
			reject("Reject")
		}
	})
}

// Resolve時に呼び出される関数
const Resolve = (value: string) => console.log(value);

// Reject時に呼び出される関数
const Reject = (err: string) => console.error(err);

Sample1()
// Resolveの場合
.then((value) => console.log(value))
// Rejectの場合
.catch((err) => console.error(err));

// 実は「Promise.catch(関数)」は「Promise.then(Resolve時の関数, Reject時の関数)」のエイリアス

// これでもいけるが分かりにくいのでエイリアスの.catchがある
Sample1()
.then((value) => console.log(value), (err) => console.error(err))

// ようするにonResolve時の関数、onReject時の関数を渡せばいいのでこれでもいける
// ただ、これだとPromise解決時にResolve、Reject関数どちらも実行されるように見えるので
// やはりcatchを使って書いたほうが良い
Sample1()
.then(Resolve, Reject);

// Promiseを返しているのは同じなので、これでもいける
Sample2()
.then(Resolve, Reject);

// これもいける
Sample2()
.then((value) => console.log(value))
.catch((err) => console.error(err))