<template>
  <div class="container">
    <iframe class="responsive-iframe" :src="url" frameborder="0" allow="autoplay; fullscreen" id="mswsm" type="text/html"></iframe>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
            return {
                // temp site for testing 
                url: `${ this.siteURL }/img/default-maintenance.png`,
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
                //console.log(response.data);
                var sched = response.data[0];
                if (sched == "invalid-user")
                {
                    //console.log("im invalid user");
                    axios.get(`${ this.siteURL }/logout`)
                        .then(response => {
                            location.reload();
                        })
                        .catch(e => {
                            this.errors.push(e)
                        })
                }
                if (sched) 
                {
                    console.log('welcome ' + sched.screen_id);
                    console.log('showing: ' + sched.show_datetime + ' - ' + sched.expire_datetime
                            + ' url: (' + sched.id + ') ' + sched.url);
                    if (sched.url) 
                    {
                        this.url = sched.url
                    }        
                }
                else
                {
                    console.log('geturl is empty');
                }
                
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