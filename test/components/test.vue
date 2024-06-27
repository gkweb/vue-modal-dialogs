<template>
  <div class="test">
    <span class="title">{{ title }}</span>
    <span class="content">{{ content }}</span>
    <button
      id="resolve"
      @click="$close(title)"
    />
    <button
      id="reject"
      @click="$error(title)"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({name: 'DialogSpec'})
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
