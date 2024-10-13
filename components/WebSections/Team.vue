<template>
  <div class="team-section-wrapper">
    <div class="team-section">
      <div class="header">
        <h4>OUR TEAM</h4>
        <h1>Meet The Experts</h1>
        <p>
          Learn from industry leaders with years of hands-on experience in
          door-to-door sales. Our team is here to guide you every step of the
          way, turning challenges into opportunities.
        </p>
      </div>

      <div class="team-grid">
        <SubcomponentsTeamMemberCard
          name="Beau Ruffner"
          title="CEO of Nexgen"
          description="With over 5 years in the door-to-door sales industry, Beau has mastered the art of persuasion and closing deals."
          imageSrc="/Portraits/Beau.webp"
        />
        <SubcomponentsTeamMemberCard
          name="Thomas Hart"
          title="CTO of Nexgen"
          description="Thomas combines technology with sales expertise to create innovative training solutions."
          imageSrc="/Portraits/Thomas.webp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.team-section-wrapper {
  width: 100%;
  background-color: #222;
  color: white;
  text-align: center;
}

.team-section {
  width: 100%;
  background-color: #222;
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 1300px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
}

.header h4 {
  color: #0197b2;
  font-size: 18px;
  letter-spacing: 2px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0.5rem 0 1rem;
}

.header p {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  color: #aaa;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: 1fr; /* Stack cards in a single column */
    gap: 1.5rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .header p {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .team-section {
    padding: 2rem 1rem;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .header h4 {
    font-size: 16px;
  }

  .header p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .team-section {
    padding: 2rem 1rem;
  }

  .header h1 {
    font-size: 1.6rem;
  }

  .header p {
    font-size: 0.85rem;
  }

  .header h4 {
    font-size: 14px;
  }

  .team-grid {
    gap: 1rem; /* Reduce gap for smaller screens */
  }
}
</style>
