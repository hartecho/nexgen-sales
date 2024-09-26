<template>
  <div class="testimonial">
    <div class="testimonial-header">
      <img
        src="/FullStar.svg"
        alt="Full Star"
        class="star-icon"
        v-for="i in 5"
        :key="i"
      />
    </div>
    <p class="testimonial-text">{{ text }}</p>
    <div class="testimonial-footer">
      <img :src="imageSrc" alt="Profile Picture" class="profile-image" />
      <div class="testimonial-info">
        <h4>{{ name }}</h4>
        <p>{{ designation }}</p>
      </div>
      <img src="/Quote.svg" alt="Quote Icon" class="quote-icon" />
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
});
</script>
  
  <style scoped>
.testimonial {
  background-color: rgba(74, 74, 74, 0.8);
  padding: 2rem;
  color: white;
  text-align: left;
  display: flex;
  flex-direction: column;
  min-height: 18rem;
  justify-content: space-between;
}

.testimonial-header {
  margin-bottom: 1rem;
}

.star-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.testimonial-text {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.testimonial-footer {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.testimonial-info h4 {
  font-size: 1.2rem;
  margin: 0;
}

.testimonial-info p {
  font-size: 0.9rem;
  color: #aaa;
}

.quote-icon {
  margin-left: auto;
  width: 40px;
  height: 40px;
}
</style>
  