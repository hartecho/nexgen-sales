import { defineStore } from 'pinia';
import { ref, watch } from 'vue'; // Import watch and ref

export const useCourseStore = defineStore('courseStore', () => {
  const allCourses = ref([]);
  const allTrainings = ref([]);
  const lastFetchTime = ref(0); // Store last fetch time as a ref
  const CACHE_DURATION = 1000 * 60 * 10;
  // const CACHE_DURATION = 0;

  // Set courses
  const setCourses = (newCourses) => {
    allCourses.value = newCourses;
    lastFetchTime.value = Date.now(); // Set current timestamp
  };

  // Set trainings
  const setTrainings = (newTrainings) => {
    allTrainings.value = newTrainings;
    lastFetchTime.value = Date.now(); // Set current timestamp
  };

  // Get a course by its ID
  const getCourseById = (courseId) => {
    return allCourses.value.find((course) => course._id === courseId);
  };

  // Get a training by its ID
  const getTrainingById = (trainingId) => {
    return allTrainings.value.find((training) => training._id === trainingId);
  };

  // Watcher to manually persist lastFetchTime
  watch(lastFetchTime, (newTime) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastFetchTime', newTime.toString()); // Manually persist
    }
  });

  // Manually restore lastFetchTime on store initialization
  if (typeof window !== 'undefined') {
    const storedTime = localStorage.getItem('lastFetchTime');
    if (storedTime) {
      lastFetchTime.value = parseInt(storedTime, 10); // Convert back to number
    }
  }

  return {
    allCourses,
    allTrainings,
    CACHE_DURATION,
    lastFetchTime,
    setCourses,
    setTrainings,
    getCourseById,
    getTrainingById,
  };
}, {
  persist: {
    key: 'course-store-key',
    storage: typeof localStorage !== 'undefined' ? localStorage : null,
    paths: ['allCourses', 'allTrainings'], // Exclude lastFetchTime from paths
  },
});
