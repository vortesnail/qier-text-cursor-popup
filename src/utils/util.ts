export function isArray(o: any) {
  return Object.prototype.toString.call(o) === '[object Array]';
}
