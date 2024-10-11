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
        <img src="/Logos/ExampleLogo.png" alt="Picasso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Picasso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Picasso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Picasso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Picasso Logo" />
      </div>
      <div class="logo">
        <img src="/Logos/ExampleLogo.png" alt="Picasso Logo" />
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
  flex-wrap: wrap; /* Allows wrapping when space is limited */
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

/* Responsive adjustments */
@media (max-width: 1024px) {
  .trusted-section-wrapper {
    flex-direction: column;
    padding: 3rem 1rem;
  }

  .text-content {
    max-width: 80%;
    text-align: center;
  }

  .logo-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
  }

  .text-content h2 {
    font-size: 1.8rem;
  }

  .text-content p {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .trusted-section-wrapper {
    padding: 2rem 1rem;
  }

  .logo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .text-content h2 {
    font-size: 1.6rem;
  }

  .text-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .text-content {
    max-width: 100%;
    text-align: center;
  }

  .text-content h2 {
    font-size: 1.4rem;
  }

  .text-content p {
    font-size: 0.85rem;
  }

  .logo-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .logo img {
    max-width: 100px;
  }
}
</style>
