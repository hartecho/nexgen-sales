<template>
  <div class="dashboard">
    <transition name="slide">
      <div v-if="isSidebarVisible" class="sidebar">
        <div class="logo-wrapper">
          <img src="/Logos/NexgenLogo.webp" alt="Logo" />
        </div>
        <!-- Use computedSections and apply the active class similar to the first component -->
        <div
          v-for="section in computedSections"
          :key="section.name"
          class="nav-item"
          :class="{ active: isActive(section.name, false) }"
          @click="
            section.name === 'logout'
              ? handleLogout()
              : toggleDropdown(section.name)
          "
        >
          <div class="section-title">
            <img :src="getImageSrc(section.icon, section.name)" alt="Icon" />
            <h3>{{ section.title }}</h3>
            <img
              v-if="section.hasDropdown"
              :src="getArrowSrc(section.name)"
              class="arrow"
              alt="Dropdown Arrow"
            />
          </div>
          <div v-if="dropdowns[section.name]" class="sub-menu">
            <div
              v-for="sub in section.subSections"
              :key="sub.name"
              class="sub-item"
              :class="{ active: isActive(sub.name, true) }"
              @click="setActiveSection(sub.name)"
            >
              {{ sub.title }}
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="content-section" :class="{ shifted: isSidebarVisible }">
      <button
        class="toggle-sidebar"
        @click="isSidebarVisible = !isSidebarVisible"
      >
        <img src="/Graphics/NavBars.svg" alt="Menu" />
      </button>
      <transition name="fade" mode="out-in">
        <ProfileDashboard v-if="currentSection == 'dashboard'" />
        <ProfilePreferences v-else-if="currentSection == 'profile'" />
        <ProfileCourses v-else-if="currentSection == 'courses'" />
        <ProfileShop v-else-if="currentSection == 'shop'" />
        <ProfileSupport v-else-if="currentSection == 'support'" />
        <ProfileAdminReps
          v-else-if="currentSection == 'reps' && userStore.user.role == 'admin'"
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router"; // Import router to handle routes

const router = useRouter();
const currentSection = ref("dashboard");
const dropdowns = ref({});
const userStore = useUserStore();

const isSidebarVisible = ref(true);

// Admin and regular sections
const sections = [
  { name: "dashboard", hasDropdown: false, title: "Dashboard", icon: "Dash" },
  { name: "courses", hasDropdown: false, title: "Courses", icon: "Wishlist" },
  {
    name: "profile",
    hasDropdown: false,
    title: "Profile & Preferences",
    icon: "Profile",
  },
  { name: "support", hasDropdown: false, title: "Support", icon: "Support" },
  { name: "logout", hasDropdown: false, title: "Logout", icon: "Logout" },
];

const adminSections = [
  { name: "dashboard", hasDropdown: false, title: "Dashboard", icon: "Dash" },
  { name: "courses", hasDropdown: false, title: "Courses", icon: "Wishlist" },
  {
    name: "profile",
    hasDropdown: false,
    title: "Profile & Preferences",
    icon: "Profile",
  },
  { name: "support", hasDropdown: false, title: "Support", icon: "Support" },
  { name: "logout", hasDropdown: false, title: "Logout", icon: "Logout" },
  {
    name: "admin",
    hasDropdown: true,
    title: "Admin Console",
    icon: "Orders",
    subSections: [
      { name: "reps", title: "Reps" },
      { name: "edit-users", title: "Edit Users" },
      { name: "edit-courses", title: "Edit Courses" },
      { name: "edit-trainings", title: "Edit Trainings" },
      { name: "edit-blogs", title: "Edit Blogs" },
    ],
  },
];

// Computed sections based on user role
const computedSections = computed(() => {
  const role = userStore.user.role;
  return role === "admin" ? adminSections : sections;
});

// Function to check if a section or subsection is active
const isActive = (sectionName, isSubsection = false) => {
  // Check if it's a subsection
  if (isSubsection) {
    return currentSection.value === sectionName;
  }
  // Check if the parent section is active or if any of its subsections are active
  const hasActiveChild = isSubsectionActive(sectionName);
  return currentSection.value === sectionName || hasActiveChild;
};

// Toggle dropdown visibility for sections with subsections
const toggleDropdown = (sectionName) => {
  const section = computedSections.value.find((s) => s.name === sectionName);

  if (section?.hasDropdown) {
    dropdowns.value[sectionName] = !dropdowns.value[sectionName];
  } else {
    setActiveSection(sectionName);
  }
};

// Check if any subsection is active
const isSubsectionActive = (parentSection) => {
  return computedSections.value
    .find((s) => s.name === parentSection)
    ?.subSections?.some((sub) => currentSection.value === sub.name);
};

// Set the active section or subsection
const setActiveSection = (sectionName) => {
  currentSection.value = sectionName;

  // Close all dropdowns after setting the active section
  Object.keys(dropdowns.value).forEach((key) => {
    dropdowns.value[key] = false;
  });

  // Hide the sidebar on mobile devices
  if (window.innerWidth <= 768) {
    isSidebarVisible.value = false;
  }
};

// Get the appropriate arrow icon for sections with dropdowns
const getArrowSrc = (section) => {
  const isDropdownOpen = dropdowns.value[section];
  const hasActiveSubsection = isSubsectionActive(section);
  return isDropdownOpen
    ? hasActiveSubsection
      ? `/ProfilePics/UpArrowActive.svg`
      : `/ProfilePics/UpArrow.svg`
    : hasActiveSubsection
    ? `/ProfilePics/DownArrowActive.svg`
    : `/ProfilePics/DownArrow.svg`;
};

// Get the icon source for sections
const getImageSrc = (baseName, section) =>
  `/ProfilePics/${isActive(section) ? baseName + "Active" : baseName}.svg`;

// Handle logout
const handleLogout = () => {
  userStore.logout();
};

watch(isSidebarVisible, (newVal) => {
  if (newVal) {
    document.body.classList.add("locked");
  } else {
    document.body.classList.remove("locked");
  }
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
body.locked {
  overflow: hidden;
}

.dashboard {
  display: flex;
  font-family: Montserrat;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.sidebar {
  width: 275px;
  background-color: black;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
}

.logo-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

.logo-wrapper img {
  height: 100%;
  width: 100%;
}

img {
  height: 20px;
  width: 20px;
}

h3 {
  font-size: 1rem;
}

.arrow {
  height: 15px;
  width: 15px;
}

.nav-item {
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  color: #aaaaaa;
  transition: color 0.3s ease;
}

.nav-item.active {
  color: white;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sub-menu {
  padding-left: 1rem;
  padding-top: 0.5rem;
}

.sub-item {
  margin-bottom: 1rem;
  cursor: pointer;
  color: #aaaaaa;
  font-size: 1rem;
}

.sub-item.active {
  color: white;
}

.content-section {
  flex: 1;
  background-color: #f0f0f0;
  height: 100vh;
  overflow: auto;
  transition: margin-left 0.3s ease;
  margin-left: 275px;
  transition: transform 0.3s ease;
}

.toggle-sidebar {
  background: transparent;
  border: none;
  position: absolute;
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
  .sidebar {
    width: 225px;
  }

  .content-section {
    margin-left: 0;
    overflow-y: auto; /* Ensure that only vertical scrolling is applied */
  }

  /* Adjust margins for buttons and other elements */
  .toggle-sidebar {
    margin: 1rem; /* Ensure there's space from the viewport edges */
  }

  .content-section.shifted {
    transform: translateX(225px);
  }

  h3 {
    font-size: 0.8rem;
  }

  .toggle-sidebar {
    display: block;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }
}

@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0);
  }

  .toggle-sidebar {
    display: none;
  }

  .content-section {
    /* margin-left: 275px; */
  }
}
</style>
