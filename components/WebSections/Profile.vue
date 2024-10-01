<template>
  <div class="dashboard">
    <div class="sidebar">
      <div class="logo-wrapper">
        <img src="/NexgenLogo.webp" alt="" />
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
    <div class="content-section">
      <transition name="fade" mode="out-in">
        <ProfileDashboard v-if="currentSection == 'dashboard'" />
        <ProfilePreferences v-else-if="currentSection == 'profile'" />
        <ProfileCourses v-else-if="currentSection == 'courses'" />
      </transition>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

const currentSection = ref("dashboard");
const dropdowns = ref({});
const userStore = useUserStore();

const sections = [
  { name: "dashboard", hasDropdown: false, title: "Dashboard", icon: "Dash" },
  {
    name: "profile",
    hasDropdown: false,
    title: "Profile & Preferences",
    icon: "Profile",
  },
  {
    name: "courses",
    hasDropdown: false,
    title: "Courses",
    icon: "wishlist",
  },
  {
    name: "merch",
    hasDropdown: true,
    title: "Get Merch",
    icon: "Orders",
    subSections: [
      { name: "shop", title: "Shop" },
      { name: "recent-orders", title: "Recent Orders" },
      // { name: "returns", title: "Return Items" },
      { name: "wishlist", title: "Wishlist" },
      { name: "payment-methods", title: "Payment Methods" },
      { name: "shipping-address", title: "Shipping Address" },
    ],
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
    setActiveSection(section); // If no dropdown, just set the section as active
  }
};

// Handle the logout action
const handleLogout = () => {
  userStore.logout();
};

// Helper function to dynamically get arrow source based on dropdown and active state
const getArrowSrc = (section) => {
  const isDropdownOpen = dropdowns.value[section];
  const hasActiveSubsection = isSubsectionActive(section);

  if (isDropdownOpen) {
    return hasActiveSubsection
      ? `/ProfilePics/UpArrowActive.svg`
      : `/ProfilePics/UpArrow.svg`;
  } else {
    return hasActiveSubsection
      ? `/ProfilePics/DownArrowActive.svg`
      : `/ProfilePics/DownArrow.svg`;
  }
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
    dropdowns.value[key] = false; // Close all other dropdowns
  });
};

watch(currentSection, (newSection) => {
  console.log("Current section changed to:", newSection);
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>



<style scoped>
.dashboard {
  display: flex;
  font-family: Montserrat;
  font-weight: bold;
}

.sidebar {
  width: 300px;
  background-color: black;
  color: white;
  height: 100vh;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
}

.logo-wrapper {
  width: 100%;
  /* height: 12rem; */
  /* aspect-ratio: 1/1; */
  display: flex;
  align-self: center;
  justify-self: center;
}

.logo-wrapper img {
  width: 100%;
  height: 100%;
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

.nav-item.active img,
.nav-item img:hover {
  filter: brightness(1.2);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sub-menu {
  padding-left: 1rem;
  padding-top: 0.5rem;
  display: block;
}

.sub-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #aaaaaa;
  font-size: 1rem;
}

.sub-item.active {
  color: white;
}

.sub-item:hover,
.nav-item:hover {
  background-color: #111;
}

.content-section {
  flex: 1;
  /* padding: 2rem; */
  border-top: 2px solid white;
  background-color: #f0f0f0;
  height: 100vh;
  overflow-y: auto;
}
</style>
