export default function throttleLead(fn, threshhold = 250, scope) {
  let last;
  return function(...args) {
    const context = scope || this;
    const now = +new Date();

    if (last && now > last + threshhold) {
      last = now;
      fn.apply(context, args);
    } else if (!last) {
      last = now;
      fn.apply(context, args);
    }
  };
}
