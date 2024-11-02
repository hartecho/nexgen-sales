<template>
  <div class="dashboard">
    <div class="content-section" :class="{ shifted: isSidebarVisible }">
      <button class="toggle-sidebar" @click="toggleSidebar()">
        <img src="/Graphics/NavBars.svg" alt="Menu" />
      </button>
      <transition name="fade" mode="out-in">
        <ProfileDashboard v-if="currentSection == 'dashboard'" />
        <ProfilePreferences v-else-if="currentSection == 'profile'" />
        <ProfileCourses v-else-if="currentSection == 'courses'" />
        <ProfileShop v-else-if="currentSection == 'shop'" />
        <ProfileTicketSupport
          v-else-if="currentSection == 'support'"
          @close-sidebar="closeSidebar()"
        />
        <ProfileAdminReps
          v-else-if="currentSection == 'reps' && userStore.user.role == 'admin'"
          @close-sidebar="closeSidebar()"
        />
        <ProfileAdminTickets
          v-else-if="
            currentSection == 'tickets' && userStore.user.role == 'admin'
          "
          @close-sidebar="closeSidebar()"
        />
        <ProfileAdminEditUsers
          v-else-if="
            currentSection == 'edit-users' && userStore.user.role == 'admin'
          "
        />
        <ProfileAdminEditCourses
          v-else-if="
            currentSection == 'edit-courses' && userStore.user.role == 'admin'
          "
        />
        <ProfileAdminEditTrainings
          v-else-if="
            currentSection == 'edit-trainings' && userStore.user.role == 'admin'
          "
        />
        <ProfileAdminEditBlogs
          v-else-if="
            currentSection == 'edit-blogs' && userStore.user.role == 'admin'
          "
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const props = defineProps({
  isSidebarVisible: Boolean,
  currentSection: String,
});

const emit = defineEmits(["toggle-sidebar", "change-section", "close-sidebar"]);

const toggleSidebar = () => {
  emit("toggle-sidebar");
};

const closeSidebar = () => {
  emit("close-sidebar");
};
</script>

<style scoped>
.dashboard {
  display: flex;
  font-family: Montserrat;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.content-section {
  flex: 1;
  background-color: #f0f0f0;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  margin-left: 275px;
  transition: transform 0.3s ease;
}

.toggle-sidebar {
  background: transparent;
  border: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  cursor: pointer;
}

.toggle-sidebar img {
  height: 30px;
  width: 30px;
}

@media (max-width: 768px) {
  .content-section {
    margin-left: 0;
  }

  /* Adjust margins for buttons and other elements */
  .toggle-sidebar {
    margin: 1rem; /* Ensure there's space from the viewport edges */
  }

  .content-section.shifted {
    transform: translateX(225px);
  }

  .toggle-sidebar {
    display: block;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }
}

@media (min-width: 768px) {
  .toggle-sidebar {
    display: none;
  }

  .content-section {
    /* margin-left: 275px; */
  }
}
</style>
