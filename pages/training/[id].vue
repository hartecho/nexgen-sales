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
                  src="/Graphics/calendar-icon.svg"
                  alt="Date icon"
                  class="meta-icon"
                />
                <span>{{ formattedDate(post.date) }}</span>
              </div>
              <div class="meta-reading-time">
                <NuxtImg
                  src="/Graphics/clock-icon.svg"
                  alt="Clock icon"
                  class="meta-icon"
                />
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
                id="videoPlayer"
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const route = useRoute();
const userStore = useUserStore();
const courseStore = useCourseStore();
const courseId = route.query.courseId; // Get course ID from the query parameter
let player; // Keep track of the player instance

// Fetch the training data
const { data: post } = await useFetch(`/api/trainings?_id=${route.params.id}`);

const isTrainingComplete = computed(() => {
  const course = courseStore.allCourses.find((c) => c._id === courseId);
  if (!course || !post.value) {
    return false;
  }
  const currentTrainingIndex = course.trainings.findIndex(
    (training) => training._id === post.value._id
  );
  if (currentTrainingIndex === -1) {
    return false;
  }
  const userCourseProgress = userStore.user.enrolledCourses.find(
    (enrolledCourse) => enrolledCourse.course.toString() === courseId
  );
  if (!userCourseProgress) {
    return false;
  }
  return userCourseProgress.currentTrainingIndex > currentTrainingIndex;
});

const nextTraining = computed(() => {
  const course = courseStore.getCourseById(courseId);
  if (!course || !post.value) {
    return null;
  }
  const currentTrainingId = post.value._id ? post.value._id.toString() : "";
  const currentTrainingIndex = course.trainings.findIndex((trainingId) => {
    return trainingId === currentTrainingId;
  });
  if (currentTrainingIndex === -1) {
    return null;
  }
  const nextTrainingIndex = currentTrainingIndex + 1;
  if (nextTrainingIndex < course.trainings.length) {
    return courseStore.getTrainingById(course.trainings[nextTrainingIndex]);
  } else {
    return null;
  }
});

// Function to mark the training as complete
const markTrainingAsComplete = async () => {
  try {
    const userResponse = await $fetch(`/api/users/${userStore.user._id}`, {
      method: "PUT",
      body: { courseId: courseId },
    });
    userStore.setUser(userResponse);
    console.log("Training marked as completed!");
  } catch (error) {
    console.error("Failed to mark training as complete:", error);
  }
};

// Load YouTube IFrame API
const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      console.log("YouTube API already loaded");
      resolve();
    } else {
      console.log("Loading YouTube API");
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);

      window.onYouTubeIframeAPIReady = function () {
        console.log("YouTube API is ready");
        resolve();
      };
    }
  });
};

const initYouTubePlayer = async () => {
  await loadYouTubeAPI();
  console.log("YouTube API loaded");

  // Wait until next tick to ensure everything is rendered
  await new Promise((resolve) => setTimeout(resolve, 100));

  const videoId = getYoutubeEmbedUrl(post.value.mainVideo)?.split("/").pop();
  console.log("Video ID for YouTube Player:", videoId);

  if (!videoId) {
    console.error("No valid video ID found");
    return;
  }

  player = new YT.Player("videoPlayer", {
    videoId: videoId,
    events: {
      onReady: (event) => {
        console.log("Player ready:", event);
        onPlayerReady(event);
      },
      onStateChange: (event) => {
        console.log("State change event triggered:", event);
        onPlayerStateChange(event);
      },
    },
  });

  console.log("YouTube Player instance created:", player);
};

// Function to handle state changes
const onPlayerStateChange = (event) => {
  console.log("Player state changed:", event.data);
  if (event.data === YT.PlayerState.ENDED) {
    markTrainingAsComplete();
  }
};

// Optional: Handle when the player is ready
const onPlayerReady = (event) => {
  console.log("Player is ready");
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
