<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
      <!-- View para renderizar o login -->
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginLayout"
};
</script>

<style scoped>
body {
  overflow: hidden;
}
</style>
