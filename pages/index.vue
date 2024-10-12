<template>
  <div class="home">
    <section class="intro-section">
      <!-- prettier-ignore -->
      <WebSectionsIntro/>
    </section>

    <section class="steps-section">
      <!-- prettier-ignore -->
      <WebSectionsSteps/>
    </section>

    <section class="benefits-section">
      <!-- prettier-ignore -->
      <WebSectionsBenefits/>
    </section>

    <section class="trusted-section">
      <!-- prettier-ignore -->
      <WebSectionsTrusted/>
    </section>

    <section class="features-section">
      <!-- prettier-ignore -->
      <WebSectionsFeatures/>
    </section>

    <section class="numbers-section">
      <!-- prettier-ignore -->
      <WebSectionsNumbers/>
    </section>

    <section class="testimonials-section">
      <!-- prettier-ignore -->
      <WebSectionsTestimonials/>
    </section>

    <section class="about-us-section">
      <!-- prettier-ignore -->
      <WebSectionsTeam />
    </section>

    <section class="contact-section">
      <!-- prettier-ignore -->
      <WebSectionsContact/>
    </section>

    <section class="blog-section">
      <!-- prettier-ignore -->
      <WebSectionsNews/>
    </section>

    <section class="free-section">
      <!-- prettier-ignore -->
      <WebSectionsFree/>
    </section>
  </div>
</template>

<script setup>
// SEO ADJUST
useSeoMeta({
  title: "post.value.mainTitle",
  ogTitle: "post.value.mainTitle",
  description: "post.value.preview",
  ogDescription: "post.value.preview",
  ogImage: "post.value.thumbnail",
  twitterCard: "post.value.thumbnail",
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped media="screen">
.intro-section,
.steps-section,
.benefits-section,
.trusted-section,
.features-section,
.numbers-section,
.testimonials-section,
.about-us-section,
.contact-section,
.blog-section,
.free-section {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.intro-section {
  background: url("/Backgrounds/introBG2.webp") no-repeat;
  background-position: center bottom;
  min-height: 40rem;
}

@media (max-width: 768px) {
  /*  ------------  MOBILE  ------------   */
}

@media (max-width: 480px) {
}
</style>
