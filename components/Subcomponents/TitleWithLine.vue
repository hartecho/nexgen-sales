
<template>
  <!-- prettier-ignore -->
  <div class="line" :style="{ '--lineColor': lineColor }">
    <div class="title-content" v-if="msg" :style="{ borderColor: borderColor, backgroundColor: backgroundColor, color: textColor, fontFamily: fontFamily, textShadow: textShadow }">{{ msg }}</div>
    <div class="title-image-wrapper" v-if="imgPath" :style="{ backgroundColor: backgroundColor }">
      <img class="title-image" :src="resolvedImgPath()" loading="eager" alt="Not Here"/>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  lineColor: String,
  backgroundColor: String,
  imgPath: String,
  msg: String,
  borderColor: String,
  textColor: String,
  fontFamily: String,
  textShadow: String,
});

const resolvedImgPath = () => "/" + props.imgPath;
</script>

<style scoped>
.line {
  height: 8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2rem 0;
}

.line::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 3px;
  background-color: var(--lineColor);
}

.title-content {
  text-align: center;
  position: absolute;
  z-index: 1;
  padding: 15px;
  border-radius: 40px;
  border: solid 2px;
  font-size: 30px;
  font-weight: bolder;
  font-family: "Montserrat", sans-serif !important;
  backdrop-filter: saturate(75%) blur(10px);
}

.title-image-wrapper {
  height: 7rem;
  width: 7rem;
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  backdrop-filter: saturate(180%) blur(20px);
}

.title-image {
  position: absolute;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  width: 90%;
  object-fit: cover;
  border-radius: 50%;
}

@media (max-width: 768px) {
  /*  ------------  MOBILE  ------------   */
  .title-content {
    font-size: 25px;
  }
  .title-image-wrapper {
    height: 7rem;
    width: 7rem;
  }
}

@media (max-width: 480px) {
  .title-image-wrapper {
    height: 6rem;
    width: 6rem;
  }
}
</style>