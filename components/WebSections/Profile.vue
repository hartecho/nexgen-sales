<template>
  <div class="dashboard" :class="{ shifted: isSidebarVisible }">
    <div class="sidebar">
      <div class="logo-wrapper">
        <img src="/Logos/NexgenLogo.webp" alt="Logo" />
      </div>
      <div
        v-for="section in sections"
        :key="section.name"
        class="nav-item"
        :class="{ active: isActive(section.name) }"
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
            :class="{ active: isActive(sub.name) }"
            @click="setActiveSection(sub.name)"
          >
            {{ sub.title }}
          </div>
        </div>
      </div>
    </div>
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
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentSection = ref("dashboard");
const dropdowns = ref({});
const userStore = useUserStore();

const isSidebarVisible = ref(false);

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

const isActive = (section) =>
  currentSection.value === section ||
  currentSection.value.startsWith(section) ||
  isSubsectionActive(section);

const toggleDropdown = (section) => {
  if (sections.find((s) => s.name === section)?.hasDropdown) {
    dropdowns.value[section] = !dropdowns.value[section];
  } else {
    setActiveSection(section);
  }
};

const handleLogout = () => {
  userStore.logout();
};

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

const getImageSrc = (baseName, section) =>
  `/ProfilePics/${isActive(section) ? baseName + "Active" : baseName}.svg`;

const isSubsectionActive = (parentSection) =>
  sections
    .find((s) => s.name === parentSection)
    ?.subSections?.some((sub) => currentSection.value === sub.name);

const setActiveSection = (section) => {
  currentSection.value = section;
  Object.keys(dropdowns.value).forEach((key) => {
    dropdowns.value[key] = false;
  });
  isSidebarVisible.value = false;
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.dashboard {
  display: flex;
  font-family: Montserrat;
  font-weight: bold;
  transition: transform 0.3s ease;
  overflow: hidden;
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
  transition: transform 0.3s ease;
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

.content-section {
  flex: 1;
  background-color: #f0f0f0;
  height: 100vh;
  overflow: auto;
  transition: margin-left 0.3s ease;
  margin-left: 0;
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
    transform: translateX(-275px);
    width: 225px;
  }

  .dashboard.shifted .sidebar {
    transform: translateX(0);
  }

  .content-section.shifted {
    transform: translateX(225px);
  }

  h3 {
    font-size: 0.8rem;
  }

  .toggle-sidebar {
    display: block;
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
    margin-left: 275px;
  }
}
</style>
