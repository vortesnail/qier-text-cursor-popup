export function isArray(o: any) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

export function insertStr(soure: string, start: number, newStr: string) {
  return soure.slice(0, start) + newStr + soure.slice(start);
}

// get current cursor position, it returns a integer
export function getCursorPosition(obj: HTMLInputElement | HTMLTextAreaElement) {
  let cursorIndex = 0;
  if (obj.selectionStart || obj.selectionStart === 0) {
    cursorIndex = obj.selectionStart;
  }
  return cursorIndex;
}

// 获取光标位置
// export function getCurrentRange() {
//   let range = null;
//   let selection = null;
//   if (isSupportRange()) {
//     selection = document.getSelection();
//     if (selection.getRangeAt && selection.rangeCount) {
//       range = document.getSelection().getRangeAt(0);
//     }
//   } else {
//     range = document.selection.createRange();
//   }
//   return range;
// }
