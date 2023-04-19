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
function shellsort(arr: number[], order: number)
{
	let h = 1;

	for(let temp = 1; temp < Math.floor(arr.length / 9); temp = temp * 3 + 1)
	{
		h = temp;
	}

	switch(order)
	{
		case 0:
			while(h > 0)
			{
				for(let i = h; i < arr.length; ++i)
				{
					let temp = arr[i];

					let j = 0;

					for(j = i; j >= h && arr[j - h] > temp; j -= h)
					{
						arr[j] = arr[j - h];
					}
					arr[j] = temp;
				}
				h = Math.floor(h / 3);
			}
			break;
		case 1:
			while(h > 0)
			{
				for(let i = h; i < arr.length; ++i)
				{
					let temp = arr[i];

					let j = 0;

					for(j = i; j >= h && arr[j - h] < temp; j -= h)
					{
						arr[j] = arr[j - h];
					}

					arr[j] = temp;
				}
				h = Math.floor(h / 3);
			}
			break;
	}
}

/**
 * 
 * @param {number[]} arr ソートされる配列
 * @param {number} order 昇順にするか、降順にするか
 */
function quickSort(arr: number[], order: number)
{
	// 最初は配列全体を対象にする。begin = arr[0], end = arr[last]にする
	quickSortRec(arr, 0, arr.length - 1, order);
}

/**
 * 
 * @param {number[]} arr ソートされる配列
 * @param {number} begin ソート開始位置
 * @param {number} end ソート終了位置
 * @param {number} order 昇順にするか、降順にするか
 */
function quickSortRec(arr: number[], begin: number, end: number, order: number)
{
	// 基準値を選ぶ
	// 例えば要素数3の奇数配列ならarr[Math.floor((0 + 2) / 2)] = arr[1] となる(真ん中)
	// 例えば要素数4の偶数配列ならarr[Math.floor((0 + 3) / 2)] = arr[1] となる(真ん中の1つ前)
	const selectPivot = (arr: number[], begin: number, end: number) => arr[Math.floor((begin + end) / 2)];

	// 毎回基準値を取得する
	let pivot = selectPivot(arr, begin, end);
	let i = begin;
	let j = end;

	switch(order)
	{
		case 0:
			while(true)
			{
				// 基準値より左に小さい要素があればソートできているので++iして進める
				while(arr[i] < pivot){++i;}
				// 基準値より右に大きい要素があればソートできているので--jして進める
				while(arr[j] > pivot){--j;}

				// 左から進めたiと右から進めたjがぶつかったらループ終了
				if(i >= j){break;}

				/*
					基準値の位置よりも左側にあり、基準値より大きい値であるarr[i]と
					基準値の位置よりも右側にあり、基準値よりも小さい値であるarr[j]を入れ替え
					例えば
					arr = [4,3,2,1];
					begin = 0;
					end = 3;
					i = 0;
					j = 3;
					であれば
					[arr[0], arr[3]] = [arr[3], arr[0]];
					で[1,3,2,4]と入れ替える
				*/
				[arr[i], arr[j]] = [arr[j], arr[i]];

				// 同じ要素を入れ替えても仕方ないので1つずつずらす
				i++;
				j--;
			}
			break;
		case 1:
			while(true)
			{
				while(arr[i] > pivot){++i;}
				while(arr[j] < pivot){--j;}

				if(i >= j){break;}
				[arr[i], arr[j]] = [arr[j], arr[i]];

				i++;
				j--;
			}
			break;
	}

	// iの値は配列の右側に進んでどんどん増えていく
	//「3 - 0 >= 2」のような状況であれば基準値よりも左側に2つ以上の並び替えるブロックが
	// 残っているのでそのブロックをクイックソートを再帰で呼ぶ
	if(i - begin >= 2)
	{
		// beginは変わらず、現在の終端がiなので-1して再帰する
		// iは左の方向に狭まっていくはず
		// [4,3,2,1]
		// [(4,3),2,1]
		// [(4),3,2,1]
		// と、最終的にブロックにできない(要素1つ)になるまで再帰を呼んでいく
		quickSortRec(arr, begin, i - 1, order);
	}

	// jの値は配列の左側に進んでどんどん減っていく
	// 「3 - 1 >= 2」のような状況であれば基準値よりも右側に2つ以上の並び替えるブロックが
	// 残っているのでそのブロックをクイックソートを再帰で呼ぶ
	if(end - j >= 2)
	{
		
		// endは変わらず、現在の始端がjなので+1して再帰する
		// jは右の方向に狭まっていくはず
		// [4,3,2,1]
		// [4,3,(2,1)]
		// [4,3,2,(1)]
		// と、最終的にブロックにできない(要素1つ)になるまで再帰を呼んでいく
		quickSortRec(arr, j + 1, end, order);
	}
}

export {getRandomIntInclusive, shellsort, quickSort};