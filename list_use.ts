import {LinkedList} from "./list";

const list = new LinkedList();

console.log(list.getLastNode()); // 1つも子ノードを持っていないのでnullを返す

list.add(0); // value = 0 を持つ子ノードを1つ足す。firstNodeの値になる

console.log(list.getLastNode()); // ChildNode { value: 0, nextNode: null }

list.add(1);
/*
    value = 1 を持つ子ノードを1つ足す
    先程のadd(0)と違って、firstNode(value = 0)のnextNodeプロパティの値にセットされる
*/

console.log(list.getLastNode()); // ChildNode { value: 1, nextNode: null }

list.add(2);

// nextNodeプロパティを辿って行って、常に最後方のNodeを返す
console.log(list.getLastNode()); // ChildNode { value: 2, nextNode: null }

// 子ノードを辿って行って、ノードが持つ値を文字列にして返す
console.log(list.toString()); // 0, 1, 2

// LinkedListとしては先頭のfirstNodeしか持たず、そのNodeのnextNodeプロパティに
// 次のNodeがぶら下がっているのがリンクリストなどと言われる所以
console.log(list.getFirstNode());
/*
    ChildNode {
        value: 0,
        nextNode: ChildNode {
            value: 1,
            nextNode: ChildNode { value: 2, nextNode: null }
        }
    }
*/