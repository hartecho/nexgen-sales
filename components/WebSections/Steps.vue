<template>
  <div class="services-section">
    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Support.webp" alt="" />
      </div>
      <h3>24/7 Support</h3>
      <p>
        Get around-the-clock support from our dedicated team to help you with
        any challenges you face in door-to-door sales.
      </p>
    </div>

    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Sales.webp" alt="" />
      </div>
      <h3>Sales Strategies</h3>
      <p>
        Learn time-tested sales strategies and techniques designed to help you
        close more deals efficiently.
      </p>
    </div>

    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Privacy.webp" alt="" />
      </div>
      <h3>Data Privacy</h3>
      <p>
        Your personal and training data is always secure with our
        industry-leading privacy protocols.
      </p>
    </div>

    <div class="service-card">
      <div class="icon">
        <img src="/Graphics/Training.webp" alt="" />
      </div>
      <h3>Certified Training</h3>
      <p>
        Our training program is industry-certified to ensure you receive the
        highest level of education and support.
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
  /* transform: scale(1.01); */
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
</style>
  