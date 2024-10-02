<script setup lang="ts">
import { MessageColorHex, MessageType } from "@/utils/message";
import { useToastsStore } from "@/stores/toasts";

const toastsStore = useToastsStore();
</script>

<template>
  <section id="messages">
    <div
      v-for="(message, i) in toastsStore.toasts"
      :key="message.id"
      class="message"
      :style="{ backgroundColor: MessageColorHex[message.type] }"
    >
      <svg
        v-if="message.type === MessageType.ERROR"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 mr-3"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>

      <svg
        v-if="message.type === MessageType.WARNING"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 mr-3"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <svg
        v-if="message.type === MessageType.SUCCESS"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 mr-3"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <span>
        {{ message.text }}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4 text-gray-200 cursor-pointer ml-8"
        @click="() => toastsStore.removeToast(message.id)"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  </section>
</template>

<style>
#messages {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.message {
  padding: 10px 16px;
  color: white;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  font-weight: 500;
}
</style>
