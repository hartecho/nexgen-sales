<template>
  <footer class="footer-section">
    <div class="footer-container">
      <!-- Logo and Description -->
      <div class="footer-logo-desc">
        <img src="/Logos/Nexgen.webp" alt="Nexgen Logo" class="footer-logo" />
        <!-- <p class="footer-description">
          At Nexgen, we specialize in transforming sales professionals into top
          performers with our industry-leading door-to-door sales training. Our
          programs focus on mastering sales techniques, overcoming objections,
          and building confidence to close more deals. With Nexgen, you’ll have
          the tools and support you need to excel in face-to-face sales and
          elevate your career.
        </p> -->
        <div class="social-icons">
          <!-- <a href="https://www.x.com" target="_blank">
            <img src="/Logos/X.svg" alt="Twitter" class="social-icon" />
          </a>
          <a href="https://www.tiktok.com" target="_blank">
            <img src="/Logos/TikTok.webp" alt="TikTok" class="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img
              src="/Logos/Instagram.webp"
              alt="Instagram"
              class="social-icon"
            />
          </a>
          <a href="https://www.linkedin.com" target="_blank">
            <img
              src="/Logos/LinkedIn.webp"
              alt="LinkedIn"
              class="social-icon"
            />
          </a> -->
        </div>
      </div>

      <!-- Links -->
      <div class="footer-links">
        <div class="footer-column">
          <h3>PAGE LINKS</h3>
          <ul>
            <li><NuxtLink to="/">&#x3e; Home</NuxtLink></li>
            <li><NuxtLink to="/Blog">&#x3e; Blog</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>INFORMATION</h3>
          <ul>
            <li><NuxtLink to="/Terms">&#x3e; Terms & Conditions</NuxtLink></li>
            <li><NuxtLink to="/Privacy">&#x3e; Privacy Policy</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>CONTACT INFO</h3>
          <ul>
            <li>
              <NuxtLink to="tel:000012345678">
                <i class="fas fa-phone"></i> +1 (949) 547-3815
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="mailto:yoursh@maxi.com">
                <i class="fas fa-envelope"></i> Support@Nexgensalepro.com
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="#">
                <i class="fas fa-map-marker-alt"></i>5830 E 2ND ST PMB 7000
                Casper WY 82609
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <p>
        Copyright 2022 © All Rights Reserved Design by HARTECHO Digital
        Marketing
      </p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-section {
  background-color: #222;
  color: #b2b2b2;
  padding: 4rem 0 0 0;
  width: 100%;
  font-family: Arial, sans-serif;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 4rem 2rem;
  max-width: 1300px;
  margin: 0 auto;
}

.footer-logo-desc {
  max-width: 400px;
  flex: 1;
  align-self: flex-start;
  margin-bottom: 2rem;
}

.footer-logo {
  width: 100%;
  max-width: 200px;
  margin-bottom: 1rem;
}

.footer-description {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.social-icons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-right: 12rem;
}

.social-icons img {
  height: 2rem;
  width: 2rem;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 2;
  gap: 5rem;
}

.footer-column h3 {
  font-size: 1.2rem;
  color: #0197b2;
  margin-bottom: 15px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column li {
  margin-bottom: 10px;
}

.footer-column a,
.footer-column NuxtLink {
  color: #b2b2b2;
  text-decoration: none;
  font-size: 1rem;
}

.footer-column a:hover,
.footer-column NuxtLink:hover {
  color: #0197b2;
}

.footer-bottom {
  text-align: center;
  padding: 1.5rem 0;
  border-top: 1px solid #444;
  margin-top: 20px;
  font-size: 0.85rem;
  background: #111;
  color: white;
}

.footer-bottom p {
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .footer-container {
    padding: 0rem 1.5rem;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .footer-logo {
    width: 100%;
    height: auto;
  }

  .footer-logo-desc {
    text-align: center;
  }

  .footer-links {
    gap: 2rem;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 0;
  }

  .footer-container {
    flex-direction: column;
    align-items: center; /* Centers the .footer-logo-desc */
    text-align: left; /* Ensures that text in footer-columns remains left-aligned */
    gap: 2rem;
  }

  .footer-logo-desc {
    max-width: 400px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the content horizontally */
    text-align: center; /* Center the text inside this section */
    margin-bottom: 2rem;
    margin-left: auto; /* Center within the parent container */
    margin-right: auto; /* Center within the parent container */
  }

  .footer-logo {
    max-width: 200px;
    margin-bottom: 1rem;
  }

  .footer-links {
    width: 100%;
    justify-content: center;
    gap: 3rem;
  }

  .footer-column {
    flex: 1;
    text-align: left; /* Ensures that links remain left-aligned */
  }

  .social-icons {
    margin-right: 0rem;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 2rem 1rem;
  }

  .footer-description {
    font-size: 0.9rem;
  }

  .footer-column h3 {
    font-size: 1rem;
  }

  .footer-column a,
  .footer-column NuxtLink {
    font-size: 0.9rem;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>
