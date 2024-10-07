<template>
  <div class="trusted-section-wrapper">
    <div class="text-content">
      <h2>
        Trusted By 2,880+ World-Class Brands And Organizations Of All Sizes.
      </h2>
      <p>
        We are proud to collaborate with world-renowned companies to deliver
        exceptional training and sales results. Our program is trusted by the
        best in the industry.
      </p>
    </div>
    <div class="logo-grid">
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Piccaso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Piccaso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Piccaso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Piccaso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Piccaso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Piccaso Logo" />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
</script>
  
  <style scoped>
.trusted-section-wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  padding: 4rem 2rem;
  background-color: #000;
  color: white;
  justify-content: center;
}

.text-content {
  max-width: 40%;
}

.text-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.text-content p {
  font-size: 1rem;
  line-height: 1.6;
  color: #aaa;
}

.logo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 50%;
  align-items: center;
}

.logo img {
  max-width: 150px;
  height: auto;
  opacity: 0.8;
}

.logo img:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
  