<script setup lang="ts">
import { currencyFormat } from '@/utils/currencyFormat'

const creditos: {
  id: number
  amount: number
  date: string
  status: keyof typeof Status
}[] = [
  {
    id: 0,
    amount: 3000,
    date: '2024-10-10',
    status: 'pendiente',
  },
  {
    id: 1,
    amount: 3000,
    date: '2024-10-10',
    status: 'pendiente',
  },
  {
    id: 2,
    amount: 3000,
    date: '2024-10-10',
    status: 'aprobado',
  },
  {
    id: 3,
    amount: 3000,
    date: '2024-10-10',
    status: 'pendiente',
  },
  {
    id: 4,
    amount: 3000,
    date: '2024-10-10',
    status: 'pendiente',
  },
]

const Status = {
  aprobado: { color: 'green-500', name: 'Aprobado' },
  pendiente: { color: 'yellow-500', name: 'Pendiente de aprobación' },
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5 max-w-6xl">
    <div
      v-for="credito in creditos"
      :key="credito.id"
      class="rounded-lg bg-white p-5 shadow-sm cursor-pointer hover:shadow-lg transition-shadow ease-in"
    >
      <h4 class="text-2xl font-medium">
        {{ currencyFormat.format(credito.amount) }}
      </h4>
      <p class="mt-1 text-gray-800">{{ credito.date }}</p>
      <div
        class="inline-block text-sm mt-3 font-medium border-2 rounded-full px-2 py-1"
        :class="`border-${Status[credito.status].color}`"
      >
        <span :class="`text-${Status[credito.status].color}`">
          {{ Status[credito.status].name }}
        </span>
      </div>
    </div>
  </div>
</template>
