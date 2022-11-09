let timer: string | number | NodeJS.Timeout | undefined;
export const Debounce = (func: () => void) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    return func();
  }, 300);
};
