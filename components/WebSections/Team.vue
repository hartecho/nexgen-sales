<template>
  <div class="team-section-wrapper">
    <div class="team-section">
      <div class="header">
        <h4>OUR TEAM</h4>
        <h1>Meet The Experts</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis
          mauris ac enim sagittis dignissim.
        </p>
      </div>

      <div class="team-grid">
        <SubcomponentsTeamMemberCard
          name="Jhon Doe"
          title="CEO Reactive"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          imageSrc="/Member1.png"
        />
        <SubcomponentsTeamMemberCard
          name="Jane Doe"
          title="CTO Reactive"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          imageSrc="/Member2.png"
        />
        <SubcomponentsTeamMemberCard
          name="Jhon Doe"
          title="CEO Reactive"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          imageSrc="/Member3.png"
        />
        <SubcomponentsTeamMemberCard
          name="Jane Doe"
          title="CTO Reactive"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          imageSrc="/Member4.png"
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
</style>
  