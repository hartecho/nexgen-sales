<template lang="html">
    <div class="contact-page-wrapper">
      <!-- Left section: Contact information -->
      <div class="contact-page">
        <div class="contact-info">
          <h2>Contact Us</h2>
          <h3>Contact Information</h3>
          <p class="contact-description">
            We are here to help you! Whether you have a question about our services, need assistance, or just want to say hello, feel free to reach out. You can contact us via email, phone, or by filling out the form on this page.          </p>
          <div class="info-box">
            <div class="icon-wrap">
              <img src="/Support.webp" alt="location icon" class="icon" />
            </div>
            <div class="text-wrap">
              <h4>Our Location</h4>
              <p>Dream Palace, In The World, 12345</p>
            </div>
          </div>
          <div class="info-box">
            <div class="icon-wrap">
              <img src="/Sales.webp" alt="phone icon" class="icon" />
            </div>
            <div class="text-wrap">
              <h4>Our Number</h4>
              <p>+123 456 789</p>
            </div>
          </div>
          <div class="info-box">
            <div class="icon-wrap">
              <img src="/Privacy.webp" alt="mail icon" class="icon" />
            </div>
            <div class="text-wrap">
              <h4>Our Mail</h4>
              <p>AwesomeShop@mail.com</p>
            </div>
          </div>
        </div>
  
        <!-- Right section: Contact form -->
        <div class="contact-form">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <input type="text" placeholder="Your Name" v-model="formData.name" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <input type="text" placeholder="Your Phone Number" v-model="formData.phone" />
              </div>
              <div class="form-group">
                <input type="email" placeholder="Your Mail" v-model="formData.email" />
              </div>
            </div>
            <div class="form-group">
              <input type="text" placeholder="Subject" v-model="formData.subject" />
            </div>
            <div class="form-group">
              <textarea placeholder="Your Message" v-model="formData.message"></textarea>
            </div>
            <button type="submit" class="submit-button">
              <img src="/LinkIcon.svg" alt="" />
              SEND EMAIL
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from "vue";

const formData = ref({
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
});

const submitForm = () => {
  // handle form submission
};
</script>
  
  <style scoped>
.contact-page-wrapper {
  background-color: #000;
  color: white;
  width: 100%;
}

.contact-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  justify-content: space-between;
}

.contact-info {
  flex: 1;
  padding-right: 2rem;
}

.contact-info h2 {
  font-size: 1rem;
  color: #0197b2;
  text-transform: uppercase;
}

.contact-info h3 {
  font-size: 2.5rem;
  font-weight: bold;
}

.contact-description {
  margin: 1.5rem 0;
  line-height: 1.8;
  font-size: 1rem;
}

.info-box {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.icon-wrap {
  background-color: #0197b2;
  padding: 1rem;
  border-radius: 50%;
  margin-right: 1.5rem;
}

.icon {
  width: 24px;
  height: 24px;
}

.text-wrap h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.text-wrap p {
  font-size: 1rem;
}

.contact-form {
  flex: 1;
  padding: 2rem;
  border-radius: 0px;
}

.contact-form form {
  display: grid;
  grid-gap: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border: 1px solid rgba(73, 73, 73, 1);
  color: white;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

.submit-button {
  background-color: #0197b2;
  color: black;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: white;
  transform: scale(1.01);
}

.submit-button img {
  height: 1rem;
  width: 1rem;
}
</style>
  