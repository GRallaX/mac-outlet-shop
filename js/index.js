const cElem = (tagName, className, text) => {
  const elem = document.createElement(tagName);
  elem.className = className || "";
  elem.innerText = text || "";
  return elem;
};

const gElem = (param) => {
  const elem = document.querySelector(param);
  elem.clear = function () {
    this.innerHTML = "";
    return this;
  };
  elem.add = function (listOfElems) {
    this.append(...listOfElems);
    return this;
  };
  return elem;
};

const listContainer = gElem("#devices_list");

const renderCard = (device) => {
  const container = cElem("li", "card");
  const img = cElem("img", "card_img");
  img.src = `img/${device.imgUrl}`;
  const title = cElem("h6", "card_title", device.name);
  const price = cElem("p", "card_price", device.price);
  const btnAddToCart = cElem("button", "add_to_cart_btn","Add to cart");
  btnAddToCart.onclick =() =>{
    console.log(device)
  }
  container.append(img, title, price, btnAddToCart);
  return container;
};

const renderCards = (list) => {
  const elems = list.map((item) => renderCard(item));
  listContainer.clear().add(elems);
};

renderCards(items);
