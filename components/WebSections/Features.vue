<template>
  <div class="services-offered">
    <div class="header">
      <h4>JOIN OUR TEAM</h4>
      <h1>Why Work With Us</h1>
      <p>
        Build a rewarding career in door-to-door sales with unlimited growth,
        support, and the freedom to succeed.
      </p>
    </div>

    <div class="services-grid">
      <!-- Left Column -->
      <div class="services-column left">
        <div class="service-item">
          <img src="/Graphics/SalesStrategy.webp" alt="Sales Skills" />
          <div class="text-content">
            <h3>Master Sales</h3>
            <p>
              Learn the skills you need to approach customers and close deals.
            </p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/Database.webp" alt="Lead Generation" />
          <div class="text-content">
            <h3>Consistent Leads</h3>
            <p>We provide steady leads so you can focus on selling.</p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/Tech.webp" alt="Personal Growth" />
          <div class="text-content">
            <h3>Grow Personally</h3>
            <p>Build confidence and improve communication skills.</p>
          </div>
        </div>
      </div>

      <!-- Center Column (with large icon and text) -->
      <div class="center-column">
        <img src="/Graphics/Features.webp" alt="Success" class="large-image" />
        <h2>Your Path to Success</h2>
      </div>

      <!-- Right Column -->
      <div class="services-column right">
        <div class="service-item">
          <img src="/Graphics/WebSecurity.webp" alt="Financial Freedom" />
          <div class="text-content">
            <h3>Earn More</h3>
            <p>Uncapped earning potential—you control your income.</p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/CloudSupport.webp" alt="Work-Life Balance" />
          <div class="text-content">
            <h3>Work-Life Balance</h3>
            <p>Create your own schedule with flexible hours.</p>
          </div>
        </div>
        <div class="service-item">
          <img src="/Graphics/Monitoring.webp" alt="Team Support" />
          <div class="text-content">
            <h3>Team Support</h3>
            <p>Get guidance and support from our experienced team.</p>
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
