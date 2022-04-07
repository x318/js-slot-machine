import { $ } from './modules/jselector.js'

const balanceElem = $('#balance')
const betInput = $('#bet')
const prizeInput = $('#win')
const plusBtn = $('#plus')
const minusBtn = $('#minus')
const rolls = $('#roll')

let balance = 1000
let score = 0
balanceElem.innerText = balance

const bets = [10, 50, 100, 250, 500, 1000, 5000, 10000]

let betVal = 0
betInput.value = bets[betVal]

plusBtn.addEventListener('click', () => {
  if (betVal < bets.length - 1) {
    betInput.value = bets[++betVal]
  }
})

minusBtn.addEventListener('click', () => {
  if (betVal > 0) {
    betInput.value = bets[--betVal]
  }
})

const figures = [
  { figure: 'A', val: 1 },
  { figure: 'B', val: 2 },
  { figure: 'C', val: 3 },
  { figure: 'D', val: 4 },
  { figure: 'E', val: 6 },
  { figure: 'F', val: 15 },
  { figure: '*', val: 25 },
]

function getRandomFigure() {
  return figures[Math.floor(Math.random() * figures.length)]
}

function roll() {
  const presentFigures = []

  $('#spin').disabled = true

  let i = 0
  function loop() {
    setTimeout(() => {
      const roll = rolls[i]
      if (!roll.children[0]) {
        roll.innerHTML = ''
        const newEl = document.createElement('p')
        newEl.innerText = getRandomFigure().figure
        roll.appendChild(newEl)
      }

      const anim = roll.children[0].animate(
        [
          // keyframes
          { transform: 'translateY(0)', filter: 'blur(0px)' },
          { transform: 'translateY(-115px)', filter: 'blur(10px)' },
        ],
        {
          // timing options
          duration: 400,
          iterations: 1,
          easing: 'ease-in',
        }
      )

      anim.onfinish = () => {
        roll.innerHTML = ''
        const newEl = document.createElement('p')
        const rf = getRandomFigure()
        presentFigures.push(rf)
        newEl.innerText = rf.figure
        roll.appendChild(newEl)
        i++
        if (i < rolls.length) {
          loop()
        } else {
          const dt = presentFigures[0].val * presentFigures[1].val * presentFigures[2].val
          balance += Math.floor(((dt - dt * 0.5) * betInput.value) / 100)
          balance -= betInput.value
          balanceElem.innerText = balance
          prizeInput.value = Math.floor(((dt - dt * 0.5) * betInput.value) / 100) - betInput.value
          score += parseInt(prizeInput.value)
        }
      }
    }, 300)
  }
  loop()

  setTimeout(() => {
    $('#spin').disabled = false
  }, 2100)
}

function gameover() {
  $('.container').innerHTML = `
  <div class="info-inner">
  <label for="win">Your name</label>
  <input id="playername" />
  </div>
  `

  $('#playername').addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      localStorage.setItem(e.target.value, score)
      window.location.replace('/new_game.html')
    }
  })
}

$('#spin').addEventListener('click', () => {
  if (balance >= betInput.value) {
    roll()
  } else {
    gameover()
  }
})
