export default function plus(...nums: number[]) {
  return nums.reduce((pre, current) => pre + current, 0);
}
