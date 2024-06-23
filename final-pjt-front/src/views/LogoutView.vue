<template>
  <div></div>
</template>

<script>
export default {
name: 'LogOut',
methods: {
  logout() {
    this.$store.dispatch('account/logout')
  }
},
created() {
  this.logout()
}
}
</script>

<style>

</style>