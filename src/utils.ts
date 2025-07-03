// TODO: rewrite
/* WARN: Текущая реализация подходит только для использования в
    одном месте - main:obserber. Если попробовать использовать в
    другом месте и контексте, то будет непредвиденное поведение кода
*/
let g_timerId: number | undefined;

/** If you run it before exec previous, then current instruction was dropped. */
function setTimeoutWithIgnore(callback: Function, delay: number): boolean {
  if (g_timerId) return false;

  g_timerId = setTimeout(() => {
    callback();
    g_timerId = undefined;
  }, delay);

  return true;
}

function replaceToUpperElement(element: HTMLElement, destination: HTMLElement) {
  element.remove();
  let empty = document.createElement("div");
  destination.replaceWith(empty);
  empty.replaceWith(element);
}
