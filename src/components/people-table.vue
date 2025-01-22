<script lang="ts" setup>
import { ref } from 'vue'

const peopleTable = ref([
  {
    id: 1,
    name: 'People',
    email: 'people@gmail.com',
    potatoes: 10,
  },

  {
    id: 2,
    name: '2 People',
    email: '2people@gmail.com',
    potatoes: 12,
  },

  {
    id: 3,
    name: '3 People',
    email: '3people@gmail.com',
    potatoes: 13,
  },

  {
    id: 4,
    name: '4 People',
    email: '4people@gmail.com',
    potatoes: 14,
  },
])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Name</th>
        <th>Potatoes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(people, index) of peopleTable" :key="index">
        <td>{{ index + 1 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
