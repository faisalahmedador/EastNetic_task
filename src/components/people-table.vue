<script lang="ts" setup>
import { ref, watch } from 'vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { generatePeople } from '@/utils/generatePeople.ts'

export type PeopleTableData = {
  email: string;
  name: string;
  potatoes: number;
  tags: string[],
  location: string;
  checked?: boolean;
}

// Define props
const props = defineProps({
  count: {
    type: Number,
    default: null
  }
})
const peopleTable = ref<PeopleTableData[]>()



// Whenever "count" changes, generate new people, etc.
watch(() => props.count, (newCount) => {
  if (newCount) {
    peopleTable.value = generatePeople(newCount)
  } else {
    peopleTable.value = []
  }
})

const visibleTags = (tags) => {
  return tags.slice(0, 2)
}

// Drag and drop logic
const draggingItem = ref<PeopleTableData | null>(null);

const handleDragStart = (event, person) => {
  draggingItem.value = person;
  event.dataTransfer.effectAllowed = "move";
};

const handleDragOver = (event) => {
  event.preventDefault(); // Allows dropping
};

const handleDrop = (event, targetPerson) => {
  event.preventDefault();
  if (!draggingItem.value) return;

  if (!targetPerson?.checked) return;

  const fromIndex = peopleTable.value!.findIndex((p) => p === draggingItem.value);
  const toIndex = peopleTable.value!.findIndex((p) => p === targetPerson);

  if (fromIndex !== -1 && toIndex !== -1) {
    const updatedList = [...peopleTable.value];
    const droppableItem = updatedList[toIndex];
    updatedList.splice(fromIndex, 1, droppableItem);
    updatedList.splice(toIndex, 1, draggingItem.value);
    peopleTable.value = updatedList;
  }

  draggingItem.value = null; // Reset dragging item
};


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
        <tr
          v-for="(people, index) of peopleTable"
          :key="index"
          class="people-list-item"
          :draggable="people.checked"
          @dragstart="handleDragStart($event, people)"
          @dragover="handleDragOver"
          @drop="handleDrop($event, people)"
          :class="{'checked-background': people?.checked}"
        >
          <td>
            <div class="email-section">
              <div class="email-section-content">
                <label class="custom-checkbox">
                  <input type="checkbox" v-model="people.checked">
                  <span class="checkmark"></span>
                </label>
                <p>{{ people.email }}</p>
              </div>
              <div
                class="drag-handle"
                @mousedown.prevent
                @dragstart="handleDragStart($event, people)"
                draggable="true"
              >
                <IconArrow />
              </div>
            </div>
          </td>
          <td>{{ people.potatoes }}</td>
          <td>
              <div class="tags-container">
                <span v-for="(tag, tagIndex) in visibleTags(people.tags)" :key="tagIndex" class="tag-chip">
                  {{tag}}
                </span>
                <span v-if="people.tags.length > 2" class="tag-chip-extra">
                  +{{ people.tags.length - 2 }}
                </span>
              </div>
          </td>
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

  .people-list-item .email-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .people-list-item .email-section .email-section-content {
    display: flex;
    align-items: center;
  }

  .people-list-item .email-section .email-section-content p {
    margin-left: 20px;
    margin-bottom: 0;
  }

  .custom-checkbox {
    position: relative;
    display: inline-block;
    width: 18px; /* Set the size */
    height: 18px;
    margin-right: 10px; /* Space between checkbox and email */
  }

  .custom-checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0; /* Hide the default checkbox */
    width: 0;
    height: 0;
  }

  .custom-checkbox .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #ffffff; /* Background of the checkbox */
    border: 1px solid #ddd; /* Border color */
    border-radius: 5px; /* Make it round */
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  /* Style when the checkbox is checked */
  .custom-checkbox input[type="checkbox"]:checked + .checkmark {
    background-color: var(--vt-c-orange); /* Green color for checked */
    border-color: var(--vt-c-orange);
  }

  .custom-checkbox .checkmark::after {
    content: '';
    position: absolute;
    display: none;
    left: 6px;
    top: 3px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  /* Show the checkmark when checked */
  .custom-checkbox input[type="checkbox"]:checked + .checkmark::after {
    display: block;
  }
  .people-list-table th,
  .people-list-table td {
    padding: 16px 20px;
    text-align: left; /* or right/center, per your design */
    border-bottom: 1px solid #DDDDDD;
  }

  .tags-container {
    display: flex;
    gap: 8px; /* Space between chips */
    flex-wrap: wrap; /* Allows wrapping to the next line if tags overflow */
  }

  .tag-chip {
    background-color: #EEEEEE; /* Light background for the chip */
    color: #555555; /* Text color */
    padding: 4px 8px; /* Space inside the chip */
    border-radius: 16px; /* Rounded corners */
    font-size: 13px; /* Adjust the font size */
    line-height: 1.5; /* Line height for readability */
    display: inline-block; /* Makes each tag an inline-block element */
    border: 1px solid #ddd; /* Optional: Border for better visual separation */
    cursor: default;
  }

  .tag-chip-extra {
    padding-top: 5px;
    color: #555555;
    font-size: 13px;
  }

  .tag-chip:hover {
    background-color: #e0e0e0; /* Slight hover effect */
  }

  .people-list-item[draggable="true"] {
    cursor: grab;
  }

  .people-list-item[draggable="true"]:active {
    cursor: grabbing;
    background-color: #f0f8ff; /* Highlight while dragging */
  }

  .drag-handle {
    cursor: grab;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }

  .checked-background {
    background-color: #EEEEEE;
  }

  /* Media query for smaller devices: adjust font sizes, padding, etc. */
  @media screen and (max-width: 768px) {
    .people-list-table th,
    .people-list-table td {
      padding: 8px;
    }
  }
</style>
