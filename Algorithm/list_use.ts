import { LinkedList } from "./list";

// 単方向リストを作成
const list = new LinkedList();

// 子ノードを1つも持っていないのでNull
console.log(list.getFirstNode() === null);

for(let i = 1; i < 11; ++i)
{
    // 子ノードを作成しては繋げていく
    list.add(i);
}

// ひたすらnode.nextNodeを辿って行って、最後の子ノードを返す
// 当然末尾なのでnextNode = null になっている
console.log(list.getLastNode()); // ChildNode { value: 10, nextNode: null }

console.log(list.toString()); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

console.log(list.getLength()); // 10

// index = 0 の位置の後ろに10000を持つ子ノードを挿入
list.insertAfter(0, 10000);

console.log(list.toString()); // 1, 10000, 2, 3, 4, 5, 6, 7, 8, 9, 10

console.log(list.getLength()); // 11。 1つ子ノードを追加したので増えている

console.log(list.getFirstNode());

/*
    リストの面白い所は「list」単独ではfirstNodeプロパティしか持っていない所
    ただし子ノードのnextNodeを辿っていくと子ノードが大量にぶら下がっている形になっている

    ChildNode {
        value: 1,
        nextNode: ChildNode {
            value: 10000,
            nextNode: ChildNode { value: 2, nextNode: [ChildNode] }
        }
    }
*/