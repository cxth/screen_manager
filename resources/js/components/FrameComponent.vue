<template>
  <div class="container">
    <iframe class="responsive-iframe" :src="url" frameborder="0" allow="autoplay; fullscreen"></iframe>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
            return {
                url: 'https://app.mswdb.com/sis/beta/',
                timer: ''
            } 
        },
    
    // Fetches posts when the component is created.
    created() {
        this.timer = setInterval(this.fetchURL, 12000)
        //console.log('global var: ' + `${ this.siteURL }/request`);
        // 12000 seconds
        // 300000 5 minutes
    },

    methods: {
        fetchURL() {
            axios.get(`${ this.siteURL }/request`)
            .then(response => {
                console.log(response.data);
                this.url = response.data
            })
            .catch(e => {
                this.errors.push(e)
            })
        },
        cancelAutoUpdate() { clearInterval(this.timer) }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}


</script>

<style>

</style>