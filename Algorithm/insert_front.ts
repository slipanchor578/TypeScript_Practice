import { LinkedList } from "./list";

const resultArray = new Array<string>(10);

const resultArray2 = new Array<string>(10);

// 10回ループを回してテストする
for(let t = 0; t < 10; ++t)
{
    const start = Number(new Date());

    const array: number[] = [];

    for(let i = 0; i < 50000; ++i)
    {
        for(let j = i; j > 0; --j)
        {
            // array[N]の位置にarray[N - 1]の要素を挿入する
            // 常に先頭に新しい要素が入るので、それを考慮して1個ずつ後ろに既存の要素をずらしている感じ
            array[j] = array[j - 1];
        }

        // 常に先頭に新しい要素を挿入する
        array[0] = Math.random();
    }

    const end = Number(new Date());

    resultArray[t] = `配列の場合: ${t + 1}回目: ${end - start}ミリ秒`;
}

for(let u = 0; u < 10; ++u)
{
    const start2 = Number(new Date());

    const list = new LinkedList();

    for(let i = 0; i < 100000; ++i)
    {
        // 単方向リストの場合は単純にメソッドを呼び出すだけ
        list.addFirst(Math.random());
    }

    const end2 = Number(new Date());

    resultArray2[u] = `単方向リストの場合: ${u + 1}回目: ${end2 - start2}ミリ秒`;
}

for(const result of resultArray)
{
    console.log(result);
}

console.log();

for(const result2 of resultArray2)
{
    console.log(result2);
}

/*
    結果:

    配列の場合: 1回目: 2739ミリ秒
    配列の場合: 2回目: 2745ミリ秒
    配列の場合: 3回目: 2347ミリ秒
    配列の場合: 4回目: 2336ミリ秒
    配列の場合: 5回目: 2336ミリ秒
    配列の場合: 6回目: 2325ミリ秒
    配列の場合: 7回目: 2336ミリ秒
    配列の場合: 8回目: 2333ミリ秒
    配列の場合: 9回目: 2329ミリ秒
    配列の場合: 10回目: 2341ミリ秒

    単方向リストの場合: 1回目: 26ミリ秒
    単方向リストの場合: 2回目: 15ミリ秒
    単方向リストの場合: 3回目: 5ミリ秒
    単方向リストの場合: 4回目: 4ミリ秒
    単方向リストの場合: 5回目: 4ミリ秒
    単方向リストの場合: 6回目: 4ミリ秒
    単方向リストの場合: 7回目: 3ミリ秒
    単方向リストの場合: 8回目: 6ミリ秒
    単方向リストの場合: 9回目: 4ミリ秒
    単方向リストの場合: 10回目: 6ミリ秒

    先頭に要素を入れていく場合の、配列と単方向リストでの処理時間の比較

    配列の場合は要素が増えるほど1つ後ろにずらす作業が増えるため時間がかかる
    単方向リストの場合は要素がいくら増えても新しい子ノードを作って
    既存の子ノードを繋ぎ直す(参照するポインタを変える)だけなので圧倒的に処理時間に差がある

    行う処理によって使うコンテナを選択することは大事

*/