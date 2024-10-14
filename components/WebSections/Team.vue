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
          instagramLink="https://www.instagram.com/beauyadig/"
          linkedinLink="https://www.linkedin.com/in/beau-ruffner-1b2528318"
        />
        <SubcomponentsTeamMemberCard
          name="Thomas Hart"
          title="CTO of Nexgen"
          description="Thomas combines technology with sales expertise to create innovative training solutions."
          imageSrc="/Portraits/Thomas.webp"
          instagramLink="https://www.instagram.com/thomas_m_hart/?locale=%25E4%25B9%25B0%25E9%25AB%2598%25E4%25BB%25BF%25E9%2598%25BF%25E5%25B8%2583%25E5%2593%2588%25E5%2585%25B9%25E7%2594E5%2585%25B9%25E7%2594%25B5%25E8%25B4%25B9%25E5%259C%25B0%25E5%259D%2580%25E8%25B4%25A6%25E5%258D%2595%25E8%2581%2594%25E7%25B3%25BB%257B%25E5%25A8%2581%25E4%25BF%25A1%252BTG%252F%25E9%25A3%259E%25E6%259C%25BA%253A%2540buth2788%257DVjgaR%25D2%25BB%3F%3F%25D2%25BB%25C4%25A3%3F%25C2%25B4%3F%25D1%25A7%25D1%25A7%3F%3F%3F%3FnHlFj&hl=en"
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
