<template>
  <div class="body">
    <NuxtLink to="/" class="back-to-home">← Back to Home</NuxtLink>
    <div class="terms">
      <h1>Terms of Service</h1>

      <p>
        Welcome to <strong>Nexgen</strong>! These
        <strong>Terms of Service</strong> ("Terms") govern your access to and
        use of the <strong>Nexgen</strong> website ("<strong>Site</strong>"),
        including any content, functionality, and services offered on or through
        the Site. Please read these Terms carefully before using the Site.
      </p>

      <h2>1. General Conditions</h2>
      <p>
        1.1. By accessing or using the Site, you agree to be bound by these
        Terms and our <a href="#">Privacy Policy</a>. If you do not agree to
        these Terms or our Privacy Policy, you may not use the Site.
      </p>
      <p>
        1.2. You agree not to reproduce, duplicate, copy, sell, resell, or
        exploit any portion of the Site, use of the Site, or access to the Site
        without our express written permission.
      </p>

      <h2>2. Services</h2>
      <p>
        2.1. <strong>Nexgen</strong> offers door-to-door sales training courses
        and allows users to apply for sales representative positions
        ("<strong>Services</strong>").
      </p>
      <p>
        2.2. All descriptions of Services and pricing are subject to change at
        any time without notice, at our sole discretion.
      </p>
      <p>
        2.3. We reserve the right to discontinue any Service at any time. Any
        offer for any Service made on the Site is void where prohibited.
      </p>

      <h2>3. Applications and Payments</h2>
      <p>
        3.1. By submitting an application through the Site, you warrant that you
        are legally capable of entering into binding contracts and understand
        that an application fee may be required.
      </p>
      <p>
        3.2. You agree to provide current, complete, and accurate information
        for all applications and purchases made on the Site.
      </p>
      <p>
        3.3. All prices and fees, including application fees, are in USD and are
        subject to change without notice.
      </p>

      <h2>4. Training Courses</h2>
      <p>
        4.1. Our training courses are designed to equip you with the skills and
        knowledge needed to succeed in door-to-door sales. Enrollment in a
        course does not guarantee job placement.
      </p>
      <p>
        4.2. You agree not to share, reproduce, or distribute course content
        without written permission from Nexgen.
      </p>
      <p>
        4.3. We may periodically update the course content to ensure the
        information provided remains relevant and accurate.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        5.1. The Site and its original content, features, and functionality are
        owned by <strong>Nexgen</strong> and are protected by international
        copyright, trademark, patent, trade secret, and other intellectual
        property or proprietary rights laws.
      </p>
      <p>
        5.2. You may not use our trademarks, logos, or service marks without our
        prior written consent.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        6.1. In no event shall <strong>Nexgen</strong>, its directors, officers,
        employees, affiliates, agents, contractors, or licensors be liable for
        any direct, indirect, incidental, special, consequential, or punitive
        damages, including but not limited to, damages for loss of profits,
        goodwill, use, data, or other intangible losses resulting from your use
        of the Site or Services.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        7.1. These Terms shall be governed by and construed in accordance with
        the laws of the state of Utah, without regard to its conflict of law
        provisions.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        8.1. We reserve the right to update, change, or replace any part of
        these Terms by posting updates and changes to the Site. It is your
        responsibility to check the Site periodically for changes. Your
        continued use of or access to the Site following the posting of any
        changes constitutes acceptance of those changes.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        9.1. If you have any questions about these Terms, please contact us at
        support@nexgen.com.
      </p>

      <p>
        By using the <strong>Nexgen</strong> website, you agree to abide by
        these <strong>Terms of Service</strong>. Thank you for visiting
        <strong>Nexgen</strong>!
      </p>

      <p>Last updated: Feb. 7th, 2024</p>
    </div>
    <NuxtLink to="/" class="back-to-home">← Back to Home</NuxtLink>
  </div>
</template>

<script setup>
// SEO ADJUST
useSeoMeta({
  title: "Terms of Service | Nexgen",
  ogTitle: "Terms of Service | Nexgen",
  description:
    "Review the terms governing the use of Nexgen's website, services, and training programs.",
  ogDescription:
    "Review the terms governing the use of Nexgen's website, services, and training programs.",
  ogImage: "/Logos/Nexgen.webp",
  twitterCard: "/Logos/Nexgen.webp",
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.body {
  width: 100%;
  min-height: 70rem;
  height: auto;
}

.terms {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.back-to-home {
  display: block;
  margin: 2rem;
  text-align: left;
  width: 100%;
  font-size: 1rem;
  color: #0197b2;
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-to-home:hover {
  color: #017b9c;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

h2 {
  text-align: left;
  width: 100%;
  font-size: 1.3rem;
  font-weight: bold;
}

p {
  width: 100%;
  font-size: 1.3rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

a {
  color: #0197b2;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
