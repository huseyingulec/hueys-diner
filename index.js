import { menuArray } from "./data.js";

const order = document.getElementById("order");
const checkout = document.getElementById("checkout");
const payment = document.getElementById("payment")

function getMenu() {

    let menuList = ""
    menuArray.forEach(function(menu) {
        menuList += `
        <div class="item">
            <div class="item-icon">
                <p>${menu.emoji}</p>
            </div>
            <div class="item-info">
                <h1>${menu.name}</h1>
                <h4>${menu.ingredients }</h4>
                <h3>$${menu.price}</h3>
            </div>
            <button class="add-button" data-add="${menu.id}"> + </button>
        </div>
        <hr>
        `
    
    }) 
    document.getElementById("menu").innerHTML = menuList
}
getMenu()



document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add);
    }
    else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
    else if (e.target.dataset.complete) {
        handleCompleteBtn()
    }
    else if (e.target.dataset.pay) {
        handlePayBtn(e);
    }
})


function handleAddClick(itemId) { 
    const targetItem = menuArray.filter(function(menu) {
        return menu.id.toString() === itemId
    })[0]
        
        if (!targetItem.isAdded) {
        targetItem.addedItem ++
        targetItem.isAdded = !targetItem.isAdded
        renderOrder(targetItem)
        
        }

        else {
            targetItem.addedItem ++
            document.getElementById(`${targetItem.name}-piece`).innerHTML = `${targetItem.addedItem} x`
        }
    checkoutPrice()
}


function handleRemoveClick(itemId) {
    const targetItem = menuArray.filter(function(menu) {
        return menu.id.toString() === itemId
    })[0]

        if (targetItem.addedItem>1) {
            targetItem.addedItem --
            document.getElementById(`${targetItem.name}-piece`).innerHTML = `${targetItem.addedItem} x`
        }
        else {
            targetItem.addedItem --
            renderOrder(targetItem)
            targetItem.isAdded = false

            const allIsEmpty = menuArray.every(menu => menu.addedItem < 1)
            if (allIsEmpty) {
                visibility(checkout, true)
            }
            }
    checkoutPrice()
}

    


function visibility(selector, hidden) {
    
    if (hidden) {
        selector.classList.add("hidden")
    }
    else {
        selector.classList.remove("hidden")
    }
}



let orderList = ""

function renderOrder(item) {

    orderList = ""
    menuArray.forEach(function(item){
        if (item.addedItem>0) {

        document.getElementById("checkout").classList.remove("hidden")

        orderList += `
        <div class="checkout-item">
            <h1>${item.name} <a class="remove-btn" data-remove="${item.id}"> remove </a></h1>
            <h3 class="item-piece" id="${item.name}-piece">${item.addedItem} x</h3>
            <h3 class="checkout-price">$${item.price}</h3>
        </div> `

    }})

    order.innerHTML = orderList
    
}


function checkoutPrice() {

    let totalItemPrice = 0
    let totalAfterTax = 0
    const TAX = 0.30
    const DISCOUNT = 0.25
    let taxPrice = 0

    menuArray.forEach(function(item){
        if (item.addedItem>0) {
        totalItemPrice += item.price * item.addedItem
        }});
        
        taxPrice = totalItemPrice * TAX
        document.getElementById("tax-value").innerHTML = `${taxPrice.toFixed(2)}`;

        let totalPrice = totalItemPrice
        if (totalPrice>25) {
            const discountPrice = totalPrice * DISCOUNT
            document.getElementById("discount").innerHTML = `-${discountPrice.toFixed(2)}`;
            totalPrice -= discountPrice

        }

        totalAfterTax = totalPrice + taxPrice
        document.getElementById("total-price").innerHTML = `${totalAfterTax.toFixed(2)}`

}


function handleCompleteBtn() {
    visibility(payment, false)
}

function handlePayBtn(e) {
    e.preventDefault()

    const fullName = document.getElementById("full-name").value;
    console.log(fullName);

    payment.innerHTML = `
        <h1 class= "confirmation-txt">Thank you ${fullName}, Your order is on the way!🚚</h1>`
    
    setTimeout(function(){
        visibility(checkout, true)
        visibility(payment, true)
    }, 2000)
    
}


