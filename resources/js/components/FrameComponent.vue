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
                timer: '',
                media_asset_id: ''
            } 
        },
    
    // Fetches posts when the component is created.
    created() {
      this.fetchURL()
      this.timer = setInterval(this.fetchURL, this.fetchTimeout)
    },
    mounted() {
     
    },
    methods: {
        fetchURL() {
            axios.get(`${ this.siteURL }/request`)
            .then(response => {

                // --- debugging ----
                console.log('fetchURL response: ')
                console.log(response.data);
                return
                //
                // -------------------
            
                if (response.data[0] == 'invalid-user')
                {
                    setTimeout(function() {
                      location.reload();
                    }, 3000)
                }

                if (response.data[0] == 'deactivated-user')
                {
                    setTimeout(function() {
                      window.location.href =`${ this.fetchURL }/deactivated`
                    }, 3000)
                }

                if (response.data[0] == 'no-content')
                {
                  console.log('geturl is empty'); // schedule has been deleted
                  var sched = {
                    screen_id: 'default',
                    show_datetime: 'no-sched',
                    expire_datetime: 'no-sched',
                    id: 999, //not working if null
                    url: '../img/default.jpg'
                  }
                }
                else
                {
                  var sched = response.data[0];
                }
                         
                // console.log('welcome ' + sched.screen_id);
                // console.log('showing: ' + sched.show_datetime + ' - ' + sched.expire_datetime
                //         + ' url: (' + sched.id + ') ' + sched.url);

                console.log('current url id ' + this.url_id)
                console.log('sched url id ' + sched.id)

                this.media_asset_id = sched.media__asset_id
                console.log('media asset id ' + this.media_asset_id)


                if (sched.id && sched.id != this.url_id) 
                {
                    this.url_id = sched.id
                    this.url = sched.url
                }
                else
                {
                    console.log(`(${ sched.id }) no change in content`);
                } 
                
                // -------------------
                 // 1 = live sports
                // console.log('IM MOUNTED')
                // console.log(this.media_asset_id)
                // if (this.media_asset_id == 1) {
                //     setInterval(function() {
                //       window.location.reload();
                //   }, 4000); // 120000 2 minutes
                //   console.log('I should be reloading...');
                // }
                // else {
                //   console.log('NO RELOAD...');
                // }
                // ----------------------

            })
            .catch(e => {

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