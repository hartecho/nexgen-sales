<template>
  <div class="test-container">
    <h1>Course Test</h1>

    <h2>
      This test contains a series of open-ended questions that will give us a
      better idea of how well you understand the course and your ability to
      apply the knowledge to real-world situations.
    </h2>

    <!-- Questions and Answers -->
    <div v-for="(question, index) in test" :key="index" class="question-block">
      <h3>{{ index + 1 }}. {{ question.question }}</h3>

      <!-- User's answer input -->
      <div class="answer-input">
        <textarea
          v-model="userAnswers[index]"
          :placeholder="'Enter your answer for question ' + (index + 1)"
          :disabled="submitted"
          rows="3"
          class="answer-textarea"
        ></textarea>
      </div>
    </div>

    <!-- Action Container (Submit Button) -->
    <div class="action-container">
      <!-- Submit Button -->
      <button
        :disabled="!canSubmit || submitted"
        @click="submitTest"
        class="submit-button"
      >
        Submit Test
      </button>
    </div>

    <!-- Modal Popup when test is submitted -->
    <div v-if="submitted" class="modal-overlay">
      <div class="modal-content">
        <h2>Test Submitted!</h2>
        <p>
          Your test results have been submitted for review. Please check your
          email (the email associated with this account) for a link to book your
          final call. Once you've scheduled and completed the call, we will
          evaluate your test results along with the call discussion to determine
          your eligibility. Thank you for your efforts, and we look forward to
          speaking with you soon!
        </p>
        <button @click="returnToDashboard" class="return-button">
          Return to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const APIGatewayURL =
  "https://kgatbpjhmc.execute-api.us-east-2.amazonaws.com/default";

const props = defineProps({
  test: Array, // The test object passed as a prop
  courseId: String,
  courseName: String,
  userId: String,
  userName: String,
  userEmail: String,
});

const emit = defineEmits(["submissionComplete"]);

const userEmailPath = () => {
  return "/nexgen-calendly-email";

  // USE IF DIFFERENT TRIGGERS FOR DIFFERENT COURSES
  // const cleanCourseName = props.courseName.trim();
  // if (cleanCourseName === "Fiber Onboarding") {
  //   return "/nexgen-fiber-completion-email";
  // } else {
  //   return "";
  // }
};

const adminEmailPath = () => {
  return "/nexgen-user-done-with-course-email";
};

// Local state
const userAnswers = ref(Array(props.test.length).fill("")); // Track user's answers
const submitted = ref(false); // Track if the test is submitted

// Compute whether the user can submit the test (all questions must have an answer)
const canSubmit = computed(() => {
  return userAnswers.value.every((answer) => answer.trim() !== "");
});

// Submit the test // ADD TO THIS THE COMPLETION EMAIL WITH CORRECT JOTFORM LINK
async function submitTest() {
  if (!canSubmit.value) return;

  const answersData = props.test.map((question, index) => ({
    question: question.question,
    answer: userAnswers.value[index],
  }));

  try {
    const result = await $fetch(`/api/users/${props.userId}`, {
      method: "PUT",
      body: {
        completionDate: Date.now(),
        courseId: props.courseId,
        testResults: answersData,
      },
    });

    emit("submissionComplete", result); // Emit an event if needed
  } catch (error) {
    console.error("Error submitting test answers:", error);
    throw error;
  }

  submitted.value = true;
  try {
    const response = await fetch(`${APIGatewayURL}${userEmailPath()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: props.userEmail,
        from: "support@nexgensalepro.com",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log("Error in sendUserEmail:", error.message);
    throw error;
  }

  try {
    const response = await fetch(`${APIGatewayURL}${adminEmailPath()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "thomas@hartecho.com",
        from: "support@nexgensalepro.com",
        name: props.userName,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log("Error in sendAdminEmail:", error.message);
    throw error;
  }
}

// Refresh the page to simulate returning to the course
function returnToDashboard() {
  useRouter().push("/portal");
}
</script>

<style scoped>
.test-container {
  width: 100%;
  margin: 2rem auto 0 auto;
  padding: 2rem;
  font-family: "Roboto", sans-serif;
  max-width: 1000px;
  border-radius: 8px;
  height: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.2rem;
  font-weight: 600;
  color: #333;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.question-block {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

.answer-textarea {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1rem;
  resize: vertical; /* Allows vertical resizing */
  min-height: 3rem; /* Ensures a minimum height */
}

.submit-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #4caf50;
  color: white;
  border: none;
  /* border-radius: 6px; */
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #45a049;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 700px;
}

.modal-content h2 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

.modal-content p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
}

.return-button {
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.return-button:hover {
  background-color: #1e88e5;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}
</style>
