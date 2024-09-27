<template>
  <footer class="footer-section">
    <div class="footer-container">
      <!-- Logo and Description -->
      <div class="footer-logo-desc">
        <img src="/Nexgen.webp" alt="Nexgen Logo" class="footer-logo" />
        <p class="footer-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </p>
        <div class="social-icons">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
        </div>
      </div>

      <!-- Links -->
      <div class="footer-links">
        <div class="footer-column">
          <h3>PAGE LINKS</h3>
          <ul>
            <li><a href="#">&#x3e; Home</a></li>
            <li><a href="#">&#x3e; About</a></li>
            <li><a href="#">&#x3e; Services</a></li>
            <li><a href="#">&#x3e; Blog Post</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>INFORMATION</h3>
          <ul>
            <li><a href="#">&#x3e; FAQ</a></li>
            <li><a href="#">&#x3e; Client Support</a></li>
            <li><a href="#">&#x3e; Terms & Conditions</a></li>
            <li><a href="#">&#x3e; Privacy Policy</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>CONTACT INFO</h3>
          <ul>
            <li>
              <a href="tel:000012345678">
                <i class="fas fa-phone"></i> 000 012 345 678
              </a>
            </li>
            <li>
              <a href="mailto:yoursh@maxi.com">
                <i class="fas fa-envelope"></i> yoursh@maxi.com
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fas fa-map-marker-alt"></i> 99 Boving Street, Big
                City, PLU
              </a>
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
  align-self: flex-start; /* Align the logo to the top */
}

.footer-logo {
  width: 400px;
  margin-top: -10rem;
  margin-bottom: -8rem;
}

.footer-description {
  font-size: 1rem; /* Increase font size */
  line-height: 1.5;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 15px;
  font-size: 1.5rem; /* Adjust size of icons */
}

.footer-links {
  display: flex;
  justify-content: center;
  flex: 2;
  gap: 5rem; /* Increase the gap between the sections */
}

.footer-column h3 {
  font-size: 1.2rem; /* Increase header font size */
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

.footer-column a {
  color: #b2b2b2;
  text-decoration: none;
  font-size: 1rem; /* Increase link font size */
}

.footer-column a:hover {
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
</style>
