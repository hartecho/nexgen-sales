<template>
  <div class="add-comments-panel">
    <h2>Add Comments to Training</h2>

    <!-- JSON input for adding comments -->
    <label for="json-comments">Add Comments via JSON</label>
    <textarea
      v-model="jsonComments"
      class="input json-input"
      placeholder='Paste JSON here (e.g., [{"name": "John Doe", "comment": "Great training!"}])'
    ></textarea>
    <button @click="addCommentsFromJson" class="json-button">
      Add Comments
    </button>

    <!-- List of existing comments -->
    <div class="comments-list">
      <h3>Existing Comments</h3>
      <ul v-if="selectedTraining && selectedTraining.comments.length">
        <li
          v-for="(comment, index) in selectedTraining.comments"
          :key="index"
          class="comment-item"
        >
          <strong>{{ comment.name }}:</strong> {{ comment.comment }}
          <span class="comment-date"
            >({{ new Date(comment.date).toLocaleDateString() }})</span
          >
        </li>
      </ul>
      <p v-else>No comments yet.</p>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

// Define props to receive the selectedTraining from the parent
const props = defineProps({
  selectedTraining: {
    type: Object,
    required: true,
  },
});

// Emit the comments back to the parent for updating the training
const emit = defineEmits(["addComments"]);

// JSON input for adding comments
const jsonComments = ref("");

// Function to parse the JSON and emit comments to the parent
const addCommentsFromJson = () => {
  try {
    // Log the JSON to verify what's being processed
    console.log("JSON input:", jsonComments.value);
    const commentsData = JSON.parse(jsonComments.value);
    if (Array.isArray(commentsData)) {
      emit("addComments", commentsData); // Emit the array directly
      jsonComments.value = ""; // Clear the JSON field after adding
    } else {
      alert("Invalid JSON format. Please provide an array of comments.");
    }
  } catch (error) {
    console.error("JSON parsing error:", error); // Log the error for clarity
    alert("Invalid JSON format");
  }
};
</script>
  
  <style scoped>
.add-comments-panel {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.json-input {
  width: 100%;
  height: 4rem;
  margin-bottom: 0.5rem;
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

.json-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  width: 100%;
}

.comments-list {
  margin-top: 1.5rem;
}

h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.comment-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.comment-item strong {
  font-weight: bold;
}

.comment-date {
  font-size: 0.85rem;
  color: #777;
}
</style>
  