/**
 * Capitalize first letter of provided text
 * @param {String} text
 */
export function uppercase (text) {
  if (!text) return ''
  text = text.toString()
  return text.toUpperCase()
}
