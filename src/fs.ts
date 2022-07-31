import { fs, posix } from "../deps.ts";

const path = posix.join("dist", "/index.html");

console.log(posix.parse(path));
console.log(posix.resolve(path));
console.log(fs.existsSync("./src"));

for await (const entry of fs.walk("./src")) {
  console.log(entry.name);
}

for await (const entry of fs.expandGlob("./src/*/**.ts")) {
  console.log(entry.name);
}
