<template>
  <div>
    <h1>Simple YouTube Player Test</h1>
    <div id="videoPlayer"></div>
    <!-- YouTube player container -->
  </div>
</template>
  
  <script setup>
import { onMounted } from "vue";

const initYouTubePlayer = async () => {
  // Load the YouTube IFrame API
  await new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(); // YouTube API already loaded
    } else {
      // Load YouTube API if it's not loaded yet
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube API is ready");
        resolve();
      };
    }
  });

  // Create the YouTube player
  const player = new YT.Player("videoPlayer", {
    videoId: "8IlJ3v8I4Z8", // Use any video ID you want to test
    events: {
      onReady: (event) => {
        console.log("Player is ready:", event);

        // Play the video programmatically to test state changes
        event.target.playVideo();
      },
      onStateChange: (event) => {
        console.log("Player state changed:", event.data);
        handleStateChange(event);
      },
    },
  });

  console.log("YouTube Player instance created:", player);
};

// Function to handle YouTube state changes
const handleStateChange = (event) => {
  if (typeof YT !== "undefined" && YT.PlayerState) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        console.log("Video is playing");
        break;
      case YT.PlayerState.PAUSED:
        console.log("Video is paused");
        break;
      case YT.PlayerState.ENDED:
        console.log("Video has ended");
        break;
      default:
        console.log("Other state change: ", event.data);
    }
  } else {
    console.error("YT PlayerState is not defined.");
  }
};

// Run the player initialization on mount
onMounted(() => {
  initYouTubePlayer();
});
</script>
  
  <style scoped>
#videoPlayer {
  width: 100%;
  height: 480px;
  background-color: #000;
}
</style>
  