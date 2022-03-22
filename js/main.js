// Cart
let cartOpen = document.querySelector(".cart-open");
let cartOp = document.querySelector(".cart-op");
let cart = document.querySelector(".cart");
// Open cart
cartOpen.onclick = () => {
  cart.classList.toggle("active");
};
cartOp.onclick = () => {
  cart.classList.toggle("active");
};
// Close cart
let cartClose = document.querySelector(".cl-cart");
cartClose.onclick = () => {
  cart.classList.remove("active");
};
// ₦(".cart-open").toggleClass("active");
// Remove from cart JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  // remove item from cart
  var removeCartButton = document.getElementsByClassName("rm-cart");
  console.log(removeCartButton);
  for (let i = 0; i < removeCartButton.length; i++) {
    var button = removeCartButton[i];
    button.addEventListener("click", removeCartItem);
    updateTotalPrice();
  }

  // Quantity changes
  var quantityInputs = document.getElementsByClassName("cart-qty");
  for (let i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addClickedCartItem);
  }
}
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotalPrice();
}
// Quantitt Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotalPrice();
}

//Add to Cart
function addClickedCartItem(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("product-price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotalPrice();
}

//add product to cart
function addProductToCart(title, price, productImg) {
  var cartContent = document.createElement("div");
  cartContent.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("You have already added this item to cart");
      return;
    }
  }
  var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img" />
                      <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-qty" />
                     </div>
                          <!-- Remove Cart  -->
                     <i class="bx bxs-trash-alt rm-cart"></i>`;
  cartContent.innerHTML = cartBoxContent;
  cartItems.append(cartContent);
  cartContent
    .getElementsByClassName("rm-cart")[0]
    .addEventListener("click", removeCartItem);
  cartContent
    .getElementsByClassName("cart-qty")[0]
    .addEventListener("change", quantityChanged);
}

// Update total
function updateTotalPrice() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityOfProduct = cartBox.getElementsByClassName("cart-qty")[0];
    var price = parseFloat(priceElement.innerText.replace("₦", ""));
    var quantity = quantityOfProduct.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("total-price")[0].innerText = "₦" + total;
}
// }

$(".cart-qty").click(() => {
  updateTotalPrice();
});
