<template>
  <div class="container">
    <iframe id="video" class="responsive-iframe" :src="url" frameborder="0"
 allowfullscreen></iframe>
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

        //this.fetchURL();
        this.timer = setInterval(this.fetchURL, 30000)
    },

    methods: {
        fetchURL() {
            axios.get(`http://sm.mswdb.com/request`)
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