export function isEven(n) {
  const abs = Math.abs(n);

  if (abs === 0) return true;
  if (abs === 1) return false;

  return isEven(abs - 2);
}
