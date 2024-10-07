<template>
  <div class="training-page-wrapper">
    <!-- Training Title -->
    <div class="content">
      <div class="heading">
        <CourseTrainingSearchBreadcrumbs
          :currentTrainingTitle="post.tags[0] || 'All Posts'"
        />
        <h1 class="training-title">{{ post.mainTitle }}</h1>

        <!-- Training Metadata -->
        <div class="training-metadata">
          <NuxtImg
            src="/Logos/HARTECHOLogo.webp"
            alt="Author image"
            class="author-image"
          />
          <div class="post-info">
            <div class="author-info">
              <span
                >by <b>{{ post.author.name }}</b></span
              >
            </div>
            <div class="meta-info">
              <div class="meta-date">
                <NuxtImg
                  src="/calendar-icon.svg"
                  alt="Date icon"
                  class="meta-icon"
                />
                <span>{{ formattedDate(post.date) }}</span>
              </div>
              <div class="meta-reading-time">
                <NuxtImg
                  src="/clock-icon.svg"
                  alt="Clock icon"
                  class="meta-icon"
                />
                <!-- <span>{{
                   post.structuredData.readingTime || "Reading time unavailable"
                }}</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Training Wrapper -->
      <div class="training-content-wrapper">
        <!-- Main Training Content -->
        <div class="training-post" v-if="post">
          <!-- Conditional rendering for Video or Image -->
          <div class="left">
            <div v-if="post.mainVideo" class="training-video">
              <iframe
                :src="getYoutubeEmbedUrl(post.mainVideo)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="training-embed"
              ></iframe>
            </div>
            <div v-else>
              <CourseTrainingImageWrapper
                :imageSrc="post.image"
                :altText="post.mainTitle + ' picture'"
                class="training-image"
              />
            </div>
            <div class="under-photo">
              <!-- Left Sticky Column (Optional Table of Contents or Ad space) -->
              <div class="left-sticky-column">
                <SubcomponentsStickyCTA />
              </div>
              <!-- Training Sections -->
              <div class="training-body">
                <p>{{ post.intro }}</p>
                <div
                  v-for="(section, index) in post.sections"
                  :key="'section-' + index"
                >
                  <CourseTrainingPostContent
                    :title="section.title"
                    :contents="section.content"
                    @updatePoll="updateContent()"
                  />
                </div>
                <CourseTrainingReferences :references="post.references" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sticky Column (e.g., Related Links or Ads) -->
        <div class="right-sticky-column">
          <SubcomponentsTrainingSidebar
            :courseId="courseId"
            :trainingId="post._id"
            :isTrainingComplete="isTrainingComplete"
            :nextTraining="nextTraining"
          />
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="comments">
      <CourseTrainingComments
        :comments="post.comments"
        @addComment="addComment"
      />
    </div>

    <!-- Contact Banner -->
    <!-- <SubcomponentsContactBanner
      graphicPath="ContactBannerGraphic.svg"
      buttonClass="contact-button"
      buttonPath="/contact"
      backgroundPath="ContactBannerBG.svg"
    /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const route = useRoute();
const userStore = useUserStore();
const courseStore = useCourseStore();
const courseId = route.query.courseId; // Get course ID from the query parameter
const isPlayerReady = ref(false);
let player; // Keep track of the player instance

// Fetch the training data
const { data: post } = await useFetch(`/api/trainings?_id=${route.params.id}`);

const isTrainingComplete = computed(() => {
  // Fetch the course from the store using the courseId
  const course = courseStore.allCourses.find((c) => c._id === courseId);

  if (!course || !post.value) {
    return false; // If the course or the current post is not available, return false
  }

  // Find the index of the current training (post._id) in the course's trainings array
  const currentTrainingIndex = course.trainings.findIndex(
    (training) => training._id === post.value._id
  );

  // If training not found in the course, return false
  if (currentTrainingIndex === -1) {
    return false;
  }

  // Find the user's progress in the enrolledCourses array
  const userCourseProgress = userStore.user.enrolledCourses.find(
    (enrolledCourse) => enrolledCourse.course.toString() === courseId
  );

  // If the user is not enrolled in this course, return false
  if (!userCourseProgress) {
    return false;
  }

  // Compare the user's current training index with the current training's index
  return userCourseProgress.currentTrainingIndex > currentTrainingIndex;
});

const nextTraining = computed(() => {
  // Fetch the course from the store using the courseId
  const course = courseStore.getCourseById(courseId);

  console.log("HEREEEEEEEEEEE");

  if (!course || !post.value) {
    console.log("HEREEEEEEEEEEE1");
    return null; // If the course or the current post is not available, return null
  }

  // Use JSON.stringify to safely compare IDs
  const currentTrainingId = post.value._id ? post.value._id.toString() : "";
  console.log("Post.value._id (stringified):", currentTrainingId);

  // Check if course.trainings contains the ID strings directly
  const currentTrainingIndex = course.trainings.findIndex((trainingId) => {
    console.log("Training ID (stringified):", trainingId);
    return trainingId === currentTrainingId;
  });

  console.log("Course trainings: " + JSON.stringify(course.trainings));
  console.log("Post.value._id: " + JSON.stringify(post.value._id));
  console.log("Current Training Index:", currentTrainingIndex);

  // If training not found in the course, return null
  if (currentTrainingIndex === -1) {
    console.log("HEREEEEEEEEEEE2");
    return null;
  }

  // Check if there's a next training in the course
  const nextTrainingIndex = currentTrainingIndex + 1;
  if (nextTrainingIndex < course.trainings.length) {
    console.log("HEREEEEEEEEEEE3");
    // Fetch the next training object using getTrainingById
    return courseStore.getTrainingById(course.trainings[nextTrainingIndex]);
  } else {
    console.log("HEREEEEEEEEEEE4");
    // No next training (last one in the course)
    return null;
  }
});

// Function to mark the training as complete
const markTrainingAsComplete = async () => {
  console.log("markTrainingAsComplete called"); // Debugging log
  try {
    const userResponse = await $fetch(`/api/users/${userStore.user._id}`, {
      method: "PUT",
      body: { courseId: courseId },
    });

    userStore.setUser(userResponse); // Update user in the store
    console.log("Training marked as completed!");
  } catch (error) {
    console.error("Failed to mark training as complete:", error);
  }
};

// Load YouTube IFrame API
const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      console.log("YouTube API already loaded"); // Debugging log
      resolve(); // If API is already loaded
    } else {
      console.log("Loading YouTube API"); // Debugging log
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);

      window.onYouTubeIframeAPIReady = function () {
        console.log("YouTube API ready"); // Debugging log
        isPlayerReady.value = true;
        resolve(); // Resolve once the API is ready
      };
    }
  });
};

// Initialize YouTube Player
const initYouTubePlayer = async () => {
  await loadYouTubeAPI(); // Wait for YouTube API to load

  const videoId = getYoutubeEmbedUrl(post.value.mainVideo)?.split("/").pop();
  console.log("Initializing player with video ID:", videoId); // Debugging log

  // Make sure you have the correct ID of the iframe
  player = new YT.Player("videoPlayer", {
    videoId: videoId,
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
};

// Handle YouTube player state change
const onPlayerStateChange = (event) => {
  const playerStates = {
    "-1": "UNSTARTED",
    0: "ENDED",
    1: "PLAYING",
    2: "PAUSED",
    3: "BUFFERING",
    5: "CUED",
  };

  const state = playerStates[event.data] || "UNKNOWN STATE";
  console.log(`Player state changed: ${state} (${event.data})`); // Debugging log

  if (event.data === YT.PlayerState.ENDED) {
    console.log("Video ended"); // Debugging log
    markTrainingAsComplete(); // Call the completion logic
  }
};

// Convert YouTube link to embed URL
const getYoutubeEmbedUrl = (videoUrl) => {
  let videoId;
  if (videoUrl.includes("youtube.com")) {
    const urlParams = new URLSearchParams(new URL(videoUrl).search);
    videoId = urlParams.get("v");
  } else if (videoUrl.includes("youtu.be")) {
    videoId = videoUrl.split("/").pop().split("?")[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

// Mounted lifecycle hook
onMounted(async () => {
  post.value.views++;
  await updateContent();
  if (post.value.mainVideo) {
    await initYouTubePlayer(); // Initialize the YouTube player
  }
});

// Update content (like views or comments)
const updateContent = async () => {
  try {
    await $fetch(`/api/trainings/${post.value._id}`, {
      method: "PUT",
      body: post.value,
    });
  } catch (error) {
    console.error("Failed to update the training post:", error);
  }
};

// Function to add a comment
const addComment = async (newComment) => {
  if (newComment.name && newComment.comment) {
    post.value.comments.push({
      name: newComment.name,
      comment: newComment.comment,
      date: new Date().toISOString(),
      url: newComment.url,
    });
    await updateContent();
  } else {
    alert("Please enter your name and comment.");
  }
};

// Function to format the date for display
const formattedDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
/* Main Training Page Wrapper */
.training-page-wrapper {
  padding: 2rem 0rem;
  font-family: Proxima Nova, proxima-nova, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Helvetica, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
}

.content {
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 2rem;
}

.heading {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

/* Training Title */
.training-title {
  font-size: 3.2rem;
  line-height: 3.2rem;
  text-align: left;
  color: black;
  font-weight: bolder;
}

.post-info {
  display: flex;
  gap: 2rem;
}

/* Training Metadata Section */
.training-metadata {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0 2.5rem 0;
  align-items: center;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-image {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.meta-date,
.meta-reading-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

/* Training Content and Sticky Columns */
.training-content-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1350px;
  margin: 0 auto;
}

.training-post {
  flex: 3;
}

.left {
}

.under-photo {
  display: flex;
  gap: 2rem;
}

.training-image,
.training-embed {
  margin-bottom: 1.5rem;
  height: auto;
  width: 100%;
}

.training-embed {
  aspect-ratio: 16 / 9;
  border: none;
}

.training-body {
  flex: 3;
  line-height: 1.8;
  color: #444;
  padding-right: 2rem;
}

p {
  margin-bottom: 1.5rem;
}

/* Left Sticky Column */
.left-sticky-column {
  flex: 1;
  position: sticky;
  top: 2rem;
  min-width: 15rem;
}

/* Right Sticky Column */
.right-sticky-column {
  flex: 1;
  position: sticky;
  top: 2rem;
}

.comments {
  max-width: 1350px;
  margin: 0 auto;
}

/* Media Queries */
@media (max-width: 1024px) {
  .training-content-wrapper {
    flex-direction: column;
  }

  .training-body {
    padding: 0;
  }

  .left-sticky-column,
  .right-sticky-column {
    position: relative;
    top: 0;
  }

  .left-sticky-column {
    min-width: 12rem;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 0 1rem;
  }

  .training-metadata {
    gap: 0.5rem;
  }

  .left-sticky-column {
    display: none;
  }

  .post-info {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.75rem;
  }

  .meta-info {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .training-title {
    font-size: 2rem;
    line-height: 2.3rem;
  }
}
</style>
