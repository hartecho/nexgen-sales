<template lang="html">
  <div class="application-page-wrapper">
    <!-- Left section: Company information -->
    <div class="application-page">
      <div class="application-info">
        <h2>Join Our Team</h2>
        <h3>Apply for Door-to-Door Sales</h3>
        <p class="application-description">
          We're excited that you're interested in joining our team! Please fill out the form below with your details, and we'll get back to you shortly.
        </p>
     
        <div class="info-box">
          <div class="icon-wrap">
            <img src="/Graphics/EmailLogo.svg" alt="mail icon" class="icon" />
          </div>
          <div class="text-wrap">
            <h4>Questions? Email Us</h4>
            <p>Support@Nexgensalepro.com</p>
          </div>
        </div>
      </div>

      <!-- Right section: Application form -->
      <div class="application-form">
        <form v-if="showForm" @submit.prevent="submitForm">
          <!-- Section 1: Personal Information -->
          <div class="form-group">
            <input type="text" placeholder="Full Name" v-model="formData.name" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <input type="tel" placeholder="Phone Number" v-model="formData.phone" required />
            </div>
            <div class="form-group">
              <input type="email" placeholder="Email Address" v-model="formData.email" required />
            </div>
          </div>
          <div class="form-group">
            <input type="text" placeholder="Current Location (City, State)" v-model="formData.location" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Are you legally authorized to work in the U.S.?</label>
              <select v-model="formData.workAuthorization" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div class="form-group">
              <label>Do you have a driver's license?</label>
              <select v-model="formData.driverLicense" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <!-- Section 2: Position Preferences -->
          <div class="form-group">
            <label>Which industry are you applying for? (Select all that apply)</label>
            <div>
              <label><input type="checkbox" v-model="formData.industry" value="Door-to-Door Sales (fiber internet)" /> Door-to-Door Sales (fiber internet)</label>
              <label><input type="checkbox" v-model="formData.industry" value="Door-to-Door Sales (solar)" /> Door-to-Door Sales (solar)</label>
              <label><input type="checkbox" v-model="formData.industry" value="Remote Sales (Customer Service / life insurance)" /> Remote Sales (Customer Service / life insurance)</label>
              <label><input type="checkbox" v-model="formData.industry" value="Other" /> Other</label>
            </div>
          </div>
          <div class="form-group">
            <label>Preferred Position Type</label>
            <select v-model="formData.positionType" required>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Commission-Only">Commission-Only</option>
              <option value="Remote Work">Remote Work</option>
            </select>
          </div>
          <div class="form-group">
            <label>Are you willing to relocate or travel for work?</label>
            <select v-model="formData.relocateTravel" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <!-- Section 3: Experience & Skills -->
          <div class="form-group">
            <label>Do you have previous experience in sales?</label>
            <select v-model="formData.salesExperience" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea v-if="formData.salesExperience === 'Yes'" placeholder="Describe any relevant sales or customer service experience" v-model="formData.experienceDescription"></textarea>
          </div>
          <div class="form-group">
            <label>Do you have door-to-door or cold-calling experience?</label>
            <select v-model="formData.doorToDoorExperience" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="form-group">
            <label>Which of the following skills do you have? (Check all that apply)</label>
            <div>
              <label><input type="checkbox" v-model="formData.skills" value="Closing Sales" /> Closing Sales</label>
              <label><input type="checkbox" v-model="formData.skills" value="Cold Calling" /> Cold Calling</label>
              <label><input type="checkbox" v-model="formData.skills" value="Lead Generation" /> Lead Generation</label>
              <label><input type="checkbox" v-model="formData.skills" value="Customer Service" /> Customer Service</label>
              <label><input type="checkbox" v-model="formData.skills" value="CRM Software Experience" /> CRM Software Experience</label>
              <label><input type="checkbox" v-model="formData.skills" value="Leadership / Team Management" /> Leadership / Team Management</label>
            </div>
          </div>
          <div class="form-group">
            <textarea placeholder="What industries have you previously worked in (if any)?" v-model="formData.previousIndustries"></textarea>
          </div>

          <!-- Section 4: Availability & Qualifications -->
          <div class="form-row">
            <div class="form-group">
              <label>What is your availability to start?</label>
              <input type="date" v-model="formData.startDate" required />
            </div>
            <div class="form-group">
              <label>Do you have reliable transportation?</label>
              <select v-model="formData.transportation" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Are you comfortable working on a commission-only basis?</label>
              <select v-model="formData.commissionOnly" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div class="form-group">
              <label>Are you available to work evenings and weekends?</label>
              <select v-model="formData.workSchedule" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <!-- Section 5: Performance Assessment (Optional) -->
          <div class="form-group">
            <textarea placeholder="How do you stay motivated in a sales role?" v-model="formData.motivation"></textarea>
          </div>
          <div class="form-group">
            <textarea placeholder="How would you handle rejection during a sales pitch?" v-model="formData.handleRejection"></textarea>
          </div>

          <!-- Section 6: Additional Documents -->
          <div class="form-group">
            <label>Upload Your Resume (PDF or DOC format)</label>
            <input type="file" @change="handleResumeUpload" />
          </div>

          <!-- Section 7: Referral & Final Steps -->
          <div class="form-group">
            <label>How did you hear about us?</label>
            <select v-model="formData.referralSource">
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div v-if="formData.referralSource === 'Referral'" class="form-group">
            <input type="text" placeholder="Please provide the referral name" v-model="formData.referralName" />
          </div>
          <div class="form-group">
            <textarea placeholder="Do you have any questions or additional information you’d like to share?" v-model="formData.additionalInfo"></textarea>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" v-model="formData.certify" required /> I certify that the information provided is true and complete to the best of my knowledge.
            </label>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="submit-button">
            <img src="/Graphics/LinkIcon.svg" alt="" />
            Apply Now
          </button>
        </form>

        <!-- Error and Success Messages -->
        <div v-if="incomplete" class="form-message error">
          Please fill out all required fields.
        </div>
        <div v-if="invalidEmail" class="form-message error">
          Please enter a valid email address.
        </div>
        <div v-if="showSuccess" class="form-message success">
          Your application was submitted successfully!
        </div>
        <div v-if="showError" class="form-message error">
          Something went wrong. Please try again.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const formData = ref({
  name: "",
  phone: "",
  email: "",
  location: "",
  workAuthorization: "",
  driverLicense: "",
  industry: [],
  positionType: "",
  relocateTravel: "",
  salesExperience: "",
  experienceDescription: "",
  doorToDoorExperience: "",
  skills: [],
  previousIndustries: "",
  startDate: "",
  transportation: "",
  commissionOnly: "",
  workSchedule: "",
  motivation: "",
  handleRejection: "",
  referralSource: "",
  referralName: "",
  additionalInfo: "",
  certify: false,
});

const showForm = ref(true);
const showSuccess = ref(false);
const showError = ref(false);
const incomplete = ref(false);
const invalidEmail = ref(false);

const submitForm = async () => {
  if (
    formData.value.name == "" ||
    formData.value.email == "" ||
    formData.value.location == "" ||
    formData.value.workAuthorization == "" ||
    formData.value.driverLicense == "" ||
    formData.value.positionType == "" ||
    formData.value.relocateTravel == "" ||
    formData.value.salesExperience == "" ||
    formData.value.doorToDoorExperience == "" ||
    formData.value.startDate == "" ||
    formData.value.transportation == "" ||
    formData.value.commissionOnly == "" ||
    formData.value.workSchedule == "" ||
    formData.value.certify == false
  ) {
    incomplete.value = true;
    return;
  }

  if (
    !formData.value.email.includes("@") ||
    !formData.value.email.includes(".")
  ) {
    incomplete.value = false;
    invalidEmail.value = true;
    return;
  }

  try {
    const response = await fetch(
      "https://8y7wjasxc7.execute-api.us-east-2.amazonaws.com/default/ApplicationSubmit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    showForm.value = false;
    showSuccess.value = true;
  } catch (error) {
    console.error("Error submitting form:", error);
    showForm.value = false;
    showError.value = true;
  }
};

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (
    file &&
    (file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
  ) {
    formData.value.resume = file;
  } else {
    alert("Please upload a valid resume (PDF or DOC format).");
  }
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.application-page-wrapper {
  background-color: #000;
  color: white;
  width: 100%;
  min-height: 100vh;
}

.application-page {
  max-width: 1300px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.application-info {
  flex: 1;
  padding-right: 2rem;
}

.application-info h2 {
  font-size: 1.5rem;
  color: #0197b2;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.application-info h3 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.application-description {
  margin-bottom: 2rem;
  line-height: 1.8;
  font-size: 1rem;
  color: #ccc;
}

.info-box {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.icon-wrap {
  background-color: #0197b2;
  padding: 1rem;
  border-radius: 50%;
  margin-right: 1rem;
}

.icon {
  width: 20px;
  height: 20px;
}

.text-wrap h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.text-wrap p {
  font-size: 1rem;
  color: #aaa;
}

.application-form {
  flex: 1.5;
  padding-left: 2rem;
}

.application-form form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ddd;
  font-size: 1rem;
}

.form-group input,
.form-group textarea,
.application-form form select {
  width: 100%;
  padding: 0.85rem 1rem;
  background-color: #1a1a1a;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  transition: border-color 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #777;
}

.form-group input:focus,
.form-group textarea:focus,
.application-form form select:focus {
  border-color: #0197b2;
  outline: none;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

/* Modern Checkbox Styling */
.form-group input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 1px solid #777;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  margin-right: 0.5rem;
  vertical-align: middle;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.form-group input[type="checkbox"]:checked {
  background-color: #0197b2;
  border-color: #0197b2;
}

.form-group input[type="checkbox"]::before {
  content: "";
  position: absolute;
  width: 0.4rem;
  height: 0.8rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.form-group input[type="checkbox"]:checked::before {
  opacity: 1;
}

.form-group .checkbox-label {
  display: inline-block;
  font-size: 1rem;
  color: #ddd;
  margin-bottom: 0.5rem;
  vertical-align: middle;
  cursor: pointer;
}

.submit-button {
  background-color: #0197b2;
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.submit-button:hover {
  background-color: #017a8f;
}

img {
  height: 1rem;
  width: 1rem;
}

.form-message {
  margin-top: 1.5rem;
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 4px;
}

.success {
  background-color: #28a745;
  color: white;
}

.error {
  background-color: #d9534f;
  color: white;
}

/* Tablet adjustments */
@media (max-width: 1024px) {
  .application-page {
    flex-direction: column;
    padding: 2rem 1rem;
  }

  .application-info {
    padding-right: 0;
    margin-bottom: 2rem;
  }

  .application-form {
    padding-left: 0;
  }

  .form-row {
    flex-direction: column;
  }

  .application-info h3 {
    font-size: 2rem;
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .application-info h3 {
    font-size: 1.8rem;
  }

  .application-description {
    font-size: 0.95rem;
  }

  .text-wrap h4 {
    font-size: 1rem;
  }

  .text-wrap p {
    font-size: 0.9rem;
  }

  .form-group label {
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group textarea,
  .application-form form select {
    font-size: 0.9rem;
    padding: 0.75rem;
  }

  .submit-button {
    font-size: 1.1rem;
    padding: 0.85rem 1.5rem;
  }
}

/* Small mobile adjustments */
@media (max-width: 480px) {
  .application-info h3 {
    font-size: 1.5rem;
  }

  .application-description {
    font-size: 0.85rem;
  }

  .submit-button {
    font-size: 1rem;
    padding: 0.75rem 1.25rem;
  }

  .form-group input,
  .form-group textarea,
  .application-form form select {
    padding: 0.65rem;
    font-size: 0.85rem;
  }

  .form-group label {
    font-size: 0.85rem;
  }
}
</style>





