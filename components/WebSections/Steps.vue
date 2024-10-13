<template>
  <div class="services-section">
    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Support.webp" alt="" />
      </div>
      <h3>24/7 Onboarding Support</h3>
      <p>
        Join our sales team and get round-the-clock support as you start your
        exciting journey in door-to-door sales. We're here to ensure your
        success.
      </p>
    </div>

    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Sales.webp" alt="" />
      </div>
      <h3>Proven Sales Techniques</h3>
      <p>
        Learn the strategies that have helped hundreds of reps close more deals
        and maximize their earnings in door-to-door sales.
      </p>
    </div>

    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Privacy.webp" alt="" />
      </div>
      <h3>Secure Opportunities</h3>
      <p>
        Enjoy the financial security that comes with a stable and rewarding
        career in door-to-door sales. With uncapped earning potential and job
        stability, your future is in your hands.
      </p>
    </div>

    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Training.webp" alt="" />
      </div>
      <h3>Career Growth</h3>
      <p>
        Join a team where training and advancement are key. We provide certified
        training to help you grow and achieve your career aspirations.
      </p>
    </div>
  </div>
</template>


<script>
export default {
  name: "SalesTrainingServices",
};
</script>

<style scoped>
.services-section {
  display: flex;
  gap: 1rem;
  padding: 0rem 2rem 6rem 2rem;
  background-color: black;
  color: white;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap; /* Allows wrapping of cards for smaller screens */
}

.service-card {
  background-color: #333;
  padding: 2rem;
  width: 16rem;
  text-align: left;
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease-in-out;
}

.service-card:hover {
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.4);
}

.icon {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

img {
  height: 3rem;
  width: 3rem;
  margin-bottom: 4rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .services-section {
    gap: 1.5rem;
    padding: 0 1rem 4rem 1rem;
  }

  .service-card {
    width: 14rem;
    padding: 1.5rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  p {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .services-section {
    flex-direction: column;
    align-items: center;
  }

  .service-card {
    width: 90%;
    max-width: 20rem;
    padding: 1.5rem;
    text-align: center;
  }

  .icon {
    justify-content: center;
  }

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 0 1rem 3rem 1rem;
  }

  .service-card {
    padding: 1rem;
  }

  img {
    height: 2.5rem;
    width: 2.5rem;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  p {
    font-size: 0.85rem;
  }
}
</style>
