// export const $ = (el) => {
//   const match = document.querySelectorAll(el)

//   if (match.length > 1) return match
//   else return match[0]
// }

export const $ = (el) => {
  const match = document.querySelectorAll(el)

  if (match.length > 1) return match
  else return match[0]
}
