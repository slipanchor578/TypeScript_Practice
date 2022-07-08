import {LinkedList2} from "./list2";

// stringを値に持つ単方向リストを作成
const list2 = new LinkedList2<string>();

for(let i = 0; i < 10; ++i)
{
    list2.add(i.toString());
}

console.log(list2.toString()); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

// index = 5 の位置の子ノードの後ろに「Hello」を値に持つ子ノードを挿入する
list2.insertAfter(5, "Hello");

console.log(list2.toString()); // 0, 1, 2, 3, 4, 5, hello, 6, 7, 8, 9

console.log(list2.getLength()); // 11