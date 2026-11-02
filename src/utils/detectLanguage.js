const KHMER_RANGE = /[ក-៿᧠-᧿]/;
const CJK_RANGE = /[]/;

/** Returns true when the text contains any Khmer character. */
export const hasKhmer = (text = '') => KHMER_RANGE.test(String(text));

/** Returns 'khmer' | 'english' CSS class name based on the text content. */
export const fontClass = (text = '') => {
  const value = String(text);
  if (hasKhmer(value)) return 'khmer';
  if (CJK_RANGE.test(value)) return '';
  return 'english';
};

/** Mixed Khmer + English text: Kantumruy Pro first, Arial fallback. */
export const textClass = (text = '') => (hasKhmer(text) ? 'khmer' : fontClass(text));
