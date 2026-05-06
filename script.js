const menuCategories = [
  {
    id: "drinks",
    icon: "images/category-drinks.png",
    title: "Drinks",
    priceBadge: 150,
    fallback: "",
    items: [
      { id: "lemonade", name: "Lemonade", image: "images/lemonade.png", price: 150 },
      { id: "coffee", name: "Coffee", image: "images/coffee.png", price: 150 },
      { id: "iced-tea", name: "Iced Tea", image: "images/iced-tea.png", price: 150 },
      { id: "milkshake", name: "Milkshake", image: "images/milkshake.png", price: 150 },
      { id: "soda", name: "Soda", image: "images/soda.png", price: 150 }
    ]
  },
  {
    id: "desserts",
    icon: "images/category-desserts.png",
    title: "Desserts",
    priceBadge: 250,
    fallback: "",
    items: [
      { id: "apple-pie", name: "Applesaurus Pie", image: "images/apple-pie.png", price: 250 },
      { id: "muffin", name: "Meteor Muffin", image: "images/muffin.png", price: 250 },
      { id: "dino-dough", name: "Dino Dough", image: "images/dino-dough.png", price: 250 },
      { id: "sundae", name: "Sundae", image: "images/sundae.png", price: 250 },
      { id: "waffle-cone", name: "Waffle Cone", image: "images/waffle-cone.png", price: 250 },
      { id: "cookie", name: "Veloci Treat Cookie", image: "images/cookie.png", price: 250 }
    ]
  },
  {
    id: "picks",
    icon: "images/category-picks.png",
    title: "Rex's Picks",
    priceBadge: 300,
    items: [
      { id: "rex-original", name: "Rex's Original", image: "images/burger-original.png", price: 300 },
      { id: "blt", name: "BLT", image: "images/blt.png", price: 300 },
      { id: "double-burger", name: "Rex's Double", image: "images/double-burger.png", price: 300 },
      { id: "jurassic-patty", name: "Jurassic Patty", image: "images/jurassic-patty.png", price: 300 },
      { id: "stego-stacker", name: "Stego Stacker", image: "images/stego-stacker.png", price: 300 },
      { id: "taco", name: "T-Rex Taco", image: "images/taco.png", price: 300 },
      { id: "wrap", name: "Raptor Wrap", image: "images/wrap.png", price: 300 },
      { id: "chicken", name: "Tricera Chick", image: "images/chicken.png", price: 300 },
      { id: "nuggets", name: "Dino Nuggies", image: "images/nuggets.png", price: 300 }
    ]
  },
  {
    id: "sides",
    icon: "images/category-sides.png",
    title: "Sides",
    priceBadge: 100,
    fallback: "",
    items: [
      { id: "fries", name: "Fries", image: "images/fries.png", price: 100 },
      { id: "onion-rings", name: "Onion Rings", image: "images/onion-rings.png", price: 100 }
    ]
  },
  {
    id: "favorites",
    icon: "images/category-favorites.png",
    title: "Customer Favorite",
    showItemPrices: true,
    fallback: "",
    items: [
      { id: "combo", name: "Dino Nuggies and Milkshake", image: "images/combo.png", price: 425 },
      { id: "nuggets", name: "Dino Nuggies", image: "images/nuggets.png", price: 300 },
      { id: "milkshake", name: "Milkshake", image: "images/milkshake.png", price: 150 }
    ]
  }
];

const itemLookup = new Map();
menuCategories.forEach((category) => {
  category.items = category.items.map((item) => ({
    ...item,
    fallback: item.fallback || category.fallback || ""
  }));

  category.items.forEach((item) => {
    if (!itemLookup.has(item.id)) {
      itemLookup.set(item.id, item);
    }
  });
});

const cart = new Map();

let discountPercent = 0;
let discountMode = "none";

document.addEventListener('DOMContentLoaded', () => {
  const menuGrid = document.getElementById("menuGrid");
  const cartItems = document.getElementById("cartItems");
  const orderCount = document.getElementById("orderCount");
  const subtotalAmount = document.getElementById("subtotalAmount");
  const discountLabel = document.getElementById("discountLabel");
  const discountAmount = document.getElementById("discountAmount");
  const totalAmount = document.getElementById("totalAmount");
  const savingsTitle = document.getElementById("savingsTitle");
  const autoDiscountBtn = document.getElementById("autoDiscountBtn");
  const customDiscountBtn = document.getElementById("customDiscountBtn");
  const copyTotalBtn = document.getElementById("copyTotalBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  renderMenu();
  renderCart();
  setupImageFallbacks(document);

  menuGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    if (button.dataset.action === "add") {
      addToCart(button.dataset.id);
    }
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const itemId = button.dataset.id;
    const action = button.dataset.action;

    if (action === "remove") removeFromCart(itemId);
    if (action === "increase") increaseQuantity(itemId);
    if (action === "decrease") decreaseQuantity(itemId);
  });

  autoDiscountBtn.addEventListener("click", setAutoDiscount);
  customDiscountBtn.addEventListener("click", setCustomDiscount);
  copyTotalBtn.addEventListener("click", copyTotal);
  clearCartBtn.addEventListener("click", clearCart);
});
