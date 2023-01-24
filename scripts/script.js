// to delete code above before pushing

// app data
const amt = {
    income: {
        total: parseFloat(0),
        detail: []
    },
    expense: {
        total: parseFloat(0),
        detail: []
    },
    total: parseFloat(0),
    month: () => {
        let date = new Date;
        let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthName[date.getMonth()];
    },
}

// setting the current month name.
let month = document.getElementById('month');
month.innerText = amt.month();

// draw function
function draw(what, where) {
    if (what == 'text') {
        let textEl = document.createElement('div');
        textEl.style['grid-area'] = 'text';
        textEl.style['textAlign'] = 'left';
        textEl.id = where.id + '-' + 'text';
        where.appendChild(textEl);
        return textEl;
    } else if (what == 'value') {
        let valueEl = document.createElement('div');
        valueEl.style['grid-area'] = 'value';
        valueEl.style['textAlign'] = 'center';
        valueEl.id = where.id + '-' + 'value';
        where.appendChild(valueEl);
        return valueEl;
    }
}

// function for displaying the data
function display(type = null) {
    // total amount display
    let totalEl = document.getElementById('summary-display-money');
    if (amt.total > 0) {
        totalEl.innerText = '+ ' + amt.total;
    } else {
        totalEl.innerText = amt.total;
    }
    // total income display
    let incomeEl = document.getElementById('summary-display-chart-income-money');
    incomeEl.innerText = amt.income.total;

    // total expense display
    let expenseEl = document.getElementById('summary-display-chart-expense-money');
    expenseEl.innerText = amt.expense.total;

    // displaying income/expense chart
    if (type != null) {
        let el = document.createElement('div');
        // css styles
        // el style
        el.style['display'] = 'grid';
        el.style['grid-template-columns'] = '1fr 1fr';
        el.style['grid-template-rows'] = '1fr';
        el.style['grid-template-areas'] = '"text value"';

        if (type == 'income') {
            let parentEl = document.getElementById('detail-income-view');
            let arr = amt.income.detail;
            el.id = type + '-' + [arr.length - 1];

            let textEl = draw('text', el);
            textEl.innerText = arr[arr.length - 1].description;
            let valueEl = draw('value', el);
            valueEl.innerText = arr[arr.length - 1].value;
            parentEl.appendChild(el);
        } else if (type == 'expense') {
            let parentEl = document.getElementById('detail-expense-view');
            let arr = amt.expense.detail;
            el.id = type + '-' + [arr.length - 1];

            let textEl = draw('text', el);
            textEl.innerText = arr[arr.length - 1].description;
            let valueEl = draw('value', el);
            valueEl.innerText = arr[arr.length - 1].value;
            parentEl.appendChild(el);
        }
    }
}

// function calculating everything
function calculate(type, description, val) {
    let arr;
    switch (type) {
        case 'income':
            arr = amt.income.detail;
            amt.income.total += val;
            amt.total += val;
            break;
        case 'expense':
            arr = amt.expense.detail;
            amt.expense.total += val;
            amt.total -= val;
            break;
        default:
            console.log('Money type error.');
    }
    let posToInsert = arr.length;

    let detail = {
        'description': description,
        'value': val
    };
    arr[posToInsert] = detail;

    display(type);
}

function btnDone() {
    // money details
    let type = document.getElementById('money-type');
    let description = document.getElementById('input-text');
    let money = document.getElementById('input-number');
    if (money.value != 0 && description.length != 0) {
        calculate(type.value, description.value, parseFloat(money.value));
    } else {
        console.log('moneyval is 0 and description in not given');
    }
    money.value = '';
    description.value = '';
    type.value = 'income';
}
// event
let btn = document.getElementById('btn-done');
btn.addEventListener('click', btnDone);

// ondocument load
display();