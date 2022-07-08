import {Queue} from "./queue";

// numberを値に持つキューを作成
const queue = new Queue<number>();

for(let i = 1; i <= 10; ++i)
{
    // 要素を突っ込んでいく
    queue.enqueue(i);
}

console.log(queue.getLength()); // 10

for(let i = 0; i < 10; ++i)
{
    // 最初に入れたものが先に取り出せるのがキューの特徴
    console.log(queue.dequeue()); // 1 2 3 4 5 6 7 8 9 10
}

console.log(queue.getLength()); // 取り出したので0になる

// stringを値に持つキューを作成
const queue2 = new Queue<string>();

queue2.enqueue("foo");

queue2.enqueue("bar");

queue2.enqueue("baz");

for(let i = 0; i < 3; ++i)
{
    console.log(queue2.dequeue()); // foo bar baz
}

/*
    FIFOなキュークラス
    先頭の要素を取り出した後、前方に要素を詰めていく作業が必要なので
    LIFOなスタックと違って要素を取り出す作業が圧倒的に時間がかかる

    ただし、新しく追加された要素を新しいうちに取り出す作業には非常に向いている
    そもそも要素が溜まる前に処理して行けば、いちいち前方に詰めていく作業も少なくなる

    .NETのマルチスレッド処理ではスレッドプールの仕組みにキューが使われている
    新しく追加された要素(処理すべきタスク)を新しい順に次々とスレッドに渡して処理していく

    これがもしスタックで実装される場合、スレッドに渡されて行くのは新しく追加されていったタスクではなく
    既に追加されている古いタスクが優先されるため処理が滞る可能性がある

    行う処理によってスタックとキューを使い分けるのが大事
*/