let currentValue = ''
let decimal = false
let locked = false
let queuedValue = ''
let storedOperation = ''

// calc functions
const updateDisplay = () => {
  if (currentValue) {
    let place = 10
    const end = currentValue.length - 1
    for (let i = end; i >= 0; i--) {
      const cell = document.querySelector(`.cell:nth-of-type(${place--})`)
      cell.textContent = currentValue[i]
    }
  }
}

// input handlers
const handleNumberInput = (e) => {
  if (!locked && currentValue.length < 10) {
    currentValue += e.target.value
    updateDisplay()
  }
}

const handleDec = (e) => {
  if (!locked && !decimal) {
    if (currentValue) {
      currentValue += '.'
      decimal = true
    } else {
      currentValue = '0.'
      decimal = true
    }
    updateDisplay()
  }
}

const handleOperatorInput = (e) => {
  console.log(e.target.value)
}

const handleEquals = (e) => {
  console.log(e.target.value)
}

const handleClear = () => {
  currentValue = ''
  decimal = false
  locked = false
  document.querySelectorAll('.cell').forEach((e) => (e.textContent = ''))
}

const handleReset = () => {
  console.log('reset')
}

// register event listeners
document.querySelectorAll('.btn.num').forEach((e) => {
  e.addEventListener('click', handleNumberInput)
})

document.querySelectorAll('.btn.calc').forEach((e) => {
  e.addEventListener('click', handleOperatorInput)
})

document.querySelector('#clear').addEventListener('click', handleClear)
document.querySelector('#reset').addEventListener('click', handleReset)
document.querySelector('.btn.dec').addEventListener('click', handleDec)
document.querySelector('.btn.equals').addEventListener('click', handleEquals)
