<template>
  <div id="sonic_loading"></div>
</template>

<script>
  import 'sonic.js'
  import theme from '@/utils/theme'

  export default {
    mounted() {
      const sonic = new Sonic({

        width: 100,
        height: 100,

        stepsPerFrame: 4,    // best between 1 and 5
        trailLength: 0.9,    // between 0 and 1
        pointDistance: 0.01, // best between 0.01 and 0.05
        fps: 20,

        backgroundColor: '#FFF',
        fillColor: theme.get(),

        path: [
          ['arc', 50, 50, 30, 0, 360]
        ],

        step: function (point, index) {
          var sizeMultiplier = 7;
          this._.beginPath();
          this._.moveTo(point.x, point.y);
          this._.arc(
            point.x, point.y,
            index * sizeMultiplier, 0,
            Math.PI * 2, false
          );
          this._.closePath();
          this._.fill();
        }
      });
      const sonicBox = document.querySelector('#sonic_loading');
      sonicBox.appendChild(sonic.canvas);
      sonic.play();
    }
  }
</script>

<style scoped>
  #sonic_loading {
    text-align: center;
    height: 100px;
  }
</style>
