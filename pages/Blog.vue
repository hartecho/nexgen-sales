<template>
  <div class="blogs-wrapper">
    <div class="content-container">
      <!-- Left Column -->
      <div class="left-column">
        <BlogSearchBreadcrumbs :currentBlogTitle="selectedTag || 'All Posts'" />
        <BlogSearchFilters
          :allTags="allTags"
          :selectedTag="selectedTag"
          :sortOption="sortOption"
          @update:tag="filterBlogsByTag"
          @update:sort="sortBlogs"
        />
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <h1 class="filter-title">{{ selectedTag || "All Posts" }}</h1>
        <BlogSearchFeaturedBlogs
          :featuredBlogs="featuredBlogs"
          :loadedImages="loadedImages"
          @view-blog="goToBlog"
          @update:loadedImages="updateLoadedImages"
        />
        <BlogSearchBlogList
          :paginatedBlogs="paginatedBlogs"
          :loadedImages="loadedImages"
          :selectedTag="selectedTag"
          @view-blog="goToBlog"
          @update:loadedImages="updateLoadedImages"
        />
        <BlogSearchPagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          @update:page="goToPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: blogs } = await useFetch("/api/blogs");

blogs.value.forEach((blog) => {
  // console.log("Blog structuredData: " + JSON.stringify(blog.structuredData));
});

const selectedTag = ref("");
const sortOption = ref("most-recent");
const loadedImages = ref({});
const currentPage = ref(1);
const itemsPerPage = ref(5);

const allTags = computed(() => {
  const tags = new Set();
  blogs.value.forEach((blog) => {
    blog.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

const filteredBlogs = computed(() => {
  let filtered = blogs.value;

  // Filter by selected tag
  if (selectedTag.value) {
    filtered = filtered.filter((blog) => blog.tags.includes(selectedTag.value));
  }

  // Sort blogs based on the selected sort option
  switch (sortOption.value) {
    case "alphabetical":
      filtered = filtered.sort((a, b) => {
        const titleA = a.mainTitle ? a.mainTitle.toLowerCase() : ""; // Check if title exists
        const titleB = b.mainTitle ? b.mainTitle.toLowerCase() : "";
        return titleA.localeCompare(titleB);
      });
      break;
    case "reverse-alphabetical":
      filtered = filtered.sort((a, b) => {
        const titleA = a.mainTitle ? a.mainTitle.toLowerCase() : "";
        const titleB = b.mainTitle ? b.mainTitle.toLowerCase() : "";
        return titleB.localeCompare(titleA);
      });
      break;
    case "most-recent":
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "oldest-first":
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    default:
      break;
  }

  return filtered;
});

const featuredBlogs = computed(() => blogs.value.slice(0, 3));
const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredBlogs.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredBlogs.value.length / itemsPerPage.value)
);

const goToBlog = (blogId) => {
  useRouter().push(`/blog/${blogId}`);
};

const filterBlogsByTag = (tag) => {
  selectedTag.value = tag;
};

const sortBlogs = (option) => {
  sortOption.value = option;
};

const goToPage = (page) => {
  currentPage.value = page;
};

const updateLoadedImages = ({ index, status }) => {
  loadedImages.value = { ...loadedImages.value, [index]: status };
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.blogs-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
}

.content-container {
  display: flex;
  gap: 5rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}

.left-column {
  width: 20%;
}

.right-column {
  width: 70%;
  margin-top: 5rem;
}

.filter-title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 1025px) {
  .content-container {
    flex-direction: column;
    gap: 0rem;
  }

  .left-column,
  .right-column {
    width: 100%;
    margin-top: 0; /* Remove top margin for smaller screens */
  }

  .right-column {
    margin-top: 2rem; /* Optional: Adjust spacing between elements */
  }
}
</style>
