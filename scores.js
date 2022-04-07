import { $ } from './modules/jselector.js'

function allStorage() {
  let values = [],
    keys = Object.keys(localStorage),
    i = keys.length

  while (i--) {
    values.push({ key: keys[i], value: localStorage.getItem(keys[i]) })
  }

  return values.sort((a, b) => {
    if (a.value > b.value) return -1
    return 1
  })
}

for (const el of allStorage()) {
  const bar = document.createElement('div')
  bar.innerText = `${el.key}: ${el.value}`
  $('#scores').appendChild(bar)
}
