import { collections } from "../deps.ts";

const numbers = [3, 2, 5, 2, 5, 6];
const dropWhileNumbers = collections.dropWhile(numbers, (i) => i !== 3);

console.log(dropWhileNumbers);
