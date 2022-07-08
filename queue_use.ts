import {Queue} from "./queue";

const queue = new Queue<number>();

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

console.log((queue.dequeue() === undefined)); // true

const queue2 = new Queue<string>();

queue2.enqueue("foo");

queue2.enqueue("bar");

queue2.enqueue("baz");

for(let i = 0; i < 3; ++i)
{
    console.log(queue2.dequeue()); // foo bar baz
}