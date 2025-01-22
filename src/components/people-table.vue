<script lang="ts" setup>
import { ref, watch } from 'vue'

export type PeopleTableData = {
  email: string;
  name: string;
  potatoes: number;
  tags: string[],
  location: string;
}

// Define props
const props = defineProps({
  count: {
    type: Number,
    default: null
  }
})
const peopleTable = ref<PeopleTableData[]>()

const nameSuffix = ["ahmed", "hossain", "hasan", "lopez", "bari", "akter", "chowdhury", "sen", "mollick"]
const namePrefix = ["faisal", "fakir", "janifer", "cristopher", "tausif", "susmita", "momtaz", "koyel", "dipu"]
const mailSyntax = ["gmail", "yahoo", "outlook", "hotmail"]
const locations = ['dhaka', 'khulna', 'lithunia']
const possibleTags = ["vip", "silver", "bronze", "visitor", "merchant"]

// Whenever "count" changes, generate new people, etc.
watch(() => props.count, (newCount) => {
  if (newCount) {
    generatePeople(newCount)
  } else {
    peopleTable.value = []
  }
})

function generatePeople(count: number) {
  peopleTable.value = []

  // Track used potato counts if you want them unique
  const usedPotatoCounts = new Set<number>()

  for (let i = 0; i < count; i++) {
    // Pick a random first name & last name
    const firstName = namePrefix[Math.floor(Math.random() * namePrefix.length)]
    const lastName = nameSuffix[Math.floor(Math.random() * nameSuffix.length)]

    // Build a random email
    const domain = mailSyntax[Math.floor(Math.random() * mailSyntax.length)]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}.com`

    // Combine for a full display name
    const fullName = `${firstName} ${lastName}`

    // Generate a unique potatoes count (from 1..999)
    let potatoes
    do {
      potatoes = Math.floor(Math.random() * 999) + 1
    } while (usedPotatoCounts.has(potatoes))
    usedPotatoCounts.add(potatoes)

    // Random location
    const location = locations[Math.floor(Math.random() * locations.length)]

    // Random tags: pick 0..X tags from `possibleTags`
    const chosenTags: string[] = []
    const numberOfTags = Math.floor(Math.random() * 3) // up to 2 tags, for example
    for (let t = 0; t < numberOfTags; t++) {
      const randomTag = possibleTags[Math.floor(Math.random() * possibleTags.length)]
      if (!chosenTags.includes(randomTag)) {
        chosenTags.push(randomTag)
      }
    }

    // Push the random record
    peopleTable.value.push({
      email,
      name: fullName,
      potatoes,
      tags: chosenTags,
      location
    })
  }
}
</script>

<template>
  <section class="people-list">
    <h4 class="summary-text">
      {{ props.count > 0 ? props.count + ' people in the list' : 'No people selected' }}
    </h4>
    <div>
      <table class="people-list-table" v-if="props.count > 0">
        <thead>
        <tr class="people-list-table-head">
          <th>Email</th>
          <th>Potatoes</th>
          <th>Tags</th>
          <th>Full name</th>
          <th>Location</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(people, index) of peopleTable" :key="index" class="people-list-item">
          <td>{{ people.email }}</td>
          <td>{{ people.potatoes }}</td>
          <td>{{ people.tags }}</td>
          <td>{{ people.name }}</td>
          <td>{{ people.location }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
  .people-list {
    width: 100%;
    margin-top: 36px;
    box-shadow: 0 0 4px 0 #0000001A;
    background-color: #fff0;
    filter: drop-shadow(1px 1px #0000001A);
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    padding: 16px 0;
    min-height: 400px;
  }

  .summary-text {
    float: right;
    padding: 16px;
    font-weight: bold;
    font-size: 14px;
  }

  .table-responsive {
    width: 100%;
    overflow-x: auto; /* This allows horizontal scroll if the table is too wide */
  }

  /* Optional: Make sure the table spans the full width inside the wrapper */
  .people-list-table {
    width: 100%;
    border-collapse: collapse; /* or your preferred spacing */
  }

  .people-list-table th {
    border-top: 1px solid #DDDDDD;
    font-size: 14px;
    color: #555555;
  }

  .people-list-table th:first-child, .people-list-table td:first-child {
    border-right: 1px solid #DDDDDD;
  }

  .people-list-table th,
  .people-list-table td {
    padding: 16px 20px;
    text-align: left; /* or right/center, per your design */
    border-bottom: 1px solid #DDDDDD;
  }

  /* Media query for smaller devices: adjust font sizes, padding, etc. */
  @media screen and (max-width: 768px) {
    .people-list-table th,
    .people-list-table td {
      padding: 8px;
    }
  }
</style>
