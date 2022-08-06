import { StringReader } from "https://deno.land/std@0.150.0/io/readers.ts";
import { bufio, conversions, io, writers } from "../deps.ts";

const decoder = new TextDecoder();
const deno = Deno.run({
  cmd: [Deno.execPath(), "--version"],
  stdout: "piped",
});
const output = await io.readAll(deno.stdout);
deno.stdout.close();
deno.close();
console.log(decoder.decode(output));

const encoder = new TextEncoder();
// This is deprecated
await io.writeAll(Deno.stdout, encoder.encode("Hello, world!\n"));
// This replaces deprecated methods in io module
await conversions.writeAll(Deno.stdout, encoder.encode("Hello, world!\n"));

const r = new StringReader("Hello, world!");
const it = conversions.iterateReader(r, { bufSize: 1 });
const results = [];
for await (const x of it) {
  results.push(decoder.decode(x));
}
console.log(results);

// BufReader
const buf = bufio.BufReader.create(Deno.stdin);
const result = await buf.readLine();
if (result != null) {
  console.log(decoder.decode(result.line));
}

// BufWrite
const file = await Deno.open("sample.txt", { write: true, create: true });
try {
  const buf = bufio.BufWriter.create(file);
  await buf.write(encoder.encode("Hello, Deno!\n"));
  await buf.write(encoder.encode("Hello, world!\n"));
  await buf.flush();
} catch (error) {
  console.error(error);
} finally {
  file.close();
}
console.log(await Deno.readTextFile("sample.txt"));

// StringWriter
const w = new writers.StringWriter();
await conversions.writeAll(w, encoder.encode("Hello, world!\n"));
console.log(w.toString());
