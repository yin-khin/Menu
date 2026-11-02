/** Formats a number as Khmer Riel, e.g. ៛ 20,000 */
export const formatPrice = (amount) =>
  `៛ ${Number(amount || 0).toLocaleString("en-US")}`;
