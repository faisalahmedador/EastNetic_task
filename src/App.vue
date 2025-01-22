<script setup lang="ts">
import PeopleTable from '@/components/people-table.vue'
import { ref } from 'vue'
import PeopleSelectModal from '@/components/people-select-modal.vue'
const isModalOpen = ref(false)

const peopleCount = ref<number | null>(null)

// This function is triggered when the modal emits "start"
function handleStart(selectedCount: number) {
  // Save the user's input count to a ref
  peopleCount.value = selectedCount
  isModalOpen.value = false
}
</script>

<template>
  <header class="header">
    <h2>Sorting Training System</h2>
    <button class="action-btn" @click="isModalOpen = true">Start sorting!</button>
  </header>
  <people-table :count="peopleCount"/>
  <people-select-modal v-if="isModalOpen" @close="isModalOpen = false" @start="handleStart"></people-select-modal>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
