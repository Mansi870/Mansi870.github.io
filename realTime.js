let currentOrders = []
let itemPriceList = {
  "ButterChicken": 150,
  "Roti": 30,
  "DalTadka": 20,
  "Paratha": 45,
  "Noodles": 100,
  "Rice": 100,
  "Manchuria": 80,
  "Soup": 60,
  "Salad": 100,
  "Shakshuka": 100,
  "Briam": 150,
  "Tabouli": 180,
  "Dosa": 50,
  "Sambhar": 50,
  "Idli": 45,
  "Biryani": 120,
  "Pizza": 150,
  "Pasta": 120,
  "Spaghetti": 100,
  "FrenchToast": 80
}
let topDishes = []
let lastOrders = []
let orderNum = 0

function indexHTML() {
  console.log('indexHTML Start')
  setTop()
  setLastOrders()
  console.log('indexHTML Finish')
}

function addOrder(item) {
  let num = parseInt(document.getElementById(item).innerHTML)
  document.getElementById(item).innerHTML = num + 1
  currentOrders.push(item)
  console.log(num, currentOrders)
  sessionStorage.setItem('currentOrders', JSON.stringify(currentOrders))
}

function removeOrder(item) {
  const index = currentOrders.indexOf(item)
  if (index > -1) {
    let num = parseInt(document.getElementById(item).innerHTML)
    document.getElementById(item).innerHTML = num - 1
    currentOrders.splice(index, 1)
  }
  console.log(currentOrders)
  sessionStorage.setItem('currentOrders', JSON.stringify(currentOrders))
}

function checkoutHTML() {
  console.log('CheckoutHTML start')
  total()
  console.log('CheckoutHTML finish!')
}

function total() {
  let storedCurrentList = JSON.parse(sessionStorage.getItem('currentOrders'))
  let storedLastOrders = JSON.parse(localStorage.getItem('lastOrders'))
  let storedTopDishes = JSON.parse(localStorage.getItem('topDishes'))
  let orderList = document.getElementById('orderList')
  let storedOrderNum = JSON.parse(localStorage.getItem('orderNumber'))
  let sum = 0
  let finalOrder = {}
  for (i = 0; i < storedCurrentList.length; i++) {
    if (storedCurrentList[i] in finalOrder) {
			finalOrder[storedCurrentList[i]] += 1
		} else {
      finalOrder[storedCurrentList[i]] = 1
      if (storedTopDishes){
        storedTopDishes.unshift(storedCurrentList[i])
      } else {
        topDishes.unshift(storedCurrentList[i])
      }
		}
  }
  for (const item in finalOrder) {
    let ele = document.createElement('p')
    sum += finalOrder[item] * itemPriceList[item]
    ele.innerHTML = `${item}: ${finalOrder[item]} x ${itemPriceList[item]} = ${finalOrder[item] * itemPriceList[item]}`
    orderList.appendChild(ele)
  }
  let totalPay = document.createElement('p')
  totalPay.innerHTML = `Total to pay is ${sum}`
  orderList.appendChild(totalPay)
  if (storedTopDishes) {
    localStorage.setItem('topDishes', JSON.stringify(storedTopDishes))
	} else {
		localStorage.setItem('topDishes', JSON.stringify(topDishes))
  }
  sessionStorage.removeItem('currentOrders')
  let finalOrderList = Object.keys(finalOrder) 
  let orderID = document.createElement('p')
  if (storedOrderNum) {
    storedOrderNum += 1
    orderID.innerHTML = `Your Order Number is ${storedOrderNum}`
    if (storedLastOrders) {
      storedLastOrders.unshift([storedOrderNum, finalOrderList.join()])
      localStorage.setItem('lastOrders', JSON.stringify(storedLastOrders))
    }
    localStorage.setItem('orderNumber', JSON.stringify(storedOrderNum))
  } else {
    orderNum += 1
    orderID.innerHTML = `Your Order Number is${orderNum}`
    lastOrders.unshift([orderNum, finalOrderList.join()])
    localStorage.setItem('lastOrders', JSON.stringify(lastOrders))
    localStorage.setItem('orderNumber', JSON.stringify(orderNum))
  }
  orderList.appendChild(orderID)
}

function setTop() {
  let storedTopDishes = JSON.parse(localStorage.getItem('topDishes'))
  let top = document.getElementById('topDishes')
  for (i = 0; i < 5; i++) {
    let ele = document.createElement('p')
    if (storedTopDishes[i]) {
      ele.innerHTML = storedTopDishes[i]
      top.appendChild(ele)
    } 
  }
}

function setLastOrders() {
  let storedLastOrders = JSON.parse(localStorage.getItem('lastOrders'))
  console.log(storedLastOrders)
  let last = document.getElementById('lastOrders')
  if (storedLastOrders) {
    for (i = 0; i < storedLastOrders.length; i++) {
      let ele = document.createElement('p')
      if (storedLastOrders[i]) {
        ele.innerHTML = 'Order Number was ' + storedLastOrders[i][0] + ' ' + storedLastOrders[i][1]
        last.appendChild(ele)
      }
    }
  }
}
