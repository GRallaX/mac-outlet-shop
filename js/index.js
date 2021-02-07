const cElem = (tagName, className, text) => {
  const elem = document.createElement(tagName);
  elem.className = className || "";
  elem.innerHTML = text || "";
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
  const title = cElem("h6", "card_title", `Apple ${device.name}`);
  const stock = cElem(
    "p",
    "card_stock",
    device.orderInfo.inStock
      ? `${device.orderInfo.inStock} left in stock`
      : "currently not in stock"
  );
  const price = cElem("p", "card_price", `Price: ${device.price} $`);
  const btnAddToCart = cElem("button", "add_to_cart_btn", "Add to cart");
  btnAddToCart.onclick = () => {
    console.log(device);
  };
  const stats = cElem("div", "card_stats");
  const reviews = cElem(
    "p",
    "card_stats_reviews",
    `${device.orderInfo.reviews}% positive reviews` +
      `<br />` +
      (device.orderInfo.reviews > 60 ? "above average" : "below average")
  );
  const orders = cElem("p");
  stats.append(reviews);
  container.append(img, title, stock, price, btnAddToCart, stats);
  return container;
};

const renderCards = (list) => {
  const elems = list.map((item) => renderCard(item));
  listContainer.clear().add(elems);
};

renderCards(items);

class Filter {
  constructor() {
    this.renderFilter = [...items];
    this.config = {
      searchValue: "",
      sortValue: "",
      defaultSort: "",
    };
  }

  filterByName(filterValue = this.config.searchValue) {
    filterValue = filterValue.toLowerCase();
    this.config.searchValue = filterValue;
    this.renderFilter = items.filter(({ name }) => {
      name = name.toLowerCase();
      return name.includes(filterValue);
    });
    this.config.defaultSort = [...this.renderFilter];
    this.sortByValue();
  }

  sortByValue(sortValue = this.config.sortValue) {
    this.config.sortValue = sortValue;
    if (sortValue === "default") {
      this.renderFilter = [...this.config.defaultSort];
    }
    this.config.defaultSort = [...this.renderFilter];
    if (sortValue === "ascending") {
      this.renderFilter.sort((prev, next) => {
        return prev.price - next.price;
      });
    }
    if (sortValue === "descending") {
      this.renderFilter.sort((prev, next) => {
        return next.price - prev.price;
      });
    }
    if (sortValue === "rating") {
      this.renderFilter.sort((prev, next) => {
        return next.orderInfo.reviews - prev.orderInfo.reviews;
      });
    }
    renderCards(this.renderFilter);
  }
}

const filter = new Filter();

gElem('input[id="searchByName"]').addEventListener("input", (e) =>
  filter.filterByName(e.target.value)
);
gElem('select[id="sort_devices"]').addEventListener("change", (e) =>
  filter.sortByValue(e.target.value)
);
