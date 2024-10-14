<template>
  <div class="training-page">
    <CourseTrainingImageWrapper
      v-if="selectedTraining && selectedTraining.image"
      :imageSrc="selectedTraining.image"
      :altText="selectedTraining.mainTitle + ' picture'"
    />
    <div class="training-content-wrapper" v-if="selectedTraining">
      <div class="training-post">
        <h1 contenteditable @input="updateTitle">
          {{ selectedTraining.mainTitle }}
        </h1>
        <CourseTrainingEditTrainingPostHeader
          v-if="selectedTraining.author && selectedTraining.date"
          :author="selectedTraining.author"
          :date="selectedTraining.date"
          :views="selectedTraining.views"
          @updateHeader="updateHeader"
        />
        <div
          v-if="
            selectedTraining.updated &&
            selectedTraining.updated.date &&
            selectedTraining.updated.text
          "
        >
          <p>
            <strong
              >Updated
              {{ formattedDate(selectedTraining.updated.date) }}:</strong
            >
            {{ selectedTraining.updated.text }}
          </p>
        </div>
        <p
          v-if="
            selectedTraining.structuredData &&
            selectedTraining.structuredData.wordCount
          "
        >
          Word Count: {{ selectedTraining.structuredData.wordCount }}
        </p>
        <p v-if="selectedTraining.intro" contenteditable @input="updateIntro">
          {{ selectedTraining.intro }}
        </p>

        <!-- Existing Sections -->
        <div
          v-for="(section, index) in selectedTraining.sections"
          :key="'section-' + index"
          class="section-wrapper"
        >
          <CourseTrainingEditTrainingPostContent
            :title="section.title"
            :contents="section.content"
            @updateContent="updateSection(index, $event)"
          />
          <button @click="removeSection(index)" class="remove-section-button">
            ✖
          </button>
        </div>

        <!-- Button to Add a New Section -->
        <button @click="addSection" class="add-section-button">
          Add Section
        </button>

        <CourseTrainingEditTrainingReferences
          v-if="selectedTraining.references"
          :references="selectedTraining.references"
          @updateReferences="updateReferences"
        />

        <!-- Meta Title and Description Section -->
        <div class="meta-section">
          <h2>SEO Meta Information</h2>
          <div class="meta-group">
            <label for="metaTitle">Meta Title</label>
            <input
              id="metaTitle"
              type="text"
              :value="selectedTraining.metaTitle"
              @input="updateMetaTitle($event)"
              placeholder="Enter meta title"
            />
          </div>
          <div class="meta-group">
            <label for="metaDescription">Meta Description</label>
            <textarea
              id="metaDescription"
              :value="selectedTraining.metaDescription"
              @input="updateMetaDescription($event)"
              placeholder="Enter meta description"
            ></textarea>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="comments-section">
          <h2>Comments</h2>
          <div
            v-for="(comment, index) in selectedTraining.comments"
            :key="'comment-' + index"
            class="comment-group"
          >
            <label>Name</label>
            <input
              type="text"
              :value="comment.name"
              @input="updateComment(index, 'name', $event.target.value)"
              placeholder="Commenter's name"
            />
            <label>Comment</label>
            <textarea
              :value="comment.comment"
              @input="updateComment(index, 'comment', $event.target.value)"
              placeholder="Comment text"
            ></textarea>
            <label>URL</label>
            <input
              type="text"
              :value="comment.url"
              @input="updateComment(index, 'url', $event.target.value)"
              placeholder="Optional URL"
            />
            <label>Date</label>
            <input
              type="date"
              :value="formattedDateInput(comment.date)"
              @input="updateComment(index, 'date', $event.target.value)"
            />
            <button @click="removeComment(index)" class="remove-comment-button">
              ✖ Remove Comment
            </button>
          </div>
          <button @click="addComment" class="add-comment-button">
            Add Comment
          </button>
        </div>
      </div>
      <CourseTrainingEditTrainingPanel
        :trainings="trainings"
        :selectedTraining="selectedTraining"
        @selectTraining="setSelectedTraining"
        @createTraining="createTraining"
        @deleteTraining="deleteTraining"
        @saveTraining="updateContent"
        @updateBasicInfo="updateTrainingLocally"
        @addTrainingFromJson="createTrainingFromJson"
      />
    </div>

    <!-- Notification Popup -->
    <SubcomponentsNotificationPopup
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAsyncData } from "#imports";

// Define refs for the trainings and selected training
const trainings = ref([]);
const defaultTraining = ref({
  _id: "",
  mainTitle: "New Training Post",
  author: {
    name: "Author name",
    bio: "Author bio",
    image: "/Logos/HARTECHOLogo.webp",
  },
  date: new Date().toISOString(),
  intro: "This is an introduction.",
  sections: [],
  references: [],
  image: "HARTECHOLogo.webp",
  thumbnail: "",
  preview: "",
  tags: [],
  updated: {
    date: new Date().toISOString(),
    text: "Recently updated",
  },
  metaTitle: "",
  metaDescription: "",
  views: 0,
  comments: [],
});
let selectedTraining = defaultTraining;

const notificationMessage = ref("");
const notificationType = ref("success");

// Fetch the trainings from the API
const { data } = await useAsyncData("trainings", () =>
  $fetch("/api/trainings")
);
trainings.value = data.value;

// Set the selected training and ensure the author is an object
const setSelectedTraining = (trainingId) => {
  const training = trainings.value.find(
    (training) => training._id === trainingId
  );
  if (training) {
    selectedTraining.value = {
      ...training,
      author:
        typeof training.author === "string"
          ? {
              name: training.author,
              bio: "",
              image: "/Logos/HARTECHOLogo.webp",
            }
          : training.author,
    };
  }
  // console.log(
  //   "StructuredData: " + JSON.stringify(selectedTraining.value.structuredData)
  // );
  // console.log("Comments: " + JSON.stringify(selectedTraining.value.comments));
};

// Function to create a new training
const createTraining = async () => {
  selectedTraining.value._id = null;
  try {
    const createdTraining = await $fetch(`/api/trainings`, {
      method: "POST",
      body: selectedTraining.value,
    });

    trainings.value.push(createdTraining);
    setSelectedTraining(createdTraining._id);
    showNotification("Training created successfully!", "success");
  } catch (error) {
    showNotification("Failed to create training.", "error");
  }
};

// Function to delete a training
const deleteTraining = async (trainingId) => {
  try {
    await $fetch(`/api/trainings/${trainingId}`, {
      method: "DELETE",
    });
    trainings.value = trainings.value.filter(
      (training) => training._id !== trainingId
    );
    selectedTraining = defaultTraining;
    showNotification("Training deleted successfully!", "success");
  } catch (error) {
    showNotification("Failed to delete training.", "error");
    console.log(error);
  }
};

const updateTrainingLocally = (updatedTraining) => {
  selectedTraining.value = { ...updatedTraining };
};

// Functions to update various parts of the training
const updateTitle = (event) => {
  selectedTraining.value.mainTitle = event.target.innerText;
};

const updateIntro = (event) => {
  selectedTraining.value.intro = event.target.innerText;
};

const updateHeader = ({ author, date }) => {
  selectedTraining.value.author = author;
  selectedTraining.value.date = date;
};

const updateSection = (index, updatedData) => {
  selectedTraining.value.sections[index].title = updatedData.title;
  selectedTraining.value.sections[index].content = updatedData.contents;
};

const updateReferences = (updatedReferences) => {
  selectedTraining.value.references = updatedReferences;
};

const updateStructuredData = (updatedData) => {
  console.log("Here: " + JSON.stringify(updatedData));
  selectedTraining.value.structuredData = updatedData;
  console.log("After Update: ", selectedTraining.value.structuredData);
};

const updateMetaTitle = (event) => {
  selectedTraining.value.metaTitle = event.target.value;
};

const updateMetaDescription = (event) => {
  selectedTraining.value.metaDescription = event.target.value;
};

// Functions to manage comments
const updateComment = (index, field, value) => {
  selectedTraining.value.comments[index][field] = value;
};

const addComment = () => {
  selectedTraining.value.comments.push({
    name: "New Commenter",
    comment: "New comment text",
    date: new Date().toISOString(),
    url: "",
  });
};

const removeComment = (index) => {
  selectedTraining.value.comments.splice(index, 1);
};

const addSection = () => {
  selectedTraining.value.sections.push({
    title: "New Section",
    content: [],
  });
};

const removeSection = (index) => {
  selectedTraining.value.sections.splice(index, 1);
};

const createTrainingFromJson = async (trainingData) => {
  try {
    const createdTraining = await $fetch(`/api/trainings`, {
      method: "POST",
      body: trainingData,
    });

    trainings.value.push(createdTraining);
    setSelectedTraining(createdTraining._id);
    showNotification("Training created from JSON successfully!", "success");
  } catch (error) {
    showNotification("Failed to create training from JSON.", "error");
  }
};

// Function to update the training content and ensure that no undefined properties are accessed
const updateContent = async () => {
  try {
    // Create a deep copy of selectedTraining to avoid mutating the original object directly
    const updatedTraining = JSON.parse(JSON.stringify(selectedTraining.value));

    // Check if the training exists in the trainings array and update it
    const index = trainings.value.findIndex(
      (training) => training._id === updatedTraining._id
    );
    if (index !== -1) {
      // Save to backend
      await $fetch(`/api/trainings/${updatedTraining._id}`, {
        method: "PUT",
        body: updatedTraining,
      });

      // Update the local state to reflect the changes
      trainings.value[index] = updatedTraining;
      selectedTraining.value = { ...updatedTraining };

      showNotification("Training updated successfully!", "success");
    } else {
      showNotification(
        "Failed to update training. Invalid training data.",
        "error"
      );
    }
  } catch (error) {
    showNotification("Failed to update training.", "error");
    console.log(error);
  }
};

// Function to show notifications
const showNotification = (message, type) => {
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    notificationMessage.value = "";
  }, 3000);
};

// Function to format dates
const formattedDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : "";
};

const formattedDateInput = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
h1 {
  font-family: Proxima Nova, proxima-nova, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Helvetica, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
  color: #333;
  font-size: 2.5rem;
  line-height: 2.7rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

p {
  margin-bottom: 1.5rem;
}

.training-page {
  /* display: flex; */
}

.training-content-wrapper {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
}

.training-post {
  padding: 4rem 2rem;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  flex: 2;
}

.add-section-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.add-section-button:hover {
  background-color: #218838;
}

.section-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-action-buttons {
  position: absolute;
  top: 5px;
  left: -30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.section-action-buttons button {
  padding: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.remove-section-button {
  background-color: #ff5c5c;
  height: 1.5rem;
  min-width: 1.5rem;
  color: white;
  border-radius: 50%;
  border: none;
}

.meta-section {
  margin-top: 2rem;
}

.meta-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.meta-group {
  margin-bottom: 1.5rem;
}

.meta-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.meta-group input,
.meta-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.comments-section {
  margin-top: 2rem;
}

.comments-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.comment-group {
  margin-bottom: 1.5rem;
}

.comment-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.comment-group input,
.comment-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.add-comment-button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.add-comment-button:hover {
  background-color: #218838;
}

.remove-comment-button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.remove-comment-button:hover {
  background-color: #e04646;
}
</style>
