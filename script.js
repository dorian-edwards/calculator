let currentValue = ''
let queuedValue = ''
let decimal = false
let locked = false
let isRes = false
let operator = null

const operators = {
  '/': divide,
  '*': multiply,
  '-': subtract,
  '+': add,
}

// value to be displayed MUST be a string
// this function doesn't sanitize values to be displayed, probably should tho...
const updateDisplay = () => {
  document.querySelectorAll('.cell').forEach((e) => (e.textContent = ''))
  let place = 10
  const end = currentValue.length - 1
  for (let i = end; i >= 0; i--) {
    const cell = document.querySelector(`.cell:nth-of-type(${place--})`)
    cell.textContent = currentValue[i]
  }
}

const handleKeyPress = (e) => {
  const key = e.keyCode
  if (key === 13 || key === 191) e.preventDefault()
  if (key === 8) return backspace()
  if (key === 67) return clear()

  if (key === 13) return handleOperatorInput('=')

  const search = /\d|[\/\*\-\+\=\.]/g
  const match = search.exec(e.key)
  if (match) {
    const inpt = match[0]
    if (inpt >= 0 && inpt <= 9) {
      handleNumberInput(inpt)
    } else if (inpt === '.') {
      handleDec()
    } else {
      handleOperatorInput(inpt)
    }
  }
}

// input handlers
const handleNumberInput = (e) => {
  const num = e.target?.value || e
  if (locked) return
  if (currentValue.length < 10) {
    if (isRes && operator) {
      queuedValue = currentValue
      currentValue = num
      isRes = false
    } else if (currentValue === '0' || (isRes && !operator)) {
      currentValue = num
      isRes = false
    } else {
      currentValue += num
    }
    updateDisplay()
  }
}

const handleDec = () => {
  if (locked) return
  if (!decimal && !currentValue) {
    currentValue += '0.'
    decimal = true
  }

  if (!decimal && currentValue.length < 10) {
    currentValue += '.'
    decimal = true
  }
  updateDisplay()
}

const handleOperatorInput = (e) => {
  const input = e.target?.value || e
  if (!currentValue || locked) return
  if (currentValue && !operator && input === '=') return
  if (currentValue && !operator) {
    operator = operators[input]
    queuedValue = currentValue
    currentValue = ''
    decimal = false
    isRes = false
  }
  if (currentValue && queuedValue && operator) {
    completeOperation()
    if (input !== '=') {
      operator = operators[input]
    } else {
      operator = null
    }
  }
}

const handleClear = () => {
  if (locked) return
  clear()
  console.clear()
}

const handleReset = () => {
  locked = false
  operator = null
  clear()
  reset()
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
document.querySelector('#del').addEventListener('click', backspace)
document.querySelector('body').addEventListener('keydown', handleKeyPress)

// Utility Functions

function backspace() {
  if (locked) return
  if (currentValue && !isRes) {
    if (currentValue === '0.') {
      currentValue = ''
      decimal = false
    } else if (currentValue.endsWith('.')) {
      currentValue = currentValue.substring(0, currentValue.length - 1)
      decimal = false
    } else {
      currentValue = currentValue.substring(0, currentValue.length - 1)
    }

    updateDisplay()
  }
}

function clear() {
  currentValue = ''
  decimal = false
  isRes = false
  document.querySelectorAll('.cell').forEach((e) => (e.textContent = ''))
}

function reset() {
  queuedValue = ''
  decimal = false
  locked = false
  isRes = false
}

function sanitizeOutput() {
  if (currentValue.length > 10) {
    currentValue = Number(currentValue).toExponential(2).toString()
    locked = true
  }
  if (!Number.isInteger(Number(currentValue))) {
    currentValue = Number(currentValue).toFixed(2).toString()
  }
}

// Calculations
function add(a, b) {
  return Number(a) + Number(b)
}

function subtract(a, b) {
  return Number(a) - Number(b)
}

function multiply(a, b) {
  return Number(a) * Number(b)
}

function divide(a, b) {
  if (Number(b) === 0) {
    return null
  }

  return Number(a) / Number(b)
}

function completeOperation() {
  currentValue = operator(queuedValue, currentValue)
  if (currentValue) {
    currentValue = currentValue.toString()
    sanitizeOutput()
    reset()
    isRes = true
    sanitizeOutput()
    updateDisplay()
  } else {
    currentValue = 'ERROR'
    locked = true
    updateDisplay()
  }
}
