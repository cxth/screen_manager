<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
      :width="300"
    >
      <media_asset_component 
        :media_assets="media_assets"
        :selected="selected"
        :links="links"
        :form="form"
        :deleteLink="deleteLink"
        @linkSelect="
          screen=$event,
          clearnewURL($event)"></media_asset_component>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title style="color:#FFA500">Screen Manager</v-toolbar-title> -->
      <v-toolbar-title style="color:#FFF">Screen Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app  
      :width="300"
    >
      
      <v-list>
        <v-list-item @click.stop="left = !left">
          <v-list-item-action>
            <v-icon color="green accent-3">mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color:#00E676">Active Screens</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      
      <outlets_component
        :outlets="outlets"
        :selected="selected"
        :getScreenSched="getScreenSched"
        :getScreenAutologin="getScreenAutologin"
        :getOutlets="getOutlets"
        ></outlets_component>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn 
            class="grey darken-4"
            block
            v-on:click="logout"
          >
            <v-icon left>mdi-logout</v-icon> 
            Logout
          </v-btn>
        </div>
      </template>

    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
      :width="300"
    >
    
    <active_screens_component></active_screens_component>

    </v-navigation-drawer>

    <v-main>
      <v-container
        class="align-start 
               fill-height
               justify-space-between"
        fluid
      >
       <template>
          <v-row 
            align="center"
            justify="center"
            class="mx-auto"
          >
            <v-col>

              <v-card>
                <v-tabs left dense>
                  <v-tab>
                    <v-icon left>mdi-play-box-outline</v-icon>
                    SCREEN
                  </v-tab>
                  <v-tab>
                    <v-icon left>mdi-calendar-clock</v-icon>
                    SCHEDULE
                  </v-tab>
                  <v-tab>
                    <v-icon left>mdi-more</v-icon>
                    INFO
                  </v-tab>
                  <v-tab>
                    <v-icon left>mdi-plus</v-icon>
                    ADD OUTLET
                  </v-tab>
                  <v-tab-item>
                    
                    <screensched_component
                      :selected="selected"
                      :form="form"
                      :clear_URL="clear_URL"
                      :momentNow="momentNow"
                      :resetData="resetData"
                      :getScreenSched="getScreenSched"
                      :getMediaAssets="getMediaAssets"
                      :getLinks="getLinks">
                    </screensched_component>

                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      
                      <calendar 
                        :calendar="calendar"
                        :selected="selected"
                      ></calendar>

                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
          
                    <info_component
                      :screen_autologin="screen_autologin"
                      :screen_now_showing="screen_now_showing"
                      :selected="selected"
                    ></info_component>

                  </v-tab-item>
                  <v-tab-item>

                    <add_outlet_component
                      :getOutlets="getOutlets"
                    ></add_outlet_component>

                  </v-tab-item>
                  
                </v-tabs>
              </v-card> 

            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-main>

    <v-footer
      app
      class="white--text"
    >
      <span>MSW</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import calendar from './CalendarComponent'
import media_asset_component from './MediaAssetsComponent'
import active_screens_component from './ActiveScreensComponent'
import outlets_component from './OutletsComponent'
import screensched_component from './ScreenSchedComponent'
import info_component from './InfoComponent'
import add_outlet_component from './AddOutletComponent'

  export default {
    props: {
      source: String,
    },
    components: {
      calendar,
      media_asset_component,
      active_screens_component,
      outlets_component,
      screensched_component,
      info_component,
      add_outlet_component
    },
    data: () => ({
      screen_autologin: null,
      screen_now_showing: null,
      selected: {
        // media assets
        mediagroup: null,
        link: null,
        link_name: null,
        link_url: null,
        // outlet list
        outlet: null,
        screen: null,
        screen_name: null,
        // schedule
        screen_schedule: null
      },
      outlets: null,
      media_assets: null,
      links: null,
      clear_URL: false,
      newURL_id: null,
      newScreen: null,
      form: {
        is_form_valid: true,
      },
      // Layout
      drawer: null,
      drawerRight: null,
      left: false,
      // Schedule
      calendar: {
        today: '2020-01-01',
        events: []
      }
    }),
    mounted () {
      //this.$refs.calendar.scrollToTime('08:00')
    },
    created () {
      this.$vuetify.theme.dark = true;
      this.getOutlets()
      this.getMediaAssets()
      this.getLinks()
      this.calendar.today = this.momentNow('date');
    },
    methods: {

      clearnewURL(event) {
        this.form.is_form_valid = false
        if (!this.clear_URL) {
          this.clear_URL = true
          return
        }
        if (this.clear_URL) {
          this.clear_URL = false
          return
        }
      },

      getOutlets() {
        axios.get(`${ this.siteURL }/api/screen/all`)
        .then(response => {
            let combined = {};
            response.data.forEach(function (arrayItem) {
              if (!(Object.keys(arrayItem) in combined)) {
                combined[Object.keys(arrayItem)] = Object.values(arrayItem);
              }
              else {
                combined[Object.keys(arrayItem)].push(Object.values(arrayItem)[0]);
              }
            });
            this.outlets = combined;
        })
        .catch(e => {
            this.errors.push(e)
            console.log('error getting outlet list')
        })
      },

      getMediaAssets() {
        axios.get(`${ this.siteURL }/api/media/all`)
          .then(response => {
              this.media_assets = response.data;
          })
          .catch(e => {
              this.errors.push(e)
              console.log('error getting media assets')
          })
      },

      getLinks() {
        axios.get(`${ this.siteURL }/api/l`)
          .then(response => {
            
              let newlinks = {};
              response.data.forEach(function (arrayItem) {
                newlinks[arrayItem.id] = arrayItem;
              });
              this.links = newlinks;
          })
          .catch(e => {
              this.errors.push(e)
              console.log('error getting links')
          })
      },

      getScreenSched: function() {
        axios({
            method: 'get',
            url: `${ this.siteURL }/api/schedule/ss/${ this.selected.screen }`,
        }).then(response => {
            if (response.data)
            {
              this.selected.screen_schedule = response.data;
              this.calendar.events = this.eventsFormat()
              this.screen_now_showing = "No current content";
              if (this.calendar.events.length > 0) 
              {
                this.screen_now_showing = this.calendar.events[this.calendar.events.length - 1].name;
              }
            }
          })
          .catch(e => {
              this.errors.push(e)
              console.log('error getting schedule')
          });
      },

      getScreenAutologin: function() {
        axios({
            method: 'post',
            url: `${ this.siteURL }/api/screen/login`,
            data: {
              screen_id: this.selected.screen
            }
        }).then(response => {
              //console.log(response.data);
              this.screen_autologin = `${ this.siteURL }/client?r=${ response.data }`;
          })
          .catch(e => {
              this.errors.push(e)
              console.log('error getting auto login')
          });
      },

      addLink: function(event) {
        var newlink = null;
        axios({
          method: 'post',
          url: `${ this.siteURL }/api/l`,
          data: {
            media__asset_id: 100,
            name: this.newURL_name,
            url: this.newURL
          }
        }).then(response => {
              alert("Link successfully saved");
              this.newURL_id = response.data;
          })
          .catch(e => {
              this.errors.push(e)
          });
      },

      deleteLink: function(event) {
        if(confirm("DANGER! Are you sure you like to DELETE this link?")) {        
          axios.delete(`${ this.siteURL }/api/l/${ event }`)
          .then(response => {
              alert("link deleted");
              this.getMediaAssets()
              this.resetData()
            })
            .catch(e => {
                this.errors.push(e)
            });
        }
        return;
      },

      resetData: function() {
        this.selected.link = null
        this.selected.link_url = null
        this.selected.link_name = null
        this.selected.mediagroup = null;
      },

      logout: function() {
        if(confirm("Are you sure you like to logout?")){
          axios.get(`${ this.siteURL }/logout`)
            .then(response => {
              location.reload();
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
      },

      // Helpers =================
      momentNow: function(p) {
        if (p) 
        {
          return dayjs().format('YYYY-MM-DD');
        }
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
      },

      trimObj: function(objArr) {
        return Object.assign({}, ...objArr );
      },

      toArray: function(obj) {
        return Object.entries(obj);
      },

      eventsFormat: function() {

        let esched = [];
        this.selected.screen_schedule.forEach(function (val, key, map) {
          var event_name = val[Object.keys(val)].link_name
          var event_start = val[Object.keys(val)].show_datetime
          var event_end = val[Object.keys(val)].expire_datetime
          var entry = {
            name: event_name,
            start: event_start,
            end: event_end
          }
          if (event_end == null)
          {
            delete entry.end;
          }
          esched.push(entry);
        });

        return esched;
      }
    } // methods
  }
</script>