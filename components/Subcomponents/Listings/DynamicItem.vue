<template>
  <div class="carousel-item">
    <!-- Image wrapper with hover effect and click event -->
    <div class="img-wrapper" @click="goToItem(item._id)">
      <img
        :src="'/ItemPics/' + item.image"
        alt="Product Image"
        class="product-image"
      />
      <img
        :src="resolvedCheckImg()"
        class="checkmark"
        v-if="isAddedToCart"
        alt="Check mark"
      />
    </div>

    <div class="info-section">
      <!-- Price and savings row -->
      <div class="price-row">
        <p class="new-price">${{ item.price.toFixed(2) }}</p>
        <div v-if="item.oldPrice" class="old-price-container">
          <p class="old-price">${{ item.oldPrice.toFixed(2) }}</p>
          <p class="savings">
            Save ${{ item.savingsAmount.toFixed(2) }} ({{
              item.savingsPercentage
            }})
          </p>
        </div>
      </div>

      <!-- Rating Row -->
      <div class="ratings-row">
        <div class="stars-container">
          <img
            v-for="(star, index) in starImages"
            :key="index"
            :src="star"
            alt="Star"
            class="star-icon"
          />
        </div>
        <span class="rating-number">({{ item.reviewCount.toFixed(0) }})</span>
      </div>

      <!-- Item information -->
      <div class="item-info">
        <p class="item-title">
          <strong>{{ item.name }}</strong>
        </p>
        <p>{{ item.preview }}</p>
      </div>

      <!-- Add to Cart Button or Variants Selector -->
      <div v-if="item.variants && item.variants.length > 0">
        <button
          @click="showVariantModal = true"
          class="add-to-cart-button honey-button"
        >
          See Options
        </button>
      </div>
      <div v-else>
        <button
          @click="addToCart(item)"
          class="add-to-cart-button honey-button"
        >
          Add To Cart
        </button>
      </div>
    </div>

    <!-- Import the VariantModal and render it conditionally -->
    <teleport to="body">
      <SubcomponentsListingsVariantModal
        v-if="showVariantModal"
        :item="item"
        @closeModal="closeVariantModal"
        class="modal-overlay"
      />
    </teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});

const isAddedToCart = ref(false);
const showVariantModal = ref(false);

const store = useItemStore();
const router = useRouter();

function resolvedCheckImg() {
  return "/CheckMark.svg";
}

function addToCart(item) {
  store.addToCart(item);
  isAddedToCart.value = true;
}

const goToItem = (itemId) => {
  router.push(`/item/${itemId}`);
};

function closeVariantModal() {
  showVariantModal.value = false;
}

// Helper function to get the star images
const getStarImages = (rating) => {
  const fullStar = "/Graphics/FullStar.svg";
  const halfStar = "/Graphics/HalfStar.svg";
  const emptyStar = "/Graphics/EmptyStar.svg";
  const starImages = [];

  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 0; i < 5; i++) {
    if (roundedRating - i >= 1) {
      starImages.push(fullStar);
    } else if (roundedRating - i === 0.5) {
      starImages.push(halfStar);
    } else {
      starImages.push(emptyStar);
    }
  }
  return starImages;
};

const starImages = computed(() => getStarImages(props.item.ratings || 0));
</script>

<style scoped>
.carousel-item {
  transition: border 0.3s;
  /* width: 25%; */
  padding-bottom: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  color: black;
  max-width: 350px;
  height: 100%;
}

.img-wrapper {
  /* overflow: hidden; */
  position: relative;
  cursor: pointer;
  background: white;
}

.product-image {
  width: 100%;
  max-height: 20rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  transition: transform 0.3s ease;
  transform: scale(0.85);
}

.product-image:hover {
  transform: scale(0.9);
}

@keyframes pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.checkmark {
  position: absolute;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  justify-self: center;
  padding: 5rem;
  animation: pop 0.3s ease;
  width: auto;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-info {
  text-align: left;
}

.item-title {
  font-size: 1.2rem;
}

.price-row {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

.new-price {
  font-size: 2rem;
  line-height: 2rem;
  color: black;
  font-weight: bold;
}

.old-price-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.old-price {
  text-decoration: line-through;
  color: #0a0a0a;
  font-size: 1.2rem;
  line-height: 1rem;
  margin: 0;
}

.savings {
  color: #00bf63;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}

.ratings-row {
  display: flex;
  align-items: center;
}

.stars-container {
  display: flex;
  height: 20px;
  width: 100px;
}

.star-icon {
  width: 100%;
  margin: 0 !important;
}

.rating-number {
  font-size: 1rem;
  margin-left: 8px;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .carousel-item {
    /* width: 33.33%; */
  }

  .new-price {
    font-size: 2rem;
  }
}

@media (max-width: 992px) {
  .carousel-item {
    /* width: 50%; */
  }

  .new-price {
    font-size: 1.5rem;
  }

  .old-price {
    font-size: 1rem;
  }

  .savings {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .carousel-item {
    /* width: 50%; */
  }

  .new-price {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .carousel-item {
    width: 100%;
    justify-self: center;
  }

  .new-price {
    font-size: 1.2rem;
  }

  .price-row {
    justify-content: space-between;
  }

  .old-price,
  .savings {
    font-size: 1rem;
  }
}
</style>
