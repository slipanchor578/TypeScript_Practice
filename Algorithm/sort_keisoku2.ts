import { getRandomIntInclusive, keikazikan, intersectionSort, shellsort } from "./shellSort.js";


// 要素数50
const arr1: number[] = [];
// 要素数50000
const arr3: number[] = [];

for(let i = 0; i < 50; ++i) arr1[i] = getRandomIntInclusive(1, 50);
for(let i = 0; i < 50000; ++i) arr3[i] = getRandomIntInclusive(1, 50000);

// シェルソート用の配列
const arr2 = Array.from(arr1);
const arr4 = Array.from(arr3);

console.log("要素数50の場合...");

const s1 = performance.now();

intersectionSort(arr1, 0);

const e1 = performance.now();

console.log(`挿入ソート: ${keikazikan(e1, s1)}ミリ秒`);

const s2 = performance.now();

shellsort(arr2, 0);

const e2 = performance.now();

console.log(`シェルソート: ${keikazikan(e2, s2)}ミリ秒`);

console.log("\n要素数50000の場合...");

const s3 = performance.now();

intersectionSort(arr3, 0);

const e3 = performance.now();

console.log(`挿入ソート: ${keikazikan(e3, s3)}ミリ秒`);

const s4 = performance.now();

shellsort(arr4, 0);

const e4 = performance.now();

console.log(`シェルソート: ${keikazikan(e4, s4)}ミリ秒`);

/*
	要素数50の場合...
	挿入ソート: 0.2732ミリ秒
	シェルソート: 0.2655ミリ秒

	要素数50000の場合...
	挿入ソート: 1677ミリ秒
	シェルソート: 17.52ミリ秒

	要素数が少ないうちは挿入ソートでもどうにかなるが
	要素数が50000個と多くなるとシェルソートの方が圧倒的に速くなる
*/