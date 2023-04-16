export function yellowLogger(msg: Object) {
  console.log('\x1b[33;1m%s\x1b[0m', msg);
}
