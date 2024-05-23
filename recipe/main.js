let cart= document.querySelectorAll('.item')


let products=[
  {
    product: 'Fish & Chips',
    tag:'fish_chips',
    price:30,
    inCart:0


  },

  {
    product: 'Green Salad',
    tag:'green_salad',
    price:30,
    inCart:0


  },

  {
    product: 'Beef Kabab',
    tag:'beef_kabab',
    price:30,
    inCart:0


  },

];

for ( let i=0; i< cart.length; i++){
  cart[i].addEventListener('click',()=>{
    cartNumbers(products[i]);
    totalcost(products[i]);
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers){
    document.querySelector('.Cart span').textContent=productNumbers;
  }
}

function cartNumbers(product){
  let productNumbers = localStorage.getItem('cartNumbers')

  productNumbers=parseInt(productNumbers);
  if( productNumbers ){
    localStorage.setItem('cartNumbers',productNumbers+1); 
    document.querySelector('.Cart span').textContent=productNumbers+1;
  }else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.Cart span').textContent=1;
  }
  setItems(product);
}


function setItems(product){
  let cartItems= localStorage.getItem('productsInCart'); 
  cartItems= JSON.parse(cartItems);

  if(cartItems != null){
    if(cartItems[product.tag] ==undefined){
      cartItems ={
        ...cartItems,
        [product.tag]:product
      }
    }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart =1;
    cartItems= {
      [product.tag]:product
    }  
  }


  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
//the item isnt passed as javascript object, but as JSON 
           //object into local storage ,so we need to change it.
}

function totalcost(product){
    //console.log("THe price is", product.price)
    let cartCost= localStorage.getItem('totalCost')
    
    if(cartCost !=null){
      cartCost= parseInt(cartCost)
      localStorage.setItem("totalCost",cartCost+product.price);
    }else{
      localStorage.setItem("totalCost",product.price);
    }


}

function displayCart(){
  let cartItems= localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  
  let productContainer=document.querySelector(".product-container");
  let summarySection=document.querySelector(".summary-section");
  let cartCost= localStorage.getItem('totalCost')
  let productNumbers = localStorage.getItem('cartNumbers')
  console.log(cartItems);
  if( cartItems && productContainer ){
     productContainer.innerHTML = ` `;
     Object.values(cartItems).map(item =>{
        productContainer.innerHTML += `
        <div class="product">
            <div class="prod_detail">
              <img src="${item.tag}.svg">
              <div class="info">
                <div class="name">${item.product}</div>
                <small>Box size: 1 person (2 meals)</small>
              </div>  
            </div> 

            <div class="item">
              <button type="button" class="minus" id="minus">
              </button>
              <span class="Quantity">${item.inCart}</span>
              <button type="button" class="add" id="add">
              </button>
            </div>
            <span class="the-price">${item.inCart * item.price}</span>
        </div>       
        `
       });

  }

  if( cartItems && summarySection ){
    Object.values(cartItems).map(item =>{
      summarySection.innerHTML = `
      <div class="order-summary">
        <h2>Order Summary</h2>
        <p class="subtotal">Recipe (  <span class="item_count">${productNumbers}</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$<span class="price"> ${cartCost}</span></p>
        <p class="delivery">Free Delivery &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$<span class="price">       0</span></p>
        <hr>
        <p class="total">Total<span class="symbol">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$</span><span class="total_price">      ${cartCost}</span></p>
        <div class="date-time">
          <div onclick="showDatePicker()">
              <img src="Calendar.svg" alt="Calendar">
              <span class="selected-date" id="selected-date">choose date and time</span>
          </div>
          <div class="dropdown">
            <img src="clock.svg" alt="Clock">
            <select name="time" id="time-options" class="time-options">6:00~8:00
              <option>8:00~10:00</option>
              <option>10:00~12:00</option>
              <option>12:00~14:00</option>
              <option>14:00~16:00</option>
            </select>    
          </div>
        </div>
        <div class="button-section">
          <button class="checkout"></button>
          <button class="add-to-plan"></button>
        </div>
      </div>      
      `; 
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

  if (cartItems[tag] && cartItems[tag].inCart > 0) {
    cartItems[tag].inCart -= 1;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    let productNumbers = localStorage.getItem('cartNumbers');
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.Cart span').textContent=productNumbers-1;
    let cartCost = localStorage.getItem('totalCost');
    localStorage.setItem('totalCost', cartCost - cartItems[tag].price);
    displayCart();
  }
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add')) {
    let tag = event.target.closest('.product').querySelector('img').src.split('/').pop().split('.').shift();
    console.log(tag);
    console.log(typeof tag)
    increaseQuantity(tag);
  }
  if (event.target.classList.contains('minus')) {
    let tag = event.target.closest('.product').querySelector('img').src.split('/').pop().split('.').shift();
    decreaseQuantity(tag);
  }
  if (event.target.classList.contains('add-to-cart')) {
    console.log("hhhh")
    let tag = event.target.getAttribute('data-tag');
    console.log(typeof tag);
    console.log(tag);
    increaseQuantity(tag);
  }
});