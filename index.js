const balance = document.getElementById('balance');
const moneyMax = document.getElementById('moneyMax');
const moneyMin = document.getElementById('moneyMin');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);


let transactions = localStorageTransactions;
if (transactions === null)
    transactions = [];

function addTransaction() {
    const transaction = {
        id: generateNewID(),
        text: text.value,
        amount: amount.value
    };

    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = null;
    amount.value = null;
}


function generateNewID() {
    return Math.floor(Math.random() * 100000000);
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}


function addTransactionToDOM(transaction) {
    const item = document.createElement('li');
    item.classList.add(parseFloat(transaction.amount) > 0 ? 'newAmount' : 'consumedMoney');

    const amount = parseFloat(transaction.amount);

    item.innerHTML = `
        ${transaction.text} <span>${amount.toFixed(2)}</span>
        <button onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

function updateValues() {
    const totalAmount = transactions.reduce((accum, transaction) => {
        return accum + parseFloat(transaction.amount);
    }, 0);

    const newAmounts = transactions.filter(transaction => parseFloat(transaction.amount) > 0);
    const totalNewAmout = newAmounts.reduce((accum, transaction) => {
        return accum + parseFloat(transaction.amount);
    }, 0);

    const consumedMoney = transactions.filter(transaction => parseFloat(transaction.amount) < 0);
    const totalConsumedMoney = consumedMoney.reduce((accum, transaction) => {
        return accum + parseFloat(transaction.amount);
    }, 0);


    balance.innerText = `${totalAmount.toFixed(2)} €`;
    moneyMax.innerText = `${totalNewAmout.toFixed(2)} €`;
    moneyMin.innerText = `${totalConsumedMoney.toFixed(2)} €`;
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = [];
    transactions.forEach(addTransactionToDOM);
    updateValues();
}

init();