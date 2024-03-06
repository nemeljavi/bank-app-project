'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Juan Sánchez',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: 'María Portazgo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Estefanía Pueyo',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Javier Rodríguez',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

// crear una función createUsernames que reciba un array de cuentas
// y devuelva un nuevo array con los nombres de usuario de cada cuenta
// en minúsculas y sin espacios
// por ej, Juan Sánchez -> js
// const account1 = {
//   owner: 'Juan Sánchez',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
//   username: 'js'
// };

// uso map (nuevo array) o forEach (modificar el array original)

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner // Juan Sánchez
      .toLowerCase() // juan sánchez
      .split(' ') // ['juan', 'sánchez']
      .map((name) => name[0]) // ['j', 's']
      .join('') // js (lo contrario que split)
  })
}
createUsernames(accounts)



btnLogin.addEventListener('click', function (e) {
  // no llamar al servidor!!
  e.preventDefault()
  const user= document.querySelector('.login__input--user').value;
  const pin= document.querySelector('.login__input--pin').value

  // hacer la llamada a la api
  
  fetch("http://localhost:4000?username=" + user + "&pin=" + pin)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la llamada a la API");
        }
        return res.json();
      })
      .then((datos) => (datos))
      .catch((error) => console.error(error, "**********"));
  };
 

  // Limpiar los campos
  inputLoginUsername.value = inputLoginPin.value = ''
  inputLoginPin.blur() // quitar el foco
)
  // actualiza la interfaz de usuario con los movimientos de la cuenta, el saldo y un resumen de los movimientos.
function updateUI({ movements }) {
  displayMovements(movements)
  displayBalance(movements)
  displaySummary(movements)
}
 // muestra los movimientos de la cuenta en la interfaz de usuario
function displayMovements(movements) {
  containerMovements.innerHTML = ''
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}
// muestra saldo de la cuenta en la interfaz de usuario
const displayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${balance.toFixed(2)}€`
}
// muestra un resumen de los movimientos de la cuenta
const displaySummary = function (movements) {
  const sumIn = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${sumIn.toFixed(2)}€`

  const sumOut = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(sumOut).toFixed(2)}€`
}
