<template>
  <div class="container">
    <iframe class="responsive-iframe" :src="url"></iframe>
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
        this.timer = setInterval(this.fetchURL, 12000)
    },

    methods: {
        fetchURL() {
            axios.get(`http://sm.test/request`)
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