/* ------------------------------------------------------------------ */
// Open and Close the cart
var cartBtn = document.getElementById('cart-container');
var cartOverlay = document.getElementById('cart-overlay');
var cart = document.getElementsByClassName('cart');
var closeBtn = document.getElementsByClassName('close-cart')[0];
var cartItems = document.getElementById('cart-item-list');

cartBtn.onclick = function() {
    cartOverlay.style.visibility = 'visible';
}

closeBtn.onclick = function() {
    cartOverlay.style.visibility = 'hidden';
}

cartOverlay.onclick = function(e) {
    if(e.target == cart) {
        cartOverlay.style.visibility = 'hidden';
    }
}



/* ------------------------------------------------------------------ */
// Item Class
class Item {
    constructor(image, name, price, quantity) {
        this.image = image;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

//UI Class
class UI {

    static displayCart() {
        const cartItems = Store.getItems(); //gets items from local storage
    
        //loop through all items in local storage array and add to cart
        cartItems.forEach((item => UI.addToCart(item)));
        document.getElementById('num-cart-items').textContent = cartItems.length;
    }

   static addToCart(item) {
       const list = document.getElementById('cart-item-list');
       var namesList = list.getElementsByClassName('cart-item-name');
       
       //checks if item is already in cart
        for (var i = 0; i < namesList.length; i++) {
            if (namesList[i].textContent == item.name) {
                
                alert('This item is already in your cart.')
                return //return stops the execution of the following of the code, does not add item to UI cart
            }
        }
       const row = document.createElement('div');
       row.classList.add('cart-item');
       row.innerHTML = `
            <img src="${item.image}">
            <h5 class="cart-item-name">${item.name}</h5>
            <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" max="10">
            <h5 class="cart-item-price">$ ${item.price}</h5>
            <span class="delete-item">delete</span>
       `
       list.prepend(row);
       UI.getTotalPrice();
   }

   static quantityChanged(event) {
       var input = event.target;
       if (isNaN(input.value) || input.value <= 0) {
           input.value = 1;
       }
       UI.getTotalPrice(); //changes the total price with quantity
       
       console.log('Quantity Changed!');
       
   }

   static getTotalPrice() {
       var cartItems = document.getElementById('cart-item-list');
       var items = cartItems.getElementsByClassName('cart-item');
       
       var total = 0;
       for (var i = 0; i < items.length; i++) {
           var item = items[i];
           var priceElement = item.querySelectorAll('.cart-item-price')[0];
           var quantityElement = item.getElementsByClassName('cart-item-quantity')[0];
           
           var price = parseFloat(priceElement.textContent.replace('$ ', ''));
           var quantity = quantityElement.value;
          
           console.log(price * quantity);
           total = total + (price * quantity);
       }
       console.log(total);
       document.getElementById('total-cost').textContent = total.toFixed(2);
    }

   static deleteItem(del) {
       if(del.classList.contains('delete-item')) {
           del.parentElement.remove(); //removes item from cart 
           
           //var delPrice = UI.getTotalPrice(del);
           const cartItems = Store.getItems();
           const total = [];
           
           cartItems.forEach(function(item) {
               var numPrice = item.price; //removes the $
               total.push(parseFloat(numPrice));
           });
   
           const totalPrice = total.reduce(function(total, item) {
               total += item;
               return total;
           },0);
   
           console.log(totalPrice);
           
           //subtracts price of deleted item from total cost
           var numPrice = parseFloat(del.previousElementSibling.textContent.slice(1)).toFixed(2); //selects the price of the deleted item, converted to float, removes $
        
            console.log(parseFloat(numPrice));


           //let finalPrice = parseFloat(document.getElementById('total-cost').innerHTML).toFixed(2); //selects the total cost in the cart, converts to float
           var finalPrice = totalPrice - numPrice;
           console.log(finalPrice);
           
            //subtracts item price from total cart cost
           document.getElementById('total-cost').textContent = finalPrice.toFixed(2); //displays the new final price
           console.log(document.getElementById('total-cost').textContent);
           
           //subtracts the number of cart items by 1 
           let numItems = parseInt(document.getElementById('num-cart-items').textContent) - 1; 
           document.getElementById('num-cart-items').textContent = numItems;
           
       
        }
   }


   static clearCart(el) {
        let listItems = document.getElementsByClassName('cart-item'); //all cart items that were added

        //loops through all cart items and removes them one by one, they will all be at index 0
        while(listItems[0]) {
            listItems[0].parentNode.removeChild(listItems[0]);
        }
        console.log(listItems.length);
        
        console.log(el.parentElement.previousElementSibling.children[0].innerText);
        document.getElementById('total-cost').innerText = parseFloat(0.00).toFixed(2); // resets total cost to 0
        document.getElementById('num-cart-items').innerHTML = listItems.length; // resets num cart items to 0
   }

   static checkout(el) {
    let listItems = document.getElementsByClassName('cart-item'); //all cart items that were added

    //loops through all cart items and removes them one by one, they will all be at index 0
    while(listItems[0]) {
        listItems[0].parentNode.removeChild(listItems[0]);
    }
    console.log(listItems.length);
    
    console.log(el.parentElement.previousElementSibling.children[0].innerText);
    document.getElementById('total-cost').innerText = parseFloat(0.00).toFixed(2); // resets total cost to 0
    document.getElementById('num-cart-items').innerHTML = listItems.length; // resets num cart items to 0
}

   /*static showMessage() {
        //message.style.opacity = 
        document.querySelectorAll('.added').style.opacity = '0.5';
   }*/

}


// Local Storage Class
class Store {
    static getItems() {
        let cartItems;
        if(localStorage.getItem('cartItems') === null) { //check if there is a current cartItem item in local storage, if there is no item of cartItems
            cartItems = [];                             // ...set cartItems to an empty array
        }
        else {
            cartItems = JSON.parse(localStorage.getItem('cartItems')); // cartItems is stored as a string, JSON.parse to use as an array
            let i, x = 0;
            for (i in cartItems) {
                x += parseFloat(cartItems[i].price);
            }
    
        }
        return cartItems;
    }

    static addItem(cartItem) {
        const cartItems = Store.getItems();
        var namesList = cartItems.map(({name}) => name);
        
       //checks if item is already in cart
        for (var i = 0; i < namesList.length; i++) {
           
            if (namesList[i] == cartItem.name) {
                return //return stops the execution of the following of the code, does not add item to UI cart
            }
        }
        
        cartItems.push(cartItem);
        document.getElementById('num-cart-items').textContent = cartItems.length; 
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); //reset it to local storage, stringify to add to local storage
    }

    static saveQuantity(event) {
        var input = event.target;
        cartItem.quantity = input.value;
        console.log(cartItem.quantity);

        localStorage.setItem('carItems', JSON)
    }


    static deleteItem(del, name) {
        if(del.classList.contains('delete-item')) {
            const cartItems = Store.getItems();

            cartItems.forEach(function(cartItem, index) { //(cartItem, index)
                if(cartItem.name === name) {        //(cartItem.name === name)
                    cartItems.splice(index, 1);
                }
            });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }

    static clearCart() {
        const cartItems = Store.getItems();
       
        cartItems.length = 0; //sets the cartItems array to empty
        //cartItems.splice(0, cartItems.length) .... this also sets the array to empty
        
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
        
    }

    static checkout() {
        const cartItems = Store.getItems();
       
        cartItems.length = 0; //sets the cartItems array to empty
        //cartItems.splice(0, cartItems.length) .... this also sets the array to empty
        
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
        
    }
}



//When DOM is loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
    
} 
else {
    ready();
    
}

function ready() {

    //Display cart items
    UI.displayCart();

    const addCartBtn = document.querySelectorAll('.add-cart-btn'); //all of the add cart buttons
    
    addCartBtn.forEach(function(btn) {  // loops through every add cart button
        btn.addEventListener('click', function(event) { // using event parameter to traverse the DOM
            var image = event.target.parentElement.parentElement.parentElement.children[0].src;
            var name = event.target.parentElement.parentElement.children[0].textContent;
            var itemPrice = parseFloat(event.target.parentElement.parentElement.children[1].textContent.slice(1)).toFixed(2);
            var quantity = 1; /* event.target.parentElement.parentElement.children[1].children[2].value; */
            var price = (itemPrice * quantity).toFixed(2);
            
            const item = new Item(image, name, price, quantity);
            
            UI.addToCart(item);
            Store.addItem(item);
            Store.saveQuantity(item);

            //Cart CSS effect
            var addItemImg = document.getElementById('cart-btn');
            addItemImg.classList.add('added-to-cart');

            setTimeout(removeAdded, 1500);
            
            function removeAdded() {
                addItemImg.classList.remove('added-to-cart');
            }
       }) // targets the specific button
    })


    var quantityInputs = document.getElementsByClassName('cart-item-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', UI.quantityChanged);
        input.addEventListener('change', Store.saveQuantity);
    }


    // Event: Delete Item from UI cart list
    document.getElementById('cart-item-list').addEventListener('click', function(e) {
        UI.deleteItem(e.target);
        Store.deleteItem(e.target, e.target.parentElement.children[1].textContent); //e.target.parentElement.children[1].textContent
    });

    // Event: Clear Cart items
    document.getElementById('clear-cart').addEventListener('click', function(e) {
        UI.clearCart(e.target);
        Store.clearCart(e.target);
    })

    // Event: Checkout
    document.getElementById('checkout-btn').addEventListener('click', function(e) {
        UI.checkout(e.target);
        Store.checkout(e.target);
    })

    
}





