<template>
  <div class="wrapper">
    <!-- prettier-ignore -->
    <section class="item-wrapper point-bot">
        <div class="item-container">
          <div class="left-column">
            <div class="img-wrapper">
              <img :src="resolvedImgPath()" alt="Item Image" />
            </div>
            <div v-if="item">
              <div v-for="(image, index) in item.moreImages" :key="'image-' + index" class="img-wrapper">
                <img v-if="image" :src="image" :alt="'Additional Image ' + (index + 1)" />
              </div>
            </div>
          </div>
          <div class="right-column" v-if="item">
            <h1>{{ item.name }}</h1>
            <p class="header">
              <span class="new-price">${{ item.price.toFixed(2) }}</span>
              <span v-if="item.oldPrice" class="old-price">Was ${{ item.oldPrice.toFixed(2) }}</span>
              <span v-if="item.savingsAmount" class="savings">
                Save ${{ item.savingsAmount.toFixed(2) }} ({{ item.savingsPercentage }})
              </span>
            </p>
            <p class="preview">{{ item.preview }}</p>
            
            <p class="stock-status" :class="stockStatusClass">
              {{ stockMessage }}
            </p>
            
            <div class="item-quantity">
              <button @click="decreaseQuantity(item._id)">-</button>
              <p>{{ itemInCart ? itemInCart.quantity : 0 }}</p>
              <button @click="increaseQuantity(item._id)">+</button>
            </div>
            <button class="honey-button" @click="addToCart(item)">Add to Cart</button>
            <p class="description">{{ item.description }}</p>
            <div class="tags" v-if="item.tags && item.tags.length">
              <p>Tags:</p>
              <ul>
                <li v-for="tag in item.tags" :key="tag">{{ tagDescriptions[tag] }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    <!-- prettier-ignore -->
    <section class="FAQ">
        <WebSectionsFAQ />
      </section>
  </div>
</template>
  
  <script setup>
import { tagDescriptions } from "/utils/tagDescriptions.js";
const { data: item } = await useFetch(`/api/items?_id=${useRoute().params.id}`);
const store = useItemStore();

// SEO ADJUST
useSeoMeta({
  title: item.value ? item.value.name : "Item",
  description: item.value ? item.value.preview : "",
});

// Computed property for image path
function resolvedImgPath() {
  return item.value.image ? `/${item.value.image}` : "";
}

// Computed property for checking if item is in cart
const itemInCart = computed(() => {
  return store.cart.find((cartItem) => cartItem._id === item.value?._id);
});

// Computed properties for stock message and class
const stockMessage = computed(() => {
  if (item.value.stock > 5) {
    return "In Stock";
  } else if (item.value.stock > 0) {
    return `Only ${item.value.stock} Left In Stock`;
  } else {
    return "Out of Stock";
  }
});

const stockStatusClass = computed(() => {
  if (item.value.stock > 5) {
    return "in-stock";
  } else if (item.value.stock > 0) {
    return "low-stock";
  } else {
    return "out-of-stock";
  }
});

// Methods
const addToCart = () => {
  store.addToCart(item.value);
};

const removeFromCart = (itemId) => {
  store.removeItem(itemId);
};

const increaseQuantity = () => {
  if (itemInCart.value) {
    store.updateQuantity({
      itemId: item.value._id,
      quantity: itemInCart.value.quantity + 1,
    });
  } else {
    addToCart(item.value);
  }
};

const decreaseQuantity = () => {
  if (itemInCart.value && itemInCart.value.quantity > 1) {
    store.updateQuantity({
      itemId: item.value._id,
      quantity: itemInCart.value.quantity - 1,
    });
  } else if (itemInCart.value && itemInCart.value.quantity === 1) {
    removeFromCart(item.value._id);
  }
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>
  
  <style scoped>
.wrapper {
  width: 100%;
}

.item-wrapper {
  background: url("/Backgrounds/IntroBG.webp") no-repeat;
  background-size: cover;
  color: #f1b55c;
  font-family: Montserrat, cursive;
}

.item-container {
  display: flex;
  justify-content: space-between;
  min-height: 55rem;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12rem 2rem;
}

.left-column,
.right-column {
  width: 45%;
  justify-content: baseline;
  height: 100%;
}

.img-wrapper {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-column h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bolder;
}

.header {
  margin-bottom: 2rem;
}

.new-price {
  font-size: 1.5rem;
  font-weight: bolder;
}

.old-price {
  font-size: 1.2rem;
  text-decoration: line-through;
  color: #b3b3b3;
  margin-left: 10px;
}

.savings {
  font-size: 1.2rem;
  color: #c1ff72;
  font-weight: bold;
  margin-left: 10px;
}

.right-column .preview {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.right-column p.description {
  font-size: 1.5rem;
  margin-bottom: 1em;
  white-space: pre-line;
}

.item-quantity {
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
}

.item-quantity p {
  font-size: 20px;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  margin: 0;
}

.item-quantity button {
  font-size: 18px;
  width: 2rem;
  height: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: none;
}

.item-quantity button:hover {
  color: black;
  background: #f7c781;
  cursor: pointer;
  border: none;
}

.description {
  margin-top: 2rem;
}

.tags {
  margin-top: 2rem;
}

.tags p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.tags ul {
  list-style-type: none;
  padding-left: 0;
}

.tags li {
  display: inline;
  font-size: 1rem;
  background-color: #ff8000;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-right: 0.5rem;
}

.stock-status {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.in-stock {
  color: #28a745;
}

.low-stock {
  color: #ff5722;
}

.out-of-stock {
  color: #dc3545;
}

@media (max-width: 768px) {
  .item-container {
    flex-direction: column;
    padding: 5rem;
  }

  .left-column,
  .right-column {
    width: 100%;
    height: auto;
  }

  .right-column h1 {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .item-container {
    padding: 5rem 2rem;
  }

  .item-quantity p {
    font-size: 30px;
  }

  .item-quantity button {
    font-size: 24px;
    width: 3rem;
    height: 3rem;
  }
}
</style>
  