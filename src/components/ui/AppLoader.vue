<template>
  <div class="loader">
    <div class="loader__spinner">
      <div
        :class="['spinner-border', 'text-' + theme]"
        role="status"
      >
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoader',
  props: {
    theme: {
      type: String,
      required: false,
      default: 'primary'
    }
  }
}
</script>

<style scoped lang="scss">
.loader {
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
