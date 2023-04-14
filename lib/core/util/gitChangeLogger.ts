export function gitChangeLogger(
  arr: any[],
  changes: Object,
  mode: 'Added' | 'Removed'
) {
  const plusSigns = '+'.repeat(Math.min(arr.length, 10));

  console.log(changes);
  console.log('\x1b[33;1m%s\x1b[0m', `${mode} | ${arr.length} ${plusSigns}`);
}
