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
                // Default site for testing
                //url: 'https://app.mswdb.com/sis/beta/',
                url: 'https://api.mswodds.com/live/stg/view.php?sport=tennis',
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
                if (!(response.data)) 
                {
                    axios.get(`${ this.siteURL }/logout`)
                        .then(response => {
                            location.reload();
                        })
                        .catch(e => {
                            this.errors.push(e)
                        })
                }
                console.log('welcome ' + response.data.screen_id);
                console.log('showing: ' + response.data.show_datetime + ' url: ' + response.data.url);
                this.url = response.data.url
            })
            .catch(e => {
                //this.errors.push(e)
                console.log('im error');
                location.reload();
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