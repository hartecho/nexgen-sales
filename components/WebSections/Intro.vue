<template>
  <div class="door-to-door-training-layout">
    <div class="content">
      <h4>WE TRAIN PROFESSIONALS</h4>
      <h1>Door-to-Door Sales Training</h1>
      <p>
        Master the art of door-to-door sales with our comprehensive training
        platform. Learn proven techniques, overcome objections, and boost your
        sales performance with expert guidance.
      </p>
      <div class="CTA">
        <button class="learn-more">
          <img src="/Graphics/LinkIcon.svg" alt="" />
          GET STARTED
        </button>
        <div class="contact">
          <span class="green">Call Us</span>
          <p>+123 456789</p>
        </div>
      </div>
    </div>

    <div class="stats">
      <div class="projects">
        <h1>1000 +</h1>
        <p>Sales Professionals Trained</p>
      </div>
      <div class="guarantee">
        <h1>98 %</h1>
        <p>Success Rate</p>
      </div>
    </div>
  </div>
</template>
    
  <script>
export default {
  name: "DoorToDoorTrainingLayout",
};
</script>
    
  <style scoped>
.door-to-door-training-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12rem 2rem;
  max-width: 1200px;
  color: white;
  width: 100%;
  text-shadow: 2px 2px 2px black;
}

.content {
  max-width: 500px;
}

.content h4 {
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 10px;
  color: white;
  text-shadow: 1px 1px 2px black;
}

.content h1 {
  font-size: 45px;
  margin-bottom: 20px;
}

.content p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
}

.CTA {
  display: flex;
  gap: 2rem;
  height: 3rem;
}

img {
  height: 15px;
  width: 15px;
}

.learn-more {
  background-color: #0197b2;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.contact span {
  color: #0197b2;
  font-size: 1.2rem;
  font-weight: bold;
}

.contact p {
  font-size: 16px;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.projects,
.guarantee {
  margin-bottom: 50px;
}

.projects h1,
.guarantee h1 {
  font-size: 50px;
  margin: 0;
}

.projects p,
.guarantee p {
  font-size: 16px;
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  background: white;
  /* transform: scale(1.01); */
}
</style>
  