import {LinkedList2} from "./list2";

const list2 = new LinkedList2<string>();

list2.add("foo");

list2.add("bar");

console.log(list2.getFirstNode());

console.log(list2.toString()); // foo, bar