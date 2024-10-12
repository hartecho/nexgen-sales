<template>
  <div class="stats-section-wrapper">
    <div class="stats-section">
      <div class="stat-item">
        <h2>200+</h2>
        <p>Clients Trained</p>
      </div>
      <div class="stat-item">
        <h2>1,800+</h2>
        <p>Sales Achievements</p>
      </div>
      <div class="stat-item">
        <h2>100%</h2>
        <p>Satisfaction Guarantee</p>
      </div>
      <div class="stat-item">
        <h2>10+</h2>
        <p>Team Experts</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.stats-section-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  background-color: #0197b2;
  color: white;
  text-align: center;
  width: 100%;
}

.stats-section {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap; /* Allows wrapping for smaller screens */
}

.stat-item {
  flex: 1;
  min-width: 10rem; /* Prevents items from shrinking too small */
  margin: 1rem 0;
}

.stat-item h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.stat-item p {
  font-size: 1rem;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stats-section {
    flex-direction: column;
    align-items: center;
  }

  .stat-item {
    margin: 1rem 0;
  }

  .stat-item h2 {
    font-size: 2rem;
  }

  .stat-item p {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .stat-item h2 {
    font-size: 1.8rem;
  }

  .stat-item p {
    font-size: 0.85rem;
  }
}
</style>
