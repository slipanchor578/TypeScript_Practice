import { getRandomIntInclusive, keisoku } from "./bubble_select_intersect.js";

const arr1: number[] = [];

// 1から50000までの乱数を要素数50000の配列にセット
for(let i = 0; i < 50000; ++i) arr1[i] = getRandomIntInclusive(1, 50000);

// 同じ要素が詰まった配列を作ってソートアルゴリズムの優劣を確認する
const arr2 = Array.from(arr1);
const arr3 = Array.from(arr1);

keisoku(arr1, arr2, arr3);

/*
	バブルソート: 8.677064105000348秒
	選択ソート: 3.5919710269998757秒
	挿入ソート: 1.6937605320001021秒
*/