export default function classNames(...args: (string|null|undefined)[]) {
  return args
    .filter(it => typeof it === 'string' && it.length > 0)
    .join(' ')
}