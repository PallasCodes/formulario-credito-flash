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
            :actions="false"
            :disabled="loading"
            class="md:p-8"
            :errors="step.errors"
            :classes="{ form: 'card-shadow form-solicitud' }"
          >
            <div
              v-for="field in step.fields"
              class="form-control"
              :key="field.name"
            >
              <span
                v-if="field.type === 'readonly'"
                :class="field.class"
                class="block"
              >
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
                validation-label="El campo"
              >
                <template #suffixIcon>
                  <div v-if="field.loading">
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5"
                    >
                      <path
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                        class="spinner_aj0A"
                      />
                    </svg>
                  </div>
                </template>
              </FormKit>
            </div>

            <FormKit
              @click="emit('setFormDirection', 'right')"
              type="submit"
              :label="step.btn || `SIGUIENTE`"
              :classes="{
                input: 'w-full block !text-center !justify-center bg-primary',
                outer: '!w-full !max-w-full',
              }"
              :disabled="loading || step.disabled"
            />
          </FormKit>
        </transition>
      </div>
    </section>
  </div>
</template>
