
import type { DirectiveBinding, ObjectDirective } from 'vue';

const checkOverflow = (el: HTMLElement) => {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
};

const createCheckHandler = (el: HTMLElement) => {
  const handler = () => {
    window.requestAnimationFrame(() => {
      const isOverflow = checkOverflow(el);
      if (isOverflow) {
        const text = el.textContent?.trim() ?? '';
        el.setAttribute('title', text);
      } else {
        el.removeAttribute('title');
      }
    });
  };
  return handler;
};

export const tooltip: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const lines = (binding.value && Number(binding.value)) || 2;
    el.style.display = '-webkit-box';
    (el.style as any)['-webkit-box-orient'] = 'vertical';
    (el.style as any)['-webkit-line-clamp'] = String(lines);
    el.style.overflow = 'hidden';
    el.style.whiteSpace = 'normal';
    el.style.wordBreak = 'break-word';
    el.style.lineHeight = el.style.lineHeight || '1.4em';
    (el.style as any).maxHeight = `calc(${el.style.lineHeight} * ${lines})`;

    const handler = createCheckHandler(el);
    (el as any).__clamp_tooltip_handler = handler;

    requestAnimationFrame(handler);
    window.addEventListener('resize', handler, { passive: true });
  },

  updated(el: HTMLElement) {
    const handler = (el as any).__clamp_tooltip_handler;
    if (typeof handler === 'function') {
      requestAnimationFrame(handler);
    }
  },

  unmounted(el: HTMLElement) {
    const handler = (el as any).__clamp_tooltip_handler;
    if (typeof handler === 'function') {
      window.removeEventListener('resize', handler);
      delete (el as any).__clamp_tooltip_handler;
    }
    el.removeAttribute('title');
  },
};