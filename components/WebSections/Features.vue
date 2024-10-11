<template>
  <div class="services-offered">
    <div class="header">
      <h4>SERVICES</h4>
      <h1>What We Offer</h1>
      <p>
        We provide comprehensive services to enhance and support your
        door-to-door sales performance, covering everything from training to
        ongoing support.
      </p>
    </div>

    <div class="services-grid">
      <!-- Left Column -->
      <div class="services-column left">
        <div class="service-item">
          <img src="/Graphics/Support.webp" alt="Sales Strategy" />
          <div class="text-content">
            <h3>Sales Strategy</h3>
            <p>
              We build custom strategies that ensure you overcome objections and
              close deals.
            </p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/Support.webp" alt="Database Management" />
          <div class="text-content">
            <h3>Database Management</h3>
            <p>
              Efficient tools to help manage your client information and leads
              for the best results.
            </p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/Support.webp" alt="Technical Infrastructure" />
          <div class="text-content">
            <h3>Technical Infrastructure</h3>
            <p>
              Robust tools and systems to support seamless sales operations.
            </p>
          </div>
        </div>
      </div>

      <!-- Center Column (with large icon and text) -->
      <div class="center-column">
        <img
          src="/Graphics/Features.webp"
          alt="Web Security"
          class="large-image"
        />
        <h2>Reactive Services</h2>
      </div>

      <!-- Right Column -->
      <div class="services-column right">
        <div class="service-item">
          <img src="/Graphics/Support.webp" alt="Web Security" />
          <div class="text-content">
            <h3>Web Security</h3>
            <p>
              Keep your sales platform secure and free from vulnerabilities.
            </p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/Support.webp" alt="Cloud Support" />
          <div class="text-content">
            <h3>Cloud Support</h3>
            <p>Access tools and training material from anywhere at any time.</p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/Support.webp" alt="Monitoring Services" />
          <div class="text-content">
            <h3>Monitoring Services</h3>
            <p>
              We provide real-time monitoring to help track your sales
              performance and leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.services-offered {
  padding: 6rem 2rem 8rem 2rem;
  background-color: #222;
  color: white;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header h4 {
  color: #0197b2;
  font-size: 18px;
  letter-spacing: 2px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0.5rem 0 1rem;
}

.header p {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1rem;
  color: #aaa;
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding-top: 3rem;
  max-width: 1400px;
}

.services-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.service-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.left .service-item {
  flex-direction: row-reverse; /* Reverse the order to place the icon before the text on desktop */
  text-align: right;
}

.right .service-item {
  text-align: left;
}

.text-content {
  max-width: 70%;
}

.service-item h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.service-item p {
  font-size: 1rem;
  line-height: 1.6;
}

.service-item img {
  height: 3rem;
  width: 3rem;
}

.center-column {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.large-image {
  height: 15rem;
  width: 15rem;
}

.center-column h2 {
  margin-top: 1rem;
  font-size: 2rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .left .service-item {
    flex-direction: column; /* Stack the icon above the text on smaller screens */
    text-align: center;
  }

  .right .service-item {
    flex-direction: column; /* Ensure consistency in stacking for smaller screens */
    text-align: center;
  }

  .large-image {
    height: 12rem;
    width: 12rem;
  }

  .center-column h2 {
    font-size: 1.8rem;
  }

  .service-item img {
    height: 2.5rem;
    width: 2.5rem;
  }

  .header h1 {
    font-size: 2.2rem;
  }

  .header p {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .services-grid {
    gap: 1.5rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .header p {
    font-size: 0.9rem;
  }

  .large-image {
    height: 10rem;
    width: 10rem;
  }

  .service-item h3 {
    font-size: 1.3rem;
  }

  .service-item p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .services-offered {
    padding: 4rem 1rem;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .header p {
    font-size: 0.85rem;
  }

  .large-image {
    height: 8rem;
    width: 8rem;
  }

  .service-item img {
    height: 2rem;
    width: 2rem;
  }

  .service-item h3 {
    font-size: 1.2rem;
  }

  .service-item p {
    font-size: 0.85rem;
  }

  .center-column h2 {
    font-size: 1.5rem;
  }
}
</style>
