<template>
  <div
    class="panel"
    :class="{ large: isLarge, small: !isLarge, fixed: isFixed }"
    :style="{ bottom: isFixed && isMinimized ? '0' : 'unset' }"
  >
    <div class="panel-header" v-if="isFixed">
      <button @click="togglePanel" class="toggle-button">
        {{ isMinimized ? "Maximize" : "Minimize" }}
      </button>
    </div>

    <div v-if="!isFixed || !isMinimized">
      <h2>Manage Training</h2>

      <!-- Dropdown to select an existing training -->
      <select
        v-model="selectedTrainingId"
        @change="selectTraining"
        class="select-dropdown"
      >
        <option disabled value="">Select A Training</option>
        <option
          v-for="training in trainings"
          :key="training._id"
          :value="training._id"
        >
          {{ training.mainTitle }}
        </option>
      </select>

      <!-- JSON input to add a training -->
      <label for="json-training">Add Training via JSON</label>
      <textarea
        v-model="jsonTraining"
        class="input json-input"
        placeholder="Paste JSON here"
      ></textarea>
      <button @click="addTrainingFromJson" class="json-button">
        Add Training
      </button>

      <!-- Edit selected training -->
      <div v-if="editableTraining">
        <label for="image-url">Image URL</label>
        <input
          type="text"
          v-model="editableTraining.image"
          @input="updateBasicInfo"
          class="input"
          placeholder="Enter image URL"
        />

        <label for="thumbnail-url">Thumbnail URL</label>
        <input
          type="text"
          v-model="editableTraining.thumbnail"
          @input="updateBasicInfo"
          class="input"
          placeholder="Enter thumbnail URL"
        />

        <input
          type="text"
          v-model="editableTraining.mainVideo"
          @input="updateBasicInfo"
          class="input"
          placeholder="Enter video URL"
        />

        <label for="preview-text">Preview Text</label>
        <textarea
          v-model="editableTraining.preview"
          @input="updateBasicInfo"
          class="input"
          placeholder="Enter preview text"
        ></textarea>

        <label for="updated-text">Updated Text</label>
        <input
          type="text"
          v-model="editableTraining.updated.text"
          @input="updateBasicInfo"
          class="input"
          placeholder="Enter update information"
        />

        <label for="updated-date">Updated Date</label>
        <input
          type="date"
          v-model="formattedUpdatedDate"
          @input="updateBasicInfo"
          class="input"
        />

        <!-- Tags Section -->
        <label for="tags">Tags</label>
        <div class="tags-input">
          <span
            v-for="(tag, index) in editableTraining.tags"
            :key="index"
            class="tag"
          >
            {{ tag }}
            <button @click="removeTag(index)" class="remove-tag">✖</button>
          </span>
          <input
            type="text"
            v-model="newTag"
            placeholder="Add a tag"
            class="input"
          />
          <button @click="addTag" class="add-tag-button">Add Tag</button>
        </div>
      </div>

      <button @click="createNewTraining" class="create-button">
        Create New Training
      </button>
      <button @click="updateTraining" class="update-button">
        Save to Database
      </button>
      <button
        @click="deleteTraining"
        class="delete-button"
        v-if="selectedTrainingId"
      >
        Delete Training
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// Define props to receive trainings array and the selectedTraining from the parent
const props = defineProps({
  trainings: Array,
  selectedTraining: Object,
});

// Emit the events back to the parent for updates
const emit = defineEmits([
  "updateBasicInfo",
  "saveTraining",
  "selectTraining",
  "createTraining",
  "deleteTraining",
  "addTrainingFromJson",
]);

// Local copy of the training being edited
const editableTraining = ref({ ...props.selectedTraining });
const selectedTrainingId = ref(props.selectedTraining._id); // Track the selected training's ID
const newTag = ref("");
const jsonTraining = ref(""); // JSON input for adding a new training

// Watch for changes in the props to update the local state
watch(
  () => props.selectedTraining,
  (newVal) => {
    editableTraining.value = { ...newVal };
    selectedTrainingId.value = newVal._id;
  }
);

// Function to update the local training data and emit changes to the parent
const updateBasicInfo = () => {
  emit("updateBasicInfo", editableTraining.value);
};

// Function to save the training to the database (emit to parent for actual saving)
const updateTraining = () => {
  emit("saveTraining", editableTraining.value);
};

// Function to handle selecting a training from the dropdown
const selectTraining = () => {
  const selectedTraining = props.trainings.find(
    (training) => training._id === selectedTrainingId.value
  );
  if (selectedTraining) {
    editableTraining.value = { ...selectedTraining };
    emit("selectTraining", selectedTraining._id);
  }
};

// Add a new tag to the training
const addTag = () => {
  if (newTag.value.trim()) {
    editableTraining.value.tags.push(newTag.value.trim());
    newTag.value = "";
    updateBasicInfo(); // Emit local update when adding a tag
  }
};

// Remove a tag from the training
const removeTag = (index) => {
  editableTraining.value.tags.splice(index, 1);
  updateBasicInfo(); // Emit local update when removing a tag
};

// Handle the date formatting for the updated date
const formattedUpdatedDate = computed({
  get: () => {
    return editableTraining.value?.updated?.date
      ? new Date(editableTraining.value.updated.date)
          .toISOString()
          .split("T")[0]
      : "";
  },
  set: (newValue) => {
    if (!editableTraining.value.updated) {
      editableTraining.value.updated = {};
    }
    editableTraining.value.updated.date = new Date(newValue).toISOString();
    updateBasicInfo(); // Emit local update when date changes
  },
});

// Function to add a training via JSON
const addTrainingFromJson = () => {
  try {
    const trainingData = JSON.parse(jsonTraining.value);
    emit("addTrainingFromJson", trainingData);
    jsonTraining.value = ""; // Clear the JSON field after adding
  } catch (error) {
    alert("Invalid JSON format");
  }
};

// Function to create a new training
const createNewTraining = () => {
  emit("createTraining");
};

// Function to delete the selected training
const deleteTraining = () => {
  if (confirm("Are you sure you want to delete this training?")) {
    emit("deleteTraining", selectedTrainingId.value);
    selectedTrainingId.value = null; // Reset selection after deletion
  }
};

// Panel size handling
const isMinimized = ref(false);
const isFixed = ref(false);
const isLarge = ref(true);

const togglePanel = () => {
  isMinimized.value = !isMinimized.value;
};

// Handle window scroll and resize
const lastScrollTop = ref(0);

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop.value) {
    isLarge.value = false;
  } else {
    isLarge.value = true;
  }

  lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
};

const checkWindowSize = () => {
  isFixed.value = window.innerWidth <= 1000;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", checkWindowSize);
  checkWindowSize(); // Initial check on mount
});
</script>

<style scoped>
.panel {
  flex: 1;
  position: -webkit-sticky;
  position: sticky;
  height: fit-content;
  background: #f9f9f9;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: top 0.4s, bottom 0.4s;
  overflow: auto;
  max-height: 90vh;
}

.panel.large {
  top: 3rem;
}

.panel.small {
  top: 1rem;
}

.panel.fixed {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 300px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 9999;
}

.panel-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.toggle-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
}

.select-dropdown {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

label {
  display: block;
  margin-bottom: 0.25rem;
}

select,
.input {
  width: 100%;
  padding: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

textarea.input {
  resize: vertical;
}

.json-input {
  height: 4rem;
}

.json-button {
  background-color: #28a745;
  margin-bottom: 0.5rem;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  width: 100%;
}

.create-button,
.update-button,
.delete-button {
  width: 100%;
  padding: 8px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.create-button {
  background-color: #007bff;
}

.update-button {
  background-color: #ffc107;
}

.delete-button {
  background-color: #dc3545;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}

.tag {
  background-color: #007bff;
  color: white;
  padding: 5px 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
}

.remove-tag:hover {
  color: #ff5c5c;
}

select,
option {
  cursor: pointer;
  color: black;
}

.add-tag-button {
  background-color: #28a745;
  margin-top: 0.5rem;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
}
</style>
