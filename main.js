
let cart = document.querySelectorAll('.item');
let plan = document.querySelectorAll('.add-to-plan')
let products = [
  {
    product: 'Fish & Chips',
    tag: 'fish_chips',
    price: 30,
    inCart: 0
  },
  {
    product: 'Green Salad',
    tag: 'green_salad',
    price: 30,
    inCart: 0
  },
  {
    product: 'Beef Kabab',
    tag: 'beef_kabab',
    price: 30,
    inCart: 0
  },
];

let productPlan = [
  {
    product: 'Fish & Chips',
    tag: 'fish_chips',
    price: 30,
    calories:3000,
    isClicked:0
  },
  {
    product: 'Green Salad',
    tag: 'green_salad',
    price: 30,
    calories:500,
    isClicked:0
  },
  {
    product: 'Beef Kabab',
    tag: 'beef_kabab',
    price: 30,
    calories:2000,
    isClicked:0
  },
];

for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalcost(products[i]);
  })
}

for (let j = 0; j < plan.length; j++) {
  plan[j].addEventListener('click', () => {
    setPlan(productPlan[j]);
    if(productPlan[j].isClicked==0){
      totalEnergy(productPlan[j]);
    }
    showToast();
  })
  
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.Cart span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.Cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.Cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function setPlan(productPlan){
  let planItems = localStorage.getItem('productsInPlan');
  planItems = JSON.parse(planItems);
  console.log(planItems)
  console
  if (planItems != null) {
    if (planItems[productPlan.tag] == undefined) {
      planItems = {
        ...planItems,
        [productPlan.tag]: productPlan
      }
    }
  } else {
    planItems = {
      [productPlan.tag]: productPlan
    }
  }
  localStorage.setItem("productsInPlan", JSON.stringify(planItems));
  console.log(planItems);
}

function totalEnergy(productPlan){ 
  let planCalories = localStorage.getItem('totalEnergy');
  productPlan.isClicked=1;
  planItems = {
    [productPlan.tag]: productPlan
  }
  if (planCalories != null) {
    planCalories = parseInt(planCalories);
    localStorage.setItem("totalEnergy",  planCalories + productPlan.calories);
  } else {
    localStorage.setItem("totalEnergy", productPlan.calories);
  }
}

function totalcost(product) {
  let cartCost = localStorage.getItem('totalCost');
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let planItems = localStorage.getItem('productsInPlan');
  planItems = JSON.parse(planItems);
  let productContainer = document.querySelector(".product-container");
  let productContainer1 = document.querySelector(".product-container1");
  let summarySection = document.querySelector(".summary-section");
  let cartCost = localStorage.getItem('totalCost');
  let orderSummary = document.querySelector(".order-summary-section");
  let orderSummary1 = document.querySelector(".order-summary-section1");
  let orderSummary2 = document.querySelector(".order-summary-section2");
  let orderSummary3 = document.querySelector(".order-summary-section3");
  let productNumbers = localStorage.getItem('cartNumbers');
  let planContainer=document.querySelector(".plan-container")
  if (cartItems && productContainer) {
    productContainer.innerHTML = ` `;
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class="product">
          <div class="prod_detail">
            <img src="images/${item.tag}.svg">
            <div class="info">
              <div class="name">${item.product}</div>
              <small>Box size: 1 person (2 meals)</small>
            </div>
          </div>
          <div class="item">
            <button type="button" class="minus" id="minus"></button>
            <span class="Quantity">${item.inCart}</span>
            <button type="button" class="add" id="add"></button>
          </div>
          <span class="the-price">$${item.inCart * item.price}</span>
        </div>
      `
    });
  }
  if (cartItems && summarySection) {
    summarySection.innerHTML = `
      <div class="order-summary">
        <h2>Order Summary</h2>
        <p class="subtotal">Recipe (${productNumbers})<span class="price">$ ${cartCost}</span></p>
        <p class="delivery">Free Delivery<span class="price">$0</span></p>
        <hr>
        <p class="total">Total<span class="total_price">$${cartCost}</span></p>
        <div class="date-time">
          <div onclick="showDatePicker()" class="calender">
            <img src="images/Calendar.svg" alt="Calendar">
            <span class="selected-date" id="selected-date">choose date and time</span>
          </div>
          <div class="dropdown">
            <img src="images/clock.svg" alt="Clock">
            <select name="time" id="time-options" class="time-options">6:00~8:00
              <option>8:00~10:00</option>
              <option>10:00~12:00</option>
              <option>12:00~14:00</option>
              <option>14:00~16:00</option>
            </select>
          </div>
        </div>
        <div class="button-section">
          <form action="delivery.html">
            <button class="checkout">
              <img src="images/Checkout.svg" class="checkout">
             <img src="images/checkout-mobile.svg" class="checkout-mobile">
            </button>
          </form>
        </div>
      </div>
    `;
  }
  if (cartItems && orderSummary) {
    orderSummary.innerHTML = `
      <div class="order-summary">
        <h2>Order Summary</h2>
        <p class="subtotal">Recipe (${productNumbers})<span class="price">$ ${cartCost}</span></p>
        <p class="delivery">Free Delivery<span class="price">$0</span></p>
        <hr>
        <p class="total">Total<span class="total_price">$${cartCost}</span></p>
        <a href="payment.html" class="next-button">
          <img src="images/next_btn.svg" alt="" class="nxt-btn">
        </a>
      </div>
    `;
  }
  if (cartItems && orderSummary1) {
    orderSummary1.innerHTML = `
      <div class="order-summary">
        <h2>Order Summary</h2>
        <p class="subtotal">Recipe (${productNumbers})<span class="price">$ ${cartCost}</span></p>
        <p class="delivery">Free Delivery<span class="price">$0</span></p>
        <hr>
        <p class="total">Total<span class="total_price">$${cartCost}</span></p>
        <a href="confirmation.html" class="next-button">
          <img src="images/pay-now.svg" alt="">
        </a>
      </div>
    `;
  }
  if (cartItems && orderSummary2) {
    orderSummary2.innerHTML = `
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="product-container"></div>
        <hr>
        <p class="subtotal">Recipe (${productNumbers})<span class="price">$ ${cartCost}</span></p>
        <p class="delivery">Free Delivery<span class="price">$0</span></p>
        <p class="total">Total<span class="total_price">$${cartCost}</span></p>
        <a href="payment.html" class="next-button">
         <img src="images/next_btn.svg" alt="">
         <img src="images/pay-now.svg" alt="">
        </a>
      </div>
    `;

    

    setTimeout(() => {
      console.log("hhh");
      let myProduct=document.querySelector('.product-container');
      if(myProduct){
        console.log("hhh");
        myProduct.innerHTML=``
        Object.values(cartItems).map(item => {
          myProduct.innerHTML += `
            <div class="product">
              <div class="prod_detail">
                <img src="images/${item.tag}.svg">
                <div class="info">
                  <div class="name">${item.product}</div>
                  <small>Box size: 1 person (2 meals)</small>
                </div>
              </div>
              <div class="item">
                <button type="button" class="minus" id="minus"></button>
                <span class="Quantity">${item.inCart}</span>
                <button type="button" class="add" id="add"></button>
              </div>
              <span class="the-price">$${item.inCart * item.price}</span>
            </div>
          `
        });        
      }
    },0)
  }

  if (cartItems && orderSummary3) {
    orderSummary3.innerHTML = `
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="product-container"></div>
        <hr>
        <p class="subtotal">Recipe (${productNumbers})<span class="price">$ ${cartCost}</span></p>
        <p class="delivery">Free Delivery<span class="price">$0</span></p>
        <p class="total">Total<span class="total_price">$${cartCost}</span></p>
        <a href="confirmation.html" class="next-button">
         <img src="images/next_btn.svg" alt="">
         <img src="images/pay-now.svg" alt="">
        </a>
      </div>
    `;

    

    setTimeout(() => {
      console.log("hhh");
      let myProduct=document.querySelector('.product-container');
      if(myProduct){
        console.log("hhh");
        myProduct.innerHTML=``
        Object.values(cartItems).map(item => {
          myProduct.innerHTML += `
            <div class="product">
              <div class="prod_detail">
                <img src="images/${item.tag}.svg">
                <div class="info">
                  <div class="name">${item.product}</div>
                  <small>Box size: 1 person (2 meals)</small>
                </div>
              </div>
              <div class="item">
                <button type="button" class="minus" id="minus"></button>
                <span class="Quantity">${item.inCart}</span>
                <button type="button" class="add" id="add"></button>
              </div>
              <span class="the-price">$${item.inCart * item.price}</span>
            </div>
          `
        });        
      }
    },0)
  }

  if(cartItems && productContainer1){
    productContainer1.innerHTML = ` `;
    Object.values(cartItems).map(item => {
      productContainer1.innerHTML += `
        <div class="product">
          <div class="prod_detail">
            <img src="images/${item.tag}.svg">
            <div class="info">
              <div class="name">${item.product}</div>
              <div class="small">Quantity:${item.inCart}</div>
              <div class="small">Box size: 1 person (2 meals)</div>
            </div>
          </div>
          <span class="the-price">$${item.inCart * item.price}</span>
        </div>
      `
    });
  }

  if (planItems && planContainer) {
    planContainer.innerHTML = ``;
    Object.values(planItems).map(item => {
      
      planContainer.innerHTML += `
        <div class="product">
          <div class="prod_detail">
            <img src="images/${item.tag}.svg">
            <div class="info">
              <div class="name">${item.product}</div>
              <small>Box size: 1 person (2 meals)</small>
            </div>
          </div>
          <span class="the-price">$${item.price}
            <button class="delete" data-tag="${item.tag}"></button>
          </span>
        </div>`;
    });
  }
  
}

onLoadCartNumbers();
displayCart();


function increaseQuantity(tag) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems[tag]) {
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    cartNumbers(cartItems[tag]);
    totalcost(cartItems[tag]);
    displayCart();
  }
}

function decreaseQuantity(tag) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems[tag] && cartItems[tag].inCart > 1) {
    cartItems[tag].inCart -= 1;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    let productNumbers = localStorage.getItem('cartNumbers');
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.Cart span').textContent = productNumbers - 1;
    let cartCost = localStorage.getItem('totalCost');
    localStorage.setItem('totalCost', cartCost - cartItems[tag].price);
    displayCart();
  }else{
    cartItems[tag].inCart -= 1;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    let productNumbers = localStorage.getItem('cartNumbers');
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.Cart span').textContent = productNumbers - 1;
    let cartCost = localStorage.getItem('totalCost');
    localStorage.setItem('totalCost', cartCost - cartItems[tag].price);
    delete cartItems[tag];  
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    displayCart();
  }
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('add')) {
    let tag = event.target.closest('.product').querySelector('img').src.split('/').pop().split('.').shift();
    increaseQuantity(tag);
  }
  if (event.target.classList.contains('minus')) {
    let tag = event.target.closest('.product').querySelector('img').src.split('/').pop().split('.').shift();
    decreaseQuantity(tag);
  }
  if (event.target.classList.contains('delete')) {
    let tag = event.target.getAttribute('data-tag');
    console.log=(tag);
    let planItems= localStorage.getItem('productsInPlan');
    planItems=JSON.parse(planItems);
    delete planItems[tag];
    localStorage.setItem("productsInPlan", JSON.stringify(planItems));
    displayCart();
  }
});

function showToast() {
  const toast = document.getElementById('toast');
  toast.style.display = 'flex';
  toast.style.justifyContent = 'center';
  setTimeout(() => {
      toast.style.display = 'none';
  }, 3000);
}


const filterButtons=document.querySelectorAll(".tag_list button");
const filterableCards=document.querySelectorAll(".recipes_section .menu_card");

const filterCards= e=>{
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");
  console.log(e.target);
  filterableCards.forEach(card =>{
    card.classList.add("hide");
    console.log(card.dataset.name);
    console.log(e.target.dataset.name);
    if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "All" || card.dataset.type === e.target.dataset.type || card.id === e.target.id) {
      card.classList.remove("hide");
    }
  })
}

filterButtons.forEach(button => button.addEventListener("click",filterCards));