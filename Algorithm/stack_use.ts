import {Stack} from "./stack";

const stack = new Stack<number>();

for(let i = 1; i <= 10; ++i)
{
    stack.push(i);
}

for(let i = 0; i < 10; ++i)
{
    console.log(stack.pop());
}