/**
 * More than equal to pixels.
 */
export const up = (px: number) => `min-width: ${px}px`

/**
 * Less than pixels.
 */
export const down = (px: number) => `max-width: ${px - 0.02}px`
