<template>
  <div class="container">
    <iframe class="responsive-iframe" :src="url"></iframe>
  </div>
</template>

<script>
export default {
    data: function() {
            return {
                url: 'https://app.mswdb.com/sis/beta/'
            } 
        }
}
</script>

<style>

</style>