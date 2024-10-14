<template>
  <div class="door-to-door-training-layout">
    <div class="content">
      <h4>JOIN OUR TEAM OF EXPERTS</h4>
      <h1>Become a Door-to-Door Sales Rep</h1>
      <p>
        Take control of your income by joining our team of highly motivated
        door-to-door sales representatives. Learn how you can achieve financial
        freedom, enjoy uncapped commissions, and build a successful career in
        sales with us.
      </p>
      <div class="CTA">
        <NuxtLink to="/apply" class="learn-more">
          <img src="/Graphics/LinkIcon.svg" alt="" />
          APPLY NOW
        </NuxtLink>
        <div class="contact">
          <span class="green">Call Us</span>
          <p>+1 (949) 547-3815</p>
        </div>
      </div>
    </div>

    <div class="stats">
      <div class="projects">
        <h1>$100K +</h1>
        <p>Potential Annual Earnings</p>
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
  padding: 6rem 2rem;
  max-width: 1200px;
  color: white;
  width: 100%;
  text-shadow: 2px 2px 2px black;
  flex-wrap: wrap;
}

.content {
  max-width: 500px;
  flex: 1;
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
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.learn-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #0197b2;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-shadow: none;
}

.learn-more img {
  width: 1rem;
  height: 1rem;
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.contact span {
  color: #0197b2;
  font-size: 1.2rem;
  font-weight: bold;
}

.contact p {
  font-size: 16px;
  margin: 0;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
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

.guarantee h1,
.guarantee p {
  text-align: right;
}

.projects p,
.guarantee p {
  font-size: 16px;
}

a {
  transition: all 0.2s ease-in-out;
}

a:hover {
  background: white;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .CTA {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .contact {
    display: none;
  }

  .door-to-door-training-layout {
    flex-direction: column;
    align-items: flex-start;
    padding: 4rem 1rem;
  }

  .content {
    max-width: 100%;
    text-align: center;
  }

  .stats {
    align-items: flex-start;
    margin-top: 2rem;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .content h1 {
    font-size: 36px;
  }

  .content h4 {
    font-size: 16px;
  }

  .content p {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  /* .door-to-door-training-layout {
    align-items: flex-start;
  } */

  .learn-more {
    /* width: 100%; */
    text-align: center;
  }

  .content h1 {
    font-size: 30px;
  }

  .projects h1,
  .guarantee h1 {
    font-size: 40px;
  }

  .projects p,
  .guarantee p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .door-to-door-training-layout {
    padding: 3rem 1rem;
  }

  .content h1 {
    font-size: 24px;
  }

  .content p {
    font-size: 14px;
  }

  .projects h1,
  .guarantee h1 {
    font-size: 36px;
  }

  .projects p,
  .guarantee p {
    font-size: 13px;
  }

  .learn-more {
    font-size: 14px;
  }

  .contact span {
    font-size: 1rem;
  }

  .contact p {
    font-size: 14px;
  }
}
</style>
