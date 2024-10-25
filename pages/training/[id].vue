<template>
  <div class="training-page-wrapper">
    <!-- Training Title -->
    <div class="content">
      <div class="heading">
        <CourseTrainingSearchBreadcrumbs
          v-if="post"
          :currentTrainingTitle="post?.tags[0] || 'All Posts'"
          :courseId="courseId"
        />
        <h1 class="training-title">{{ post?.mainTitle || "Loading..." }}</h1>
      </div>

      <!-- Main Training Wrapper -->
      <div class="training-content-wrapper">
        <div class="training-post" v-if="post">
          <div class="left">
            <div v-if="post.mainVideo" class="training-video">
              <video
                ref="videoPlayer"
                playsinline
                controls
                preload="auto"
                class="training-video-element"
                @ended="handleVideoEnd"
                @play="handleVideoPlay"
                @pause="handleVideoPause"
                @timeupdate="handleTimeUpdate"
              >
                <source
                  :src="getVideoSource(post.mainVideo)"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div v-else>
              <CourseTrainingImageWrapper
                :imageSrc="post.image"
                :altText="post.mainTitle + ' picture'"
                class="training-image"
              />
            </div>
            <div class="under-photo">
              <div class="training-body">
                <p>{{ post.intro }}</p>
                <div
                  v-for="(section, index) in post.sections"
                  :key="'section-' + index"
                >
                  <CourseTrainingPostContent
                    :title="section.title"
                    :contents="section.content"
                    @updatePoll="updateContent"
                  />
                </div>
                <CourseTrainingReferences :references="post.references" />
              </div>
            </div>
            <div class="comments">
              <CourseTrainingComments
                v-if="post"
                :comments="post?.comments"
                :name="userStore.user.name"
                @addComment="addComment"
              />
            </div>
          </div>
        </div>

        <div class="right-sticky-column">
          <SubcomponentsTrainingSidebar
            v-if="post"
            :courseId="courseId"
            :trainingId="post?._id"
            :isTrainingComplete="isTrainingComplete"
            :nextTraining="nextTraining"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const route = useRoute();
const userStore = useUserStore();
const courseStore = useCourseStore();
const courseId = route.query.courseId;
const videoPlayer = ref(null);
const videoDuration = ref(0);
const requiredWatchTime = ref(0);
const accumulatedPlayTime = ref(0);
const isPlaying = ref(false);
const lastPlayTime = ref(0);
const post = ref(null);

// const { data: post } = await useFetch(`/api/trainings?_id=${route.params.id}`);

const isTrainingComplete = computed(() => {
  const course = courseStore.allCourses.find((c) => c._id === courseId);
  if (!course || !post.value) return false;

  const currentTrainingIndex = course.trainings.findIndex(
    (training) => training === post.value._id
  );

  const userCourseProgress = userStore.user.enrolledCourses.find(
    (enrolledCourse) => enrolledCourse.course.toString() === courseId
  );

  return (
    userCourseProgress &&
    userCourseProgress.currentTrainingIndex > currentTrainingIndex
  );
});

const nextTraining = computed(() => {
  const course = courseStore.getCourseById(courseId);
  if (!course || !post.value) return null;

  const currentTrainingId = post.value._id.toString();
  const currentTrainingIndex = course.trainings.findIndex(
    (trainingId) => trainingId === currentTrainingId
  );

  const nextTrainingIndex = currentTrainingIndex + 1;
  return nextTrainingIndex < course.trainings.length
    ? courseStore.getTrainingById(course.trainings[nextTrainingIndex])
    : null;
});

const markTrainingAsComplete = async () => {
  const currentTrainingId = post.value._id.toString();
  const course = courseStore.getCourseById(courseId);
  const currentTrainingIndex = course.trainings.findIndex(
    (trainingId) => trainingId === currentTrainingId
  );

  try {
    const userResponse = await $fetch(`/api/users/${userStore.user._id}`, {
      method: "PUT",
      body: {
        courseId: courseId,
        currentTrainingIndex: currentTrainingIndex + 1,
      },
    });
    userStore.setUser(userResponse);
  } catch (error) {
    console.error("Failed to mark training as complete:", error);
  }
};

const handleVideoEnd = () => {
  updatePlayTime();
  if (accumulatedPlayTime.value >= requiredWatchTime.value) {
    markTrainingAsComplete();
  }
};

const handleVideoPlay = () => {
  isPlaying.value = true;
  lastPlayTime.value = Date.now();
};

const handleVideoPause = () => {
  isPlaying.value = false;
  updatePlayTime();
};

const handleTimeUpdate = () => {
  if (isPlaying.value) {
    updatePlayTime();
    lastPlayTime.value = Date.now();
  }
};

const updatePlayTime = () => {
  const currentTime = Date.now();
  if (isPlaying.value && lastPlayTime.value) {
    const elapsedTime = (currentTime - lastPlayTime.value) / 1000; // Convert milliseconds to seconds
    accumulatedPlayTime.value += elapsedTime;
  }
};

const handleLoadedMetaData = () => {
  if (videoPlayer.value) {
    videoDuration.value = videoPlayer.value.duration;
    requiredWatchTime.value = videoDuration.value * 0.5; // 50% of the video's duration
  }
};

const getVideoSource = (videoPath) => {
  return `${videoPath}`;
};

onMounted(() => {
  post.value = courseStore.getTrainingById(route.params.id);
  if (!post.value || !route.params.id || !route.query.courseId) {
    useRouter().push("/portal");
  }

  const videoElement = videoPlayer.value;

  if (videoElement) {
    videoElement.addEventListener("loadedmetadata", handleLoadedMetaData);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    handleLoadedMetaData();
  }

  post.value.views++;
  // updateContent(); // Just to update views but doesn't matter for now on trainings.
});

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

const addComment = async (newComment) => {
  if (newComment.name && newComment.comment) {
    post.value.comments.push({
      name: newComment.name,
      comment: newComment.comment,
      date: new Date().toISOString(),
    });
    await updateContent();
  } else {
    alert("Please enter your name and comment.");
  }
};

const formattedDate = (date) => {
  return new Date(date).toLocaleDateString();
};

useSeoMeta({
  title: post?.mainTitle
    ? `${post.mainTitle} - Nexgen Sales Training`
    : "Nexgen Sales Training - Door-to-Door Sales",
  ogTitle: post?.mainTitle
    ? `${post.mainTitle} - Nexgen Sales Training`
    : "Nexgen Sales Training - Door-to-Door Sales",
  description: post?.intro
    ? `${post.intro.substring(0, 155)}...`
    : "Enhance your door-to-door sales skills with Nexgen's comprehensive training modules. Complete courses designed to help you succeed.",
  ogDescription: post?.intro
    ? `${post.intro.substring(0, 155)}...`
    : "Get the best door-to-door sales training through Nexgen. Learn at your pace with engaging video lessons and comprehensive resources.",
  ogImage: post?.image ? `/Images/${post.image}` : "/Logos/NexgenLogo.webp",
  twitterCard: post?.image ? `/Images/${post.image}` : "/Logos/NexgenLogo.webp",
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.training-page-wrapper {
  padding: 2rem 0;
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

.training-title {
  font-size: 3.2rem;
  line-height: 3.2rem;
  text-align: left;
  color: black;
  font-weight: bolder;
  margin-bottom: 2rem;
}

.post-info {
  display: flex;
  gap: 2rem;
}

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
  width: 100%;
}

.under-photo {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.training-video-element {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background: black;
}

.training-body {
  flex: 3;
  line-height: 1.8;
  color: #444;
  padding-right: 2rem;
}

p {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.right-sticky-column {
  flex: 1;
  position: sticky;
  top: 2rem;
}

.comments {
  max-width: 1350px;
}

@media (max-width: 1024px) {
  .training-content-wrapper {
    flex-direction: column;
  }

  .right-sticky-column {
    position: relative;
  }
}

@media (max-width: 768px) {
  .training-title {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }

  .content {
    padding: 0 1rem;
  }

  .training-body {
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  .training-title {
    font-size: 2rem;
    line-height: 2rem;
  }

  .author-image {
    width: 40px;
    height: 40px;
  }

  .training-metadata {
    flex-direction: column;
    align-items: flex-start;
  }

  .meta-info {
    gap: 1rem;
  }
}
</style>
