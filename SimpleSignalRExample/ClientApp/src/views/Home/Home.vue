<template>
  <div class="container">
    <div>
    <div class="loader" :style="{ transform:progress }"></div>
    </div>
    <div>
    <div class="loader" :style="{ transform:progress2 }"></div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    position: relative;
    display: grid;
    grid-template: 'loader1' 'loader2';
    width: 100%;
    height: 100%;
  }

  .loader {
    background: blue;
    height: 20px;
  }
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TestHub } from "../../hubs/test.hub";
import { TestHub2 } from "../../hubs/test2.hub";

@Component
export default class App extends Vue {
  public hub: TestHub = new TestHub();
  public hub2: TestHub2 = new TestHub2();

  public progress = "0%";
  public progress2 = "0%";

  public mounted() {
    this.hub = new TestHub();
    this.hub2 = new TestHub2();
    console.log(this.hub, this.hub2)

    this.hub.progressMulti$.subscribe((x) => {
      this.progress = `scaleX(${x.progress}%)`;
    });

    this.hub2.progressMulti$.subscribe((x) => {
      this.progress2 = `scaleX(${x.progress}%)`;
    });

    this.hub.connection.start();
    this.hub2.connection.start();
  }
}
</script>
