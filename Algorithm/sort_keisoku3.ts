import { getRandomIntInclusive, shellsort, quickSort } from "./quickSort.js";

// 要素数1000
const arr1: number[] = [];
// 要素数50000
const arr2: number[] = [];

// 要素数100000
const arr3: number[] = [];

for(let i = 0; i < 1000; ++i) arr1[i] = getRandomIntInclusive(1, 1000);
for(let i = 0; i < 50_000; ++i) arr2[i] = getRandomIntInclusive(1, 50000);
for(let i = 0; i < 100_000; ++i) arr3[i] = getRandomIntInclusive(1, 100000);

// クイックソート用の配列
const arr4 = Array.from(arr1);
const arr5 = Array.from(arr2);
const arr6 = Array.from(arr3);

console.log("シェルソート");

const s1 = Date.now();

shellsort(arr1, 0);

console.log(`要素数1000個: ${Date.now() - s1}ミリ秒`);

const s2 = Date.now();

shellsort(arr2, 0);

console.log(`要素数50000個: ${Date.now() - s2}ミリ秒`);

const s3 = Date.now();

shellsort(arr3, 0);

console.log(`要素数100000個: ${Date.now() - s3}ミリ秒`);


console.log("クイックソート");

const s4 = Date.now();

quickSort(arr4, 0);

console.log(`要素数1000個: ${Date.now() - s4}ミリ秒`);

const s5 = Date.now();

quickSort(arr5, 0);

console.log(`要素数50000個: ${Date.now() - s5}ミリ秒`);

const s6 = Date.now();

quickSort(arr6, 0);

console.log(`要素数100000個: ${Date.now() - s6}ミリ秒`);


/*
	シェルソート
	要素数1000個: 14ミリ秒
	要素数50000個: 15ミリ秒
	要素数100000個: 46ミリ秒
	クイックソート
	要素数1000個: 12ミリ秒
	要素数50000個: 20ミリ秒
	要素数100000個: 23ミリ秒

	たまに逆転されることもあるが、クイックソートは弱点がない。安定して速い
*/