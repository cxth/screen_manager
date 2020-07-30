<template>
  <iframe
    v-resize="{ log: true }"
    width="100%"
    height="100%"
    frameborder="0"
    :src="url"  
    allow="autoplay; fullscreen"
    id="mswsm" 
    class="responsive-iframe"
  ></iframe>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
            return {
                // temp site for testing 
                url_id: null,
                //url: `../img/default-maintenance.png`,
                url: `../img/default.jpg`,
                timer: ''
            } 
        },
    
    // Fetches posts when the component is created.
    created() {
        this.fetchURL()
        this.timer = setInterval(this.fetchURL, 12000)
        // 12000 12 seconds
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
                            //location.reload();
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
                    if (sched.id && sched.id != this.url_id) 
                    {
                        this.url_id = sched.id
                        this.url = sched.url
                    }
                    else
                    {
                        console.log(`(${ sched.id }) no change in content`);
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
                //location.reload();
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