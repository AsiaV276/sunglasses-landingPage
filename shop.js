
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

window.onclick = function(e) {
    if(e.target == cart) {
        cartOverlay.style.visibility = 'hidden';
    }
}



/* ------------------------------------------------------------------ */
// Item Class
class Item {
    constructor(image, name, price, quantity, id) {
        this.image = image;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.id = id;
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
       const row = document.createElement('div');
       row.classList.add('cart-item');
       row.innerHTML = `
            <img src="${item.image}">
            <h5>${item.name}</h5>
            <h5>${item.quantity}</h5>
            <h5 id="d-sign">$<span class="cart-item-price">${item.price}</span></h5>
            <span class="delete-item">delete</span>
       `
       
       list.prepend(row);
    
   }

   static getTotalPrice(item) {
        const cartItems = Store.getItems();
        const total = [];
        
        var itemPrice = parseFloat(item.price);

        total.push(itemPrice);
        
        cartItems.forEach(function(item) {
            var numPrice = item.price; //removes the $
            total.push(parseFloat(numPrice));
        });

        const totalPrice = total.reduce(function(total, item) {
            total += item;
            return total;
        },0);

        //console.log(totalPrice);
        

        //document.getElementById('total-cost').textContent = totalPrice;
        document.getElementById('num-cart-items').textContent = total.length; 
        return totalPrice;
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
           let numPrice = parseFloat(del.previousElementSibling.textContent.slice(1)).toFixed(2); //selects the price of the deleted item, converted to float, removes $
        
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
        
        console.log(el.parentElement.previousElementSibling.children[0].innerHTML);
        document.getElementById('total-cost').innerHTML = 0.00; // resets total cost to 0
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
    
            document.getElementById('total-cost').textContent = x.toFixed(2);
        }
        return cartItems;
    }

    static addItem(cartItem) {
        const cartItems = Store.getItems();
        let i, x = 0;
        for (i in cartItems) {
            x += parseFloat(cartItems[i].price);
        }
        
        cartItems.push(cartItem);
        //document.getElementById('total-cost').textContent = x.toFixed(2);
        

        document.getElementById('num-cart-items').textContent = cartItems.length; 
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); //reset it to local storage, stringify to add to local storage
         
    }

    static deleteItem(del, name) {
        
        if(del.classList.contains('delete-item')) {
            const cartItems = Store.getItems();

            cartItems.forEach(function(cartItem, index) {
                //console.log(index);
                //console.log(cartItem.name);
                if(cartItem.name === name) {
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
}


// Event: Display cart items
document.addEventListener('DOMContentLoaded', UI.displayCart);

// Event: Add an item to the UI cart list
(function() {
    const addCartBtn = document.querySelectorAll('.add-cart-btn'); //all of the add cart buttons
    
    addCartBtn.forEach(function(btn) {  // loops through every add cart button
        btn.addEventListener('click', function(event) { // using event parameter to traverse the DOM
            var image = event.target.parentElement.parentElement.children[0].src;
            var name = event.target.parentElement.parentElement.children[1].children[0].textContent;
            var itemPrice = parseFloat(event.target.parentElement.parentElement.children[1].children[1].textContent.slice(1)).toFixed(2);
            var quantity = event.target.parentElement.parentElement.children[1].children[2].value;
            var price = (itemPrice * quantity).toFixed(2);
            
            const item = new Item(image, name, price, quantity);
            
            UI.addToCart(item);

            var totalPrice = UI.getTotalPrice(item);
            console.log(totalPrice);
            document.getElementById('total-cost').textContent = totalPrice.toString();
            console.log(document.getElementById('total-cost').textContent);
            

            Store.addItem(item);
        

            //Cart CSS effect
            var addItemImg = document.getElementById('cart-btn');
            addItemImg.classList.add('added-to-cart');

            setTimeout(removeAdded, 1500);
            
            function removeAdded() {
                addItemImg.classList.remove('added-to-cart');
            }
            //event.target.parentElement.parentElement.children[0].children[0];

            //document.getElementById('logo').style.b = '1px solid black';
        }) // targets the specific button
    })
})();

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



// Event: Increase quantity
/*document.getElementById('cart-item-list').addEventListener('click', function(e) {
   
});*/

/*(function() {
    const up = document.querySelectorAll('.up'); //all of the increase quantity buttons

    up.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            var quantity = parseInt(event.target.nextElementSibling.textContent);
            
            console.log("plus one");
            

        })
    })
})();*/


/* ------------------------------------------------------------------ */







//var up = document.querySelectorAll('.up');
//var down = document.querySelectorAll('.down');



// keep counter from going under 1

// Adjust the Quantity and total cost
 /*   const up = document.querySelectorAll('.up');
    const down = document.querySelectorAll('.down');

    getTotalCost();

up.onclick = function() {
    var x = document.querySelectorAll('.item-quantity').innerHTML;
    x++;
    document.querySelectorAll('.item-quantity').innerHTML = x;

    getTotalCost();
}

down.onclick = function() {
    var x = document.querySelector('.item-quantity').innerHTML;
    x--;
    document.querySelector('.item-quantity').innerHTML = x;

    getTotalCost();
}

function getTotalCost() {
    let cost = parseFloat(document.querySelector('.item-price').innerHTML);
    let itemQuantity = parseFloat(document.querySelector('.item-quantity').innerHTML);
    document.getElementById('total-cost').innerHTML = itemQuantity * cost;

}*/



