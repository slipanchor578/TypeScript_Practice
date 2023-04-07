/**
 * 
 * @param {number} min 最小値
 * @param {number} max 最大値
 * @returns {number} 最小値から最大値までの間の乱数
 */
function getRandomIntInclusive(min: number, max: number)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 
 * @param {number[]} arr ソートされる配列
 * @param {number} order 昇順にするか降順にするか
 */
function bubbleSort(arr: number[], order: number)
{
	switch(order)
	{
		case 0:
			for(let i = 0; i < arr.length; ++i)
			{
				for(let j = i + 1; j < arr.length; ++j)
				{
					// 常に隣り合う要素を比較対象にして
					// 交換していく
					// 降順 => 昇順のように真逆にソートする時一番遅くなる
					// [3,2,1]を昇順で並べる時、3を2と交換、2を1と交換するように
					// 内側のループでn-1回の比較と交換処理が必要になる
					if(arr[j] < arr[i])
					{
						[arr[j], arr[i]] = [arr[i], arr[j]];
					}
				}
			}
			break;

		case 1:
			for(let i = 0; i < arr.length; ++i)
			{
				for(let j = i + 1; j < arr.length; ++j)
				{
					if(arr[j] > arr[i])
					{
						[arr[j], arr[i]] = [arr[i], arr[j]];
					}
				}
			}
			break;
	}
}

/**
 * 
 * @param {number[]} arr ソートされる配列
 * @param {number} order 昇順にするか降順にするか
 */
function selectSort(arr: number[], order: number)
{
	switch(order)
	{
		case 0:
			// 外側のループ回数は要素数 - 1
			for(let i = 0; i < arr.length - 1; ++i)
			{
				// 先頭を最小値として、インデックスを保存しておく
				// この先頭はarr[0], arr[1]のように後ろに進んでいく
				let min = i;

				for(let j = i + 1; j < arr.length; ++j)
				{
					// もし後ろに小さい要素があれば
					// それが格納されているインデックスを更新する
					if(arr[j] < arr[min]) min = j;
				}

				// 最小値のインデックスを見つけて先頭のarr[i]と入れ替える事を繰り返す
				// 繰り返す。チェック回数自体はバブルソートと変わらないが選択ソートは実際の交換処理を最大1回しか行わないのが特徴
				// 例えば[4,3,2,1]の時、4と1を入れ替え[1,3,2,4]、3と2を入れ替え[1,2,3,4]。これで交換処理は終わるので
				// バブルソートよりは速い
				[arr[i], arr[min]] = [arr[min], arr[i]];
			}
			break;

		case 1:
			for(let i = 0; i < arr.length - 1; ++i)
			{
				let min = i;

				for(let j = i + 1; j < arr.length; ++j)
				{
					if(arr[j] > arr[min]) min = j;
				}

				[arr[i], arr[min]] = [arr[min], arr[i]];
			}
			break;
	}
}

/**
 * 
 * @param {number[]} arr ソートされる配列
 * @param {number} order 昇順にするか降順にするか
 */
function intersectionSort(arr: number[], order: number)
{
	switch(order)
	{
		case 0:
			// 配列の先頭の次からループを開始する
			for(let i = 1; i < arr.length; ++i)
			{	
				let j = 0;

				// 破壊対称となる要素を保存しておく
				let temp = arr[i];

				// バブルソートのようなj ~ arr.lengthまでのループではなく、jから先頭までの
				// 短いループを繰り返していく
				for(j = i; j > 0 && arr[j - 1] > temp; --j)
				{
					// 交換というよりかは、前方の大きい数字を後方へ持ってくる感じ
					// j > 0 か、前方に保存してある数字より大きい数字が無くなったらbreak
					// 例えば[4,3,2,1]の時は3を保存して[4,4,2,1]になる
					// j = 0 でbreakし、arr[0]に保存していた3をセットし、[3,4,2,1]となる
					// 次に2を保存して[3,3,4,1]となり、arr[0]に保存した2をセットし[2,3,4,1]となる
					// 最後に1を保存し[2,2,3,4]となり、arr[0]に保存した1をセットし[1,2,3,4]となる
					arr[j] = arr[j - 1];
				}
				
				// ループする毎に前方から少しずつ整列済みエリアが増えていくので内側のforループを抜けるのが
				// 速くなるのでチェックも書き換え処理も減る
				// 選択ソートより速い
				arr[j] = temp;
			}
			break;

		case 1:
			for(let i = 1; i < arr.length; ++i)
			{	
				let j = 0;

				let temp = arr[i];

				for(j = i; j > 0 && arr[j - 1] < temp; --j)
				{
					arr[j] = arr[j - 1];
				}
				arr[j] = temp;
			}
			break;
	}
}

/**
 * ソートにかかった時間を出力する
 * @param {number[]} arr1 ソートされる配列
 * @param {number[]} arr2 ソートされる配列
 * @param {number[]} arr3 ソートされる配列
 */
function keisoku(arr1: number[], arr2: number[], arr3: number[])
{
	const start1 = performance.now();

	bubbleSort(arr1, 0);

	const end1 = performance.now();

	const result1 = (end1 - start1) / 1000;

	console.log(`バブルソート: ${result1}秒`);


	const start2 = performance.now();

	selectSort(arr2, 0);

	const end2 = performance.now();

	const result2 = (end2 - start2) / 1000;

	console.log(`選択ソート: ${result2}秒`);


	const start3 = performance.now();

	intersectionSort(arr3, 0);

	const end3 = performance.now();

	const result3 = (end3 - start3) / 1000;

	console.log(`挿入ソート: ${result3}秒`);
}

export {getRandomIntInclusive, bubbleSort, selectSort, keisoku};