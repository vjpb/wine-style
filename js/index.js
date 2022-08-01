let divCard = document.getElementById("card-content");


//Fetch Jsaon
async function getProduct() {
  const response = await fetch("js/wines.json");
  return await response.json();
}

//Fill cards
getProduct().then((products) => {
  products.forEach((wine) => {
    divCard.innerHTML += `
        <div class="row col-12 col-sm-6 col-lg-4 ">          
            <div class="card col">               
                <div id="${wine.id}" class="card-body">
                  <h5  class="card-id itemId" Style="display:none">${wine.id}</h5>
                  <div class="item-img"> 
                    <img class="item-img-src" src="${wine.img}">
                  </div>
                  <h4 class="card-title">
                      <b>${wine.name} x <span class="item-size">${wine.size}</span></b>
                  </h4>
                  <p class="card-color">
                    Variedad:  
                    <span class="item-variety">
                        ${wine.variety}
                    </span>
                  </p>
                  <p class="card-color">
                      Color:  
                      <span class="item-color">
                          ${wine.color}
                      </span>
                  </p>
                  <p class="card-title"> 
                      <span class="item-price">
                          $ ${wine.price}
                      </span>
                  </p>
                  <p class="card-title">
                      País:  
                      <span class="item-country">
                          ${wine.country}
                      </span>
                  </p>
                </div>
                <div class="card-body d-grid gap-2">
                    <button class="button button-add button-add-cart">
                        <span>
                            <img src="assets/cart.svg" alt="cart-icon">
                        </span> Agregar
                    </button>
                </div>
            </div>
        </div>
        `;
  });

  const addButton = document.querySelectorAll(".button-add");
  addButton.forEach((e) =>
    e.addEventListener("click", (e) => {

      //remove button in mobile
      let showButton = document.getElementById("container-price");
      showButton.classList.remove("show-price");
      let showBuyButton = document.getElementById("buy-button");
      showBuyButton.classList.remove("buy-button");
      let showButtonDelete = document.getElementById("delete-cart");
      showButtonDelete.classList.remove("empty-button");

      Toastify({
        text: "Agregado a la canasta",
        className: "info",
        gravity: "top",
        position: "center",
        style: {
          background: "#b8a25a",
          color: "white",
        },
      }).showToast();
    })
  );
  const clickButton = document.querySelectorAll(".button");
  const containerCart = document.querySelector(".container-cart");
  let shoppingBasket = [];

  clickButton.forEach((el) => {
    el.addEventListener("click", addItemCart);
  });

  //create items fuctions
  function addItemCart(e) {
    const button = e.target;
    const item = button.closest(".card");
    const itemId = item.querySelector(".itemId").textContent;
    const itemTitle = item.querySelector(".card-title").textContent;
    const itemSize = item.querySelector(".item-size").textContent;
    const itemPrice = item.querySelector(".item-price").textContent;
    const itemImg = item.querySelector(".item-img-src").src;
    const newItem = {
      id: itemId,
      title: itemTitle,
      prices: itemPrice,
      size: itemSize,
      img: itemImg,
      quantity: 1,
    };
    additemCart(newItem);
  }

  //Add items in shoppingBasket
  function additemCart(newItem) {
    const inputItem = containerCart.querySelectorAll(".inputItem");
    for (let i = 0; i < shoppingBasket.length; i++) {
      if (shoppingBasket[i].id.trim() === newItem.id.trim()) {
        shoppingBasket[i].quantity++;
        const inputValue = inputItem[i];
        inputValue.value++;
        totalCart();
        cartTotalNav();
        return null;
      }
    }
    shoppingBasket.push(newItem);
    cartRender();
  }

  //render items into shoppingBasket function
  function cartRender() {
    containerCart.innerHTML = "";
    shoppingBasket.map((item) => {
      const containerDiv = document.createElement("div");
      containerDiv.classList.add("item-cart");
      const content = `
            <span class="container-id d-none" scope="row">${item.id}</span>
            <div class="container-item-cart">
                <div class="img-total-cart">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="text-total-cart">
                    <div class="text-cart">
                        <p>
                            ${item.title}
                        </p>
                        <p>
                            ${item.size}
                        </p>
                    </div>
                    <div  class="text-cart-price">
                        <div class="text-cart">
                            <p>
                            ${item.prices}
                            </p>
                        </div>
                        <div class="quantity-cart">
                            <input type="number" min="1" value=${item.quantity} class="inputItem">
                            <img class="delete" src="assets/delete-icon.svg" alt="icon-delete">
                        </div>
                    </div>
                </div>
            </div>
        `;
      containerDiv.innerHTML = content;
      containerCart.append(containerDiv);
      containerDiv
        .querySelector(".delete")
        .addEventListener("click", removeitemCart);
      containerDiv
        .querySelector(".inputItem")
        .addEventListener("change", sumItems);
    });
    totalCart();
    cartTotalNav();
  }

  //Purcharse notification
  const purchaseButton = document.querySelector(".buy-button");
  purchaseButton.addEventListener("click", () => {
    purchase();
  });

  purchase = () => {
    swal({
      title: "Deseas finalizar la compra?",
      text: "Al aceptar no podras modificar la canasta de compras!",
      icon: "warning",
      buttons: true,
    }).then((confirmaCompra) => {
      if (confirmaCompra) {
        swal({
          title: "Gracias por tu compra!",
          text: "Esperamos tu regreso",
          icon: "success",
        });
        emptyCart();
      } else {
        swal({
          text: " Sigue agregando productos a la canasta!",
        });
      }
    });
  };

  //empty basket
  const emptyButton = document.querySelector("#delete-cart");
  emptyButton.addEventListener("click", emptyCart);

  function emptyCart() {
    shoppingBasket = [];
    cartRender();
  }

  //funcion to sum
  function totalCart() {
    let total = 0;
    const itemCartTotal = document.querySelector(".item-cart-total");
    shoppingBasket.forEach((item) => {
      const prices = Number(item.prices.replace("$", ""));
      total = total + prices * item.quantity;
    });
    itemCartTotal.innerHTML = `Total $${total}`;
    addLocalStorage();
  }

  //funcion to sum and show in nav
  function cartTotalNav() {
    let totalNavCart = 0;
    const itemNavCartTotal = document.querySelector(".itemNavCartTotal"),
      priceCounterItems = document.querySelector(".counter-items");
    shoppingBasket.forEach((item) => {
      const prices = Number(item.prices.replace("$", ""));
      totalNavCart = totalNavCart + prices * item.quantity;
    });
    itemNavCartTotal.innerHTML = ` $${totalNavCart}`;
    priceCounterItems.innerHTML = `$${totalNavCart}`;

    if (totalNavCart == 0) {
      let showTotal = document.getElementById("container-price");
      showTotal.classList.add("show-price");
      let showBuyButton = document.getElementById("buy-button");
      showBuyButton.classList.add("buy-button");
      let showButtonDelete = document.getElementById("delete-cart");
      showButtonDelete.classList.add("empty-button");
    }
    addLocalStorage();
  }

  //delete items function
  function removeitemCart(e) {
    const buttonDelete = e.target,
      itemCart = buttonDelete.closest(".item-cart"),
      id = itemCart.querySelector(".container-id").textContent;
    for (let i = 0; i < shoppingBasket.length; i++) {
      shoppingBasket[i].id.trim() === id.trim() && shoppingBasket.splice(i, 1);
    }
    itemCart.remove();
    totalCart();
    cartTotalNav();
    Toastify({
      text: "Producto Removido",
      className: "info",
      gravity: "bottom",
      position: "right",
      style: {
        background: "red",
        color: "white",
      },
    }).showToast();
  }

  //sum from input
  function sumItems(e) {
    const sumaInput = e.target,
      itemCart = sumaInput.closest(".item-cart"),
      id = itemCart.querySelector(".container-id").textContent;
    shoppingBasket.forEach((item) => {
      if (item.id.trim() === id.trim()) {
        sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
        item.quantity = sumaInput.value;
        totalCart();
        cartTotalNav();
      }
    });
  }

  // localstorage for cart
  function addLocalStorage() {
    localStorage.setItem("Canasta", JSON.stringify(shoppingBasket));
  }

  // save in localstorage and render the items
  window.onload = function () {
    const storage = JSON.parse(localStorage.getItem("Canasta"));
    if (storage) {
      shoppingBasket = storage;
      cartRender();
    }
  };
});
