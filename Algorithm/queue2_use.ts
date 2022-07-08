import { Queue2 } from "./queue2";

const queue = new Queue2<number>();

for(let i = 1; i <= 10; ++i)
{
    queue.enqueue(i);
}

console.log(queue.getLength());

for(let i = 0; i < 10; ++i)
{
    console.log(queue.dequeue());
}

console.log(queue.getLength());