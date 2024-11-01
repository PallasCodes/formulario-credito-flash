<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import type { FormStep } from '@/interfaces/Form'
import { useAppState } from '@/stores/appState'
import { storeToRefs } from 'pinia'

defineProps<{
  form: FormStep[]
  currentStep: number
}>()

const appState = useAppState()
const { loading } = storeToRefs(appState)
const emit = defineEmits(['siguiente', 'setFormDirection'])

function handleSubmit(step: FormStep) {
  if (step.errors) {
    if (!step.errors.length) emit('siguiente')
  } else {
    emit('siguiente')
  }
}
</script>

<template>
  <div class="mx-auto overflow-hidden max-w-lg w-full rounded-lg md:p-[22px]">
    <section>
      <div v-for="(step, i) in form">
        <transition
          enter-active-class="duration-500 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <FormKit
            v-if="currentStep === i + 1"
            @submit="() => handleSubmit(step)"
            type="form"
            :key="step.title"
            :id="`step-${i + 1}`"
            style="
              width: 100%;
              flex-grow: 0;
              flex-shrink: 0;
              padding: 1rem 2rem 12px 2rem;
              height: min-content;
              position: relative;
            "
            :actions="false"
            :style="{
              'box-shadow':
                currentStep === i + 1
                  ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                  : '',
            }"
            :disabled="loading"
            class="md:p-8"
            :errors="step.errors"
          >
            <div
              v-if="loading"
              class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white opacity-40 z-10"
            >
              <img src="/loading.gif" class="block w-28 h-28 z-10" />
            </div>

            <div
              v-for="field in step.fields"
              class="form-control"
              :key="field.name"
            >
              <span v-if="field.type === 'readonly'" :class="field.class">
                {{ field.label }}
              </span>
              <FormKit
                v-else
                v-model="field.value"
                v-bind="field"
                v-on="field.on || {}"
                :validation="field.rules"
                :name="field.name"
                :classes="{
                  input: { 'w-full': true, uppercase: field.uppercase as boolean },
                  outer: 'w-full !max-w-[100%]',
                  inner: field.type === 'radio' ? 'radio' : '',
                }"
                :options="field.items"
                select-icon="caretDown"
                :readonly="field.disabled"
              />
            </div>

            <FormKit
              @click="emit('setFormDirection', 'right')"
              type="submit"
              :label="step.btn || `SIGUIENTE`"
              :classes="{
                input: 'w-full block !text-center !justify-center bg-primary',
                outer: '!w-full !max-w-full',
              }"
              :disabled="loading"
            />
          </FormKit>
        </transition>
      </div>
    </section>
  </div>
</template>
