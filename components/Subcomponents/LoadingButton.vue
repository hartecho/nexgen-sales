<template>
  <button :disabled="isLoading" class="loading-button" @click="handleClick">
    <span v-if="!isLoading">{{ text }}</span>
    <span v-else class="spinner"></span>
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "Submit",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const handleClick = () => {
  emit("submit");
};
</script>

<style scoped>
.wrapper {
  color: white;
}

.loading-button {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #cbd2df;
  background: #0197b2;
  border-radius: 10px;
  font-size: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 3.1rem;
  color: white;
  transition: all 0.2s ease-in-out;
  font-weight: bold;
}

.loading-button:hover {
  transform: translateY(-2px);
  cursor: pointer;
  text-decoration: none;
}

.loading-button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

/* Spinner styling */
.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
