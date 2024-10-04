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
            src="/HARTECHOLogo.webp"
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
          <!-- Training Image -->
          <div class="left">
            <CourseTrainingImageWrapper
              :imageSrc="post.image"
              :altText="post.mainTitle + ' picture'"
              class="training-image"
            />
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
          <SubcomponentsTrainingSidebar />
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
    <SubcomponentsContactBanner
      graphicPath="ContactBannerGraphic.svg"
      buttonClass="contact-button"
      buttonPath="/contact"
      backgroundPath="ContactBannerBG.svg"
    />
  </div>
</template>

<script setup>
const route = useRoute();
const { data: post } = await useFetch(`/api/trainings?_id=${route.params.id}`);

// console.log(
//   "Word Count and reading time: " + post.value.structuredData.wordCount,
//   " + ",
//   post.value.structuredData.readingTime
// );

const formattedDate = (date) => {
  return new Date(date).toLocaleDateString();
};

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

onMounted(async () => {
  post.value.views++;
  updateContent();
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

useSeoMeta({
  title: post.value.metaTitle + " || HARTECHO",
  ogTitle: "Ads - #1 Utah-based Marketing Agency || HARTECHO",
  description:
    "Boost traffic and sales with Facebook and Google Ads! Reach a vast audience, engage with precise targeting, and use analytics with our Utah marketing services.",
  ogDescription:
    "Boost traffic and sales with Facebook and Google Ads! Reach a vast audience, engage with precise targeting, and use analytics with our Utah marketing services.",
  ogImage: "/HARTECHOLogo.webp",
  twitterCard: "/HARTECHOLogo.webp",
});

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
  /* gap: 1rem; */
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

.training-image {
  margin-bottom: 1.5rem;
  height: auto;
  width: 100%;
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
