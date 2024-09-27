<template>
  <div class="latest-news-section-wrapper">
    <div class="latest-news-section">
      <div class="news-header">
        <h3>Blog and News</h3>
        <h2>Latest News</h2>
        <p class="news-description">
          Stay updated with the latest insights and trends from our blog.
        </p>
      </div>

      <div class="blog-cards">
        <div
          v-for="(blog, index) in blogs.slice(0, 3)"
          :key="index"
          class="blog-card"
        >
          <div class="card-image" @click="goToBlog(blog._id)">
            <img :src="`/BlogPics/` + blog.thumbnail" alt="Blog Image" />
          </div>
          <div class="card-content">
            <h3 class="blog-title">{{ blog.mainTitle }}</h3>
            <div class="card-meta">
              <span>{{ new Date(blog.date).toLocaleDateString() }}</span>
              <span>{{ blog.views }} views</span>
            </div>
            <p>{{ blog.preview }}</p>
            <NuxtLink :to="`/blog/${blog._id}`" class="read-more"
              >Read More</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const { data: blogs } = await useFetch("/api/blogs");

const goToBlog = (id) => {
  navigateTo(`/blog/${id}`);
};
</script>
  
  <style scoped>
.latest-news-section-wrapper {
  background-color: #1b1b1b;
  color: white;
  width: 100%;
}

.latest-news-section {
  padding: 5rem 2rem;
  background-color: #1b1b1b;
  color: white;
  max-width: 1300px;
  margin: 0 auto;
}

.news-header {
  text-align: center;
  margin-bottom: 2rem;
}

.news-header h3 {
  color: #0197b2;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.news-header h2 {
  font-size: 2rem;
}

.news-header .news-description {
  font-size: 1.1rem;
  color: #aaa;
  margin-top: 0.5rem;
}

.blog-cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.blog-card {
  background-color: #222;
  overflow: hidden;
  width: 30%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  border: 2px solid #333;
}

.card-image {
  cursor: pointer;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  flex-grow: 2;
  transition: transform 0.3s ease;
}

.card-image:hover img {
  transform: scale(1.01);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.card-content h2 {
  color: #0197b2;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.card-content h3 {
  color: #0197b2;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.card-meta {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.card-content p {
  font-size: 1rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.read-more {
  text-decoration: none;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: auto;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
  