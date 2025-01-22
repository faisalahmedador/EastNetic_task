<script setup lang="ts">
import PeopleTable from '@/components/people-table.vue'
</script>

<template>
  <header class="header">
    <h2>Sorting Training System</h2>
    <button class="action-btn">Start sorting!</button>
  </header>
  <people-table />
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
