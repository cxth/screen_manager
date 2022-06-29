<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-toolbar
      color="teal"
      dark
    >
      <v-list-item-icon>
        <v-icon>mdi-cast-connected</v-icon>
      </v-list-item-icon>
      <v-toolbar-title>Active Screens</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <template v-if="outlets.length">
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item 
            v-for="(outlet, i) in outlets"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="outlet.outlet_name"></v-list-item-title>
              <v-list-item
                  v-for="(screen, i) in screens[outlet.outlet_name]"
                  :key="i"
                >
                <v-list-item-icon>
                  <v-icon color="green accent-3">mdi-checkbox-blank-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle v-text="screen.description"></v-list-item-subtitle>
              </v-list-item>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
    <template v-else>
      <v-card>
        <p class="text-center pa-5" v-text="no_content"></p>
      </v-card>
    </template>
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    props: ['getAuth'],
    data: () => ({
      no_content: 'No active screen',
      screens: [],
      outlets: [],
      timer: ''
    }),
    created: function () {
    },
    mounted: function () {
      // check every 5 minutes - 300000
      // check every minutes - 60000
      this.getActiveScreens()
      window.setInterval(() => {
          this.getActiveScreens();
      },300000);
    },
    methods: {
      getActiveScreens: function(event) {

        axios.get(`${ this.siteURL }/api/screen/active`,this.getAuth)
        .then(response => {
            if (response.data.length > 0) {
              let data = []
              let active_outlets = []
              let active_screens = []
              response.data.forEach(function (val, key, map) {

                if(typeof active_screens[val.outlet_name] === 'undefined') {
                    active_screens[val.outlet_name] = [val]
                    active_outlets.push(val);
                }
                else {
                  data = active_screens[val.outlet_name];
                  active_screens[val.outlet_name] = []
                  active_screens[val.outlet_name] = [...data, ...[val]]
                }

              });
              this.outlets = active_outlets
              this.screens = active_screens
            }
            else
            {
              console.log('no active screen')
            }
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