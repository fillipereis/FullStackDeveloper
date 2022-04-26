<template>
  <div class="fullscreen bg-grey text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2">
        OPS! PÁGINA NÃO ENCONTRADA...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="dark"
        unelevated
        to="/"
        label="VOLTAR"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
