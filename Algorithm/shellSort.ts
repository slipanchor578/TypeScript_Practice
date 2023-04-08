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
 * 処理にかかった時間を出力
 * @param {number} endtime 終了した時間
 * @param {number} starttime 開始した時間
 */
function keikazikan(endtime: number, starttime: number)
{
	const result = (endtime - starttime).toFixed(4);
	return result;
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
			for(let i = 1; i < arr.length; ++i)
			{	
				let j = 0;

				let temp = arr[i];

				for(j = i; j > 0 && arr[j - 1] > temp; --j)
				{
					arr[j] = arr[j - 1];
				}
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
 * 
 * @param {number[]} arr ソートされる配列
 * @param {number} order 昇順にするか降順にするか
 */
function shellsort(arr: number[], order: number)
{
	
	// 最初の間隔hを決める。1から始めて「h = h * 3 + 1」を満たす値を使う
	// [1, 4, 13, 40, 121, ...] と増えていく
	// Math.floor(arr.Length / 9)を越えない一番大きなhを最初のhにする
	let h = 1;

	
	// 要素数が小さい配列のソートだと速度が出ない
	// 例えばh = 4になるには要素数45が必要になる。N = 44だとMath.floor(44 / 9 = 4.88)となり「temp < 4」で満たさない
	// N = 45 であれば「45 / 9 = 5」となり「temp < 5」を満たすのでh = 4 間隔となる
	// つまりある程度要素数がないと間隔を取れず挿入ソートになってしまう
	// 要素数が増えるとh = 1の挿入ソートより良くなる
	for(let temp = 1; temp < Math.floor(arr.length / 9); temp = temp * 3 + 1)
	{
		h = temp;
	}

	switch(order)
	{
		// 昇順
		case 0:
			// 間隔が0より大きい間にループ
			while(h > 0)
			{
				
				// h = 4 始まりで左側に交換対象がある場合
				// arr[4] と arr[0]
				// arr[5] と arr[1]
				// arr[6] と arr[2]
				// のように間隔を空けて交換していく。間隔h を狭めていって同じ事を繰り返す
				for(let i = h; i < arr.length; ++i)
				{
					// 要素を保存
					let temp = arr[i];

					let j = 0;
					
					// もしtempと同じ間隔を空けた前方の要素arr[j - h] が temp よりも
					// 大きい時に交換していく
					// j -= h で間隔の分ずつ切り詰めていく
					for(j = i; j >= h && arr[j - h] > temp; j -= h)
					{
						// 交換していく
						arr[j] = arr[j - h];
					}

					// breakした所に保存しておいた要素を入れる	
					arr[j] = temp;
				}

				
				// 例えばh = 4 の時、Math.floor(4 / 3) = 1 になる。h = 13 ならMath.floor(13 / 3) = 4となる
				// hを [1, 4, 13, 40, 121] のように増やしているので逆にここで[121, 40, 13, 1] のように減らしている
				h = Math.floor(h / 3);
			}
			break;
		// 降順
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

export {getRandomIntInclusive, keikazikan, intersectionSort, shellsort};