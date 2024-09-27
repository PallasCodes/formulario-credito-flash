<script setup lang="ts">
import { FormKit, submitForm } from "@formkit/vue";
import type { FormStep } from "@/interfaces/Form";

const props = defineProps<{ form: FormStep[]; currentStep: number }>();
</script>

<template>
  <div
    class="mx-auto overflow-hidden max-w-md w-full rounded-lg"
    style="padding: 22px"
  >
    <section
      class="w-full flex"
      :style="`transform: translateX(-${
        (currentStep - 1) * 100
      }%); transition: 0.3s;`"
    >
      <FormKit
        v-for="(step, i) in form"
        @submit="$emit('siguiente')"
        type="form"
        #default="{ value }"
        :key="step.title"
        :id="`step-${i + 1}`"
        style="
          width: 100%;
          flex-grow: 0;
          flex-shrink: 0;
          padding: 12px 1.5rem 2px 1.5rem;
          height: min-content;
        "
        :actions="false"
        :style="{
          'box-shadow':
            currentStep === i + 1
              ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
              : '',
        }"
      >
        <div
          v-for="field in step.fields"
          class="form-control"
          :key="field.name"
        >
          <FormKit
            v-model="field.value"
            :type="field.type"
            :label="`${field.label}${
              field.rules?.includes('required') ? '*' : ''
            }`"
            :validation="field.rules"
            :name="field.name"
            :classes="{
              input: 'w-full',
              outer: 'w-full !max-w-[100%]',
              inner: field.type === 'radio' ? 'radio' : '',
            }"
            :options="field.items"
            select-icon="caretDown"
            v-on="field.on || {}"
            :readonly="field.disabled"
            :value="field.value"
            :placeholder="field.placeholder"
          />
        </div>
        <div class="flex justify-end pt-1">
          <FormKit
            v-if="currentStep > 1"
            type="submit"
            label="Anterior"
            :classes="{
              input:
                'bg-transparent border-none shadow-none hover:bg-transparent hover:!text-blue-700 !text-blue-600',
              outer: '!grow-0',
            }"
            @click="$emit('setFormDirection', 'left')"
          />
          <FormKit
            type="submit"
            label="Siguiente"
            :classes="{ outer: '!grow-0' }"
            @click="$emit('setFormDirection', 'right')"
          />
        </div>
      </FormKit>
    </section>
  </div>
</template>
