<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
  data () {
  }
}
</script>

<style scoped>
body {
  overflow: hidden;
}
</style>
