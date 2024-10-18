<template>
  <div class="section">
    <h2>Course Test</h2>

    <!-- Grid for questions -->
    <div class="question-grid">
      <!-- Loop through each question in the test -->
      <div
        v-for="(question, questionIndex) in selectedCourse.test"
        :key="questionIndex"
        class="question"
      >
        <!-- Question Text -->
        <div class="input-wrapper">
          <input
            type="text"
            :value="question.question"
            @input="
              onInputChange(
                'test',
                $event.target.value,
                questionIndex,
                'question'
              )
            "
            placeholder="Enter the question"
          />
          <label>Question {{ questionIndex + 1 }}</label>
        </div>

        <!-- Remove Question Button -->
        <button
          @click="removeQuestion(questionIndex)"
          type="button"
          class="remove-button"
        >
          Remove Question
        </button>
      </div>
    </div>

    <!-- Add Question Button -->
    <button @click="addQuestion" type="button" class="add-button">
      Add Question
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedCourse: Object, // The selected course object passed down as a prop
});

const emit = defineEmits(["updateCourse"]);

// Function to handle input changes and emit the updated course object
function onInputChange(field, value, questionIndex, subField) {
  const updatedCourse = { ...props.selectedCourse };

  if (field === "test") {
    updatedCourse.test[questionIndex][subField] = value;
  }

  emit("updateCourse", updatedCourse);
}

// Add a new question to the test
function addQuestion() {
  const updatedCourse = { ...props.selectedCourse };
  updatedCourse.test.push({
    question: "",
  });
  emit("updateCourse", updatedCourse);
}

// Remove a question from the test
function removeQuestion(questionIndex) {
  const updatedCourse = { ...props.selectedCourse };
  updatedCourse.test.splice(questionIndex, 1);
  emit("updateCourse", updatedCourse);
}
</script>

<style scoped>
.section {
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

/* Grid layout for questions */
.question-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.question {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
}

.input-wrapper input[type="text"] {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-wrapper input:focus {
  border-color: #4caf50;
  outline: none;
}

.input-wrapper label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  background: #fff;
  padding: 0 5px;
  color: #999;
  pointer-events: none;
}

.input-wrapper input:focus + label,
.input-wrapper input:not(:placeholder-shown) + label {
  top: -10px;
  left: 5px;
  font-size: 0.85rem;
  color: #4caf50;
}

.add-button,
.remove-button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.add-button {
  margin-bottom: 2rem;
}

.remove-button {
  background-color: #e74c3c;
}

/* Responsive grid layout for mobile devices */
@media (max-width: 768px) {
  .question-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .question-grid {
    grid-template-columns: 1fr;
  }
}
</style>
