import {Stack} from "./stack";

// 後入れ先出しなスタック構造
const stack = new Stack<number>();

for(let i = 1; i <= 10; ++i)
{
    stack.push(i);
}

for(let i = 0; i < 10; ++i)
{
    console.log(stack.pop()); // 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
}