<script setup lang="ts">

import IconClose from '@/components/icons/IconClose.vue'
import { ref, computed } from 'vue'

const emit = defineEmits(["close", "start"]);
const count = ref<number | null>(null)

/**
 * A computed property to check if `count` is valid:
 * - Must not be null
 * - Must be between 20 and 100 (inclusive)
 */
const isValidCount = computed(() => {
  return count.value !== null && count.value >= 20 && count.value <= 100
})

function closeModal() {
  emit("close");
}

/**
 * Called when user presses "Start"
 * If the count is valid, emit the value and close the modal
 */
function handleStart() {
  if (isValidCount.value) {
    emit("start", count.value) // pass the value to the parent
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
     <div class="header">
       <h4 class="title">How many people?</h4>
       <IconClose class="close" @click="closeModal"/>
     </div>

      <div class="content">
        <label for="people-input">Enter a number of how many people you want to add to the list.</label>
        <input type="number" min="20" max="100" id="people-input"
               v-model.number="count"
               placeholder="20-100"
               :class="{ 'error-input': count !== null && !isValidCount }"
        />

        <!-- Show error message if the user has entered something invalid -->
        <p v-if="count !== null && !isValidCount" class="error-msg">
          Please enter a valid number between 20 and 100.
        </p>
      </div>

      <div class="footer">
        <button class="cancel-btn" @click="closeModal">Cancel</button>
        <button class="start-btn" :disabled="!isValidCount" @click="handleStart">Start</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 4px 0 #0000001A;
  background-color: #fff0;
  filter: drop-shadow(1px 1px #0000001A);
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position: relative;
  max-width: 437px;
  width: 100%;
  margin: 0 12px;
  border-radius: 5px;
  background-color: #fff;
}

.modal-content .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  border-bottom: 1px solid #CCCCCC;
  padding: 0 20px;
}

.modal-content .header .title {
  font-size: 18px;
  font-weight: 700;
}

.modal-content .header .close {
  cursor: pointer;
}

.modal-content .content {
  padding: 20px 20px 50px 20px;
  border-bottom: 1px solid #CCCCCC;
}

.modal-content .content label {
  font-size: 13px;
  color: #555555;
  padding-bottom: 10px;
}

.modal-content .content input {
  width: 100%;
  border: 1px solid #CCCCCC;
  height: 40px;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  margin-top: 10px;
}

.modal-content .content input:focus-visible {
  outline: none;
}

.modal-content .footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
}

.modal-content .footer .cancel-btn {
  background-color: #EEEEEE;
  font-size: 14px;
  color: #555555;
  font-weight: 700;
  border-radius: 5px;
  border: 1px solid #EEEEEE;
  padding: 12px 22px;
  margin-right: 5px;
  cursor: pointer;
}

.modal-content .footer .start-btn {
  background-color: var(--vt-c-orange);
  font-size: 14px;
  color: #ffffff;
  font-weight: 700;
  border-radius: 5px;
  border: 1px solid var(--vt-c-orange);
  padding: 12px 22px;
  cursor: pointer;
}

.modal-content .footer .start-btn:disabled {
  /* Style for disabled button (e.g. greyed out) */
  opacity: 0.5;
  cursor: not-allowed;
}

/* Red border for invalid input */
.error-input {
  border: 1px solid red !important;
}

/* Error message text styling */
.error-msg {
  color: red;
  margin-top: 0.25rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
