<template>
  <transition name="slide">
    <div v-if="isSidebarVisible" class="sidebar">
      <div class="logo-wrapper">
        <img src="/Logos/NexgenLogo.webp" alt="Logo" />
      </div>
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
</template>
  
  <script setup>
import { ref, computed } from "vue";

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
  if (isSubsection) return currentSection.value === sectionName;
  return (
    currentSection.value === sectionName || isSubsectionActive(sectionName)
  );
};

// Toggle dropdown visibility for sections with subsections
const toggleDropdown = (sectionName) => {
  const section = computedSections.value.find((s) => s.name === sectionName);
  if (section?.hasDropdown)
    dropdowns.value[sectionName] = !dropdowns.value[sectionName];
  else setActiveSection(sectionName);
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
  Object.keys(dropdowns.value).forEach((key) => (dropdowns.value[key] = false));
  if (window.innerWidth <= 768) isSidebarVisible.value = false;
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
const handleLogout = () => userStore.logout();
</script>
  
  <style scoped>
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

img {
  height: 20px;
  width: 20px;
}

.arrow {
  height: 15px;
  width: 15px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 225px;
  }
}
</style>
  