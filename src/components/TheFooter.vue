<script setup lang="ts">
import { ref } from 'vue'
const year = ref(new Date().getFullYear())
</script>

<template>
  <footer style="background: #1e2452" class="text-white lg:px-0 px-10">
    <div
      class="flex justify-center w-full mx-auto py-12 md:py-14 lg:py-32 flex-col md:flex-row md:max-w-[1080px]"
    >
      <div class="md:w-1/3">
        <h3 class="text-2xl lg:text-[42px] lg:mb-[15px] mb-2 font-bold">
          800 500 91 95
        </h3>
        <a href="" class="font-weight-bold link lg:text-[15px] text-sm"
          >micredito@intermercado.com.mx</a
        >
      </div>
      <div class="md:w-1/3 md:my-0 my-8 sm:my-20 md:pr-10 lg:pr-[60px]">
        <ul
          class="lg:text-[15px] text-sm flex flex-col gap-1"
          style="line-height: 27px"
        >
          <li>
            <a href="" class="link">Buró de Entidades Financieras</a>
          </li>
          <li><a href="" class="link">Aviso de privacidad </a></li>
          <li>
            <a href="" class="link"
              >Unidad Especializada de Atención a Usuarios</a
            >
          </li>
          <li>
            <a href="" class="link">Registro de Despachos de Cobranza</a>
          </li>
          <li><a href="" class="link">Trabaja con nosotros</a></li>
          <li><a href="" class="link">Despacho de Cobranza</a></li>
        </ul>
      </div>
      <div class="md:w-1/3 lg:pr-[60px]">
        <ul class="text-sm flex flex-col gap-1" style="line-height: 27px">
          <li>
            <a href="" class="link"
              >Comisión Nacional para la Protección y Defensa de los Usuarios de
              Servicios Financieros</a
            >
          </li>
          <li><a href="" class="link">Términos y condiciones</a></li>
          <li><a href="" class="link">Productos y comisiones</a></li>
          <li><a href="" class="link">Derechos ARCO</a></li>
        </ul>
      </div>
    </div>
    <hr class="border-1 border-gray-600" />
    <div
      class="w-full md:max-w-[1080px] mx-auto py-[30px] text-[#8e8f9b] flex sm:justify-between lg:text-[15px] text-sm items-center sm:items-end flex-col md:flex-row"
    >
      <span class="font-semibold max-h-min text-xs sm:text-base"
        >© {{ year }} Intermercado es una marca de GB Plus S.A. de C.V. SOFOM
        E.N.R. Todos los derechos reservados</span
      >
      <div class="flex items-center gap-4 my-4 sm:my-0">
        <i class="fa-brands fa-whatsapp"></i>
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-solid fa-play"></i>
        <i class="fa-brands fa-instagram"></i>
      </div>
      <i class="fa-solid fa-chevron-up text-lg cursor-pointer" id="goUp"></i>
    </div>
  </footer>
</template>
