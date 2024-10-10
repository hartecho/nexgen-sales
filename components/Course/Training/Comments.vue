<template>
  <div class="comments-section">
    <h2>Comments</h2>
    <div v-if="comments.length" class="comments-list">
      <div
        v-for="(comment, index) in comments"
        :key="'comment-' + index"
        class="comment-item"
      >
        <p class="comment-header">
          <strong>{{ comment.name }}</strong> ({{
            formattedDate(comment.date)
          }})
        </p>
        <p class="comment-text">{{ comment.comment }}</p>
        <a
          v-if="comment.url"
          :href="comment.url"
          target="_blank"
          rel="noopener noreferrer"
          class="comment-url"
          >{{ comment.url }}</a
        >
      </div>
    </div>
    <div v-else>
      <p class="no-comments">No comments yet. Be the first to comment!</p>
    </div>

    <!-- Add Comment Form -->
    <div class="add-comment-form">
      <h3>Leave a Comment</h3>
      <input
        type="text"
        v-model="newComment.name"
        placeholder="Your Name"
        class="input-field"
      />
      <textarea
        v-model="newComment.comment"
        placeholder="Your Comment"
        class="textarea-field"
      ></textarea>
      <input
        type="text"
        v-model="newComment.url"
        placeholder="Optional: Your Website URL"
        class="input-field"
      />
      <button class="cta-button" @click="submitComment">Submit Comment</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["addComment"]);

const newComment = ref({
  name: "",
  comment: "",
  url: "",
});

const formattedDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const submitComment = () => {
  if (newComment.value.name && newComment.value.comment) {
    emit("addComment", { ...newComment.value });
    newComment.value = { name: "", comment: "", url: "" };
  } else {
    alert("Please enter your name and comment.");
  }
};
</script>

<style scoped>
.comments-section {
  margin-top: 3rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.comments-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.comments-list {
  margin-bottom: 2rem;
}

.comment-item {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.comment-header {
  font-size: 1.1rem;
  color: #333;
}

.comment-text {
  font-size: 1rem;
  color: #555;
  margin-top: 0.5rem;
}

.comment-url {
  font-size: 0.9rem;
  color: #005ba0;
  display: block;
  margin-top: 0.5rem;
  text-decoration: none;
  word-break: break-word; /* Break long URLs to wrap within the container */
  overflow: hidden;
  white-space: nowrap; /* Prevent the link from breaking onto a new line */
  text-overflow: ellipsis; /* Show an ellipsis if the URL is too long */
  max-width: 100%; /* Ensure it doesn't exceed the width of the container */
}

.comment-url:hover {
  text-decoration: underline;
}

.no-comments {
  font-size: 1rem;
  color: #777;
}

.add-comment-form {
  margin-top: 2rem;
}

.add-comment-form h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.textarea-field {
  height: 150px;
  resize: none;
}

.cta-button {
  display: inline-block;
  background-color: #005ba0;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  max-width: 200px;
  text-align: center;
  cursor: pointer;
  border: none;
}

.cta-button:hover {
  background-color: #01c5ee;
}

@media (max-width: 768px) {
  .comments-section {
    padding: 1.5rem;
  }

  .comments-section h2 {
    font-size: 1.5rem;
  }

  .comment-header {
    font-size: 1rem;
  }

  .comment-text {
    font-size: 0.95rem;
  }

  .comment-url {
    font-size: 0.85rem;
  }

  .add-comment-form h3 {
    font-size: 1.3rem;
  }

  .input-field,
  .textarea-field {
    padding: 0.65rem;
  }

  .cta-button {
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .comments-section {
    padding: 1rem;
  }

  .comments-section h2 {
    font-size: 1.3rem;
  }

  .comment-item {
    margin-bottom: 1.5rem;
  }

  .comment-header {
    font-size: 0.9rem;
  }

  .comment-text {
    font-size: 0.85rem;
  }

  .comment-url {
    font-size: 0.8rem;
  }

  .no-comments {
    font-size: 0.9rem;
  }

  .add-comment-form h3 {
    font-size: 1.2rem;
  }

  .input-field,
  .textarea-field {
    padding: 0.6rem;
  }

  .cta-button {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>
