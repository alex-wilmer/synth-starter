let MINVAL = 134  // 128 == zero.  MINVAL is the "minimum detected signal" level.

export default (buf, buflen) => {
  let i = 0
  let last_zero = -1
  let t

  // advance until we're zero or negative
  while (i < buflen && (buf[i] > 128 ))
    i++

  if (i >= buflen) return 0

  // advance until we're above MINVAL, keeping track of last zero.
  while (i < buflen && ((t = buf[i]) < MINVAL )) {
    if (t >= 128) {
      if (last_zero === -1) last_zero = i
    } else last_zero = -1
    i++
  }

  // we may have jumped over MINVAL in one sample.
  if (last_zero == -1) last_zero = i

  // We didn't find any positive zero crossings
  if (i === buflen) return 0

  // The first sample might be a zero.  If so, return it.
  if (last_zero === 0) return 0

  return last_zero
}
