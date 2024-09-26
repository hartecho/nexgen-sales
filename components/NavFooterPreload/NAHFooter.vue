<template>
  <footer class="footer-section">
    <div class="blurred-element"></div>
    <div class="newsletter-signup">
      <h2 class="signup-heading">
        GET UPDATES ON COOL STUFF YOU PROBABLY WANT TO KNOW ABOUT
      </h2>
      <div class="email-input-container">
        <input type="email" placeholder="Email Address" class="email-input" />
        <button class="submit-button">
          <span class="arrow-icon">➔</span>
        </button>
      </div>
      <div class="social-icons">
        <i class="fab fa-instagram"></i>
        <i class="fab fa-tiktok"></i>
        <i class="fab fa-facebook"></i>
      </div>
    </div>
    <div class="footer-links">
      <div class="footer-column">
        <h3>QUICK LINKS</h3>
        <ul>
          <li><a href="#">Shop</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>SUPPORT</h3>
        <ul>
          <li><a href="#">Shipping & Delivery</a></li>
          <li><a href="#">Returns & Exchanges</a></li>
          <li><a href="#">Track Your Order</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>LEGAL</h3>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Refund Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-info">
      <div class="payment-icons">
        <img src="/PaymentGraphics.webp" alt="Stripe" />
      </div>
      <p>123 Auto Ave, City, State | support@yourdomain.com | (555) 123-4567</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-section {
  /* background-color: #666666; */
  color: white;
  height: 50vh;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  /* background: linear-gradient(45deg, #1d2b64, #f8cdda); */
  background: #737373;
  overflow: hidden;
  font-family: Montserrat;
}

.blurred-element {
  position: absolute;
  bottom: -20%;
  left: -10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  /* background: black; */
  filter: blur(80px);
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, 50px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.newsletter-signup {
  flex: 2;
  min-width: 300px;
}

.signup-heading {
  color: #ff7f00;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.email-input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.email-input {
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  background-color: transparent;
  color: white;
  width: 100%;
  margin-right: 10px;
}

.submit-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
}

.arrow-icon {
  font-size: 2rem;
  font-weight: bold;
}

.social-icons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.social-icons i {
  font-size: 3rem;
  cursor: pointer;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex: 3;
  margin-left: 40px;
}

.footer-column h3 {
  color: white;
  font-size: 1.75rem;
  margin-bottom: 20px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column li {
  margin-bottom: 1rem;
}

.footer-column a {
  color: white;
  text-decoration: none;
}

.footer-info {
  position: absolute;
  right: 15px;
  bottom: 5px;
}

.payment-icons {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.payment-icons img {
  margin-left: 10px;
  width: 10rem;
  margin-bottom: -1rem;
}
</style>
