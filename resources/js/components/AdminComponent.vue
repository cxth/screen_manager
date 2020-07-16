<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-folder-multiple-image</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Media Assets</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list dense>
        <v-list-item link>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(asset,i) in media_assets"
              :key="i"
            >
              <v-expansion-panel-header>{{ asset.name }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense>
                  <v-list-item-group v-model="screen" color="primary">
                    <v-list-item
                      v-for="(link, i) in asset.links"
                      :key="i"
                      v-on:click="linkSelect"
                      :id="asset.name + '.' + link.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="link.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Screen Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app  
    >
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Outlets</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list dense>
        <v-list-item link>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item,name) in outlets"
              :key="name"
            >
              <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense>
                  <!-- <v-list-item-group v-model="screenm" color="primary"> -->
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(screen, screen_i) in item"
                      :key="screen_i"
                      v-on:click="outletSelect"
                      :id="screen.outlet_name + '.' + screen.id"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="screen.admin_icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="screen.id"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
       <template>
          <v-row 
            align="center"
            justify="center"
            class="mx-auto"
            width="600"
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

                  <v-tab-item>
                    <v-row
                      justify="center"
                      align="center"
                      pb="3"
                    >
                      <v-col class="shrink">
                        <v-card
                            class="mx-auto"
                            width="500"
                            height="400"
                            outlined
                          >
                            <v-row no-gutters>
                            
                                <v-col>
                                  <v-list-item three-line>
                                    <v-list-item-content>
                                      <div class="overline mb-4">ASSIGN SCREEN</div>
                                      <v-list-item-subtitle>{{ selected_outlet }}</v-list-item-subtitle>
                                      <v-list-item-title class="headline mb-4">{{ selected_screen }}</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-col>
                                <v-col>
                                  <v-list-item three-line>
                                    <v-list-item-content>
                                      <div class="overline mb-4">ASSIGN CONTENT</div>
                                      <v-list-item-subtitle>{{ selected_mediagroup }}</v-list-item-subtitle>
                                      <v-list-item-title class="headline mb-4">{{ selected_link_name }}</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-col>
                                <v-responsive
                                  width="100%"
                                ></v-responsive>
                            
                            </v-row>
                            <v-row no-gutters 
                                align="center"
                                justify="center"
                            >
                              <v-col cols="22" sm="10">
                                  <v-text-field
                                    label="or enter URL"
                                    outlined
                                    dense
                                    @keyup="disableMedia"
                                    v-model="newURL"
                                    :disabled="!isFormValid"
                                  ></v-text-field>

                              
                                  <v-text-field
                                    label="URL Name"
                                    outlined
                                    dense
                                    v-model="newURL_name"
                                  ></v-text-field>

                                </v-col>
                            </v-row>
                            <v-row no-gutters 
                                align="center"
                                justify="center"
                            >
                              <v-col cols="12" sm="2">
                                  <v-btn rounded color="primary" dark @click="addSched">SAVE</v-btn>
                                </v-col>
                            </v-row>
                          </v-card>
                      </v-col>
                    </v-row>
                    
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      
                      <template>
                      <v-row>
                        <v-col
                          align="center"
                          justify="center"
                        >
                          <v-sheet height="400" width="500">
                            <v-calendar
                              ref="calendar"
                              v-model="todayx"
                              :now="todayx"
                              :value="todayx"
                              :events="events"
                              color="primary"
                              type="day"
                              @click:events="(event)=>dateClick(event,true)"
                            ></v-calendar>
                          </v-sheet>
                        </v-col>
                      </v-row>
                      </template>

                    </v-card>
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
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>



<script>
import axios from 'axios';

  export default {
    props: {
      source: String,
    },
    data: () => ({
      selected_outlet: null,
      selected_screen: null,
      selected_screen_schedule: null,
      selected_mediagroup: null,
      selected_link: null,
      selected_link_name: null,
      selected_link_url: null,

      outlets: null,
      media_assets: null,
      links: null,

      // custom URL
      newURL: null,
      newURL_name: null,
      isFormValid: true,

      // Layout
      drawer: null,
      drawerRight: null,
      screen: 1,
      screenm: null,     
      
      // Schedule
      todayx: '2020-07-16',
      events: [
        {
          name: 'Weekly Meeting',
          start: '2020-07-16 09:00',
          end: '2020-07-16 10:00'
          // YYYY-MM-DD  YYYY-MM-DD hh:mm
        },
        {
          name: 'UK GH',
          start: '2020-07-16 14:30',
          end: '2020-07-16 18:30'
        },
      ],

    }),
    mounted () {
      //this.$refs.calendar.scrollToTime('08:00')
    },
    
    created () {
      this.$vuetify.theme.dark = true;
      this.getOutlets()
      this.getMediaAssets()
      this.getLinks()
    },
    methods: {
      dateClick: function() {
        alert('yes');
      },

      getOutlets() {
          axios.get(`${ this.siteURL }/api/screen/all`)
          .then(response => {
            
              let combined = {};
              response.data.forEach(function (arrayItem) {
                if (!(Object.keys(arrayItem) in combined))
                    combined[Object.keys(arrayItem)] = Object.values(arrayItem);
                combined[Object.keys(arrayItem)].push(Object.values(arrayItem)[0]);
              });
              this.outlets = combined;
        
          })
          .catch(e => {
              this.errors.push(e)
          })
      },

      getMediaAssets() {
        axios.get(`${ this.siteURL }/api/media/all`)
          .then(response => {
          
              // DON'T TOUCH
              this.media_assets = response.data;
              localStorage.name = 'Cxian';

          })
          .catch(e => {
              this.errors.push(e)
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
              console.log('links not working');
              this.errors.push(e)
          })
      },

      getScreenSched: function() {
        axios({
            method: 'get',
            url: `${ this.siteURL }/api/schedule/ss/${ this.selected_screen }`,
        }).then(response => {
            //console.log('schedule for screen ' + this.selected_screen);
            //console.log(response.data);
            if (response.data)
            {
              this.selected_screen_schedule = response.data;
              this.events = this.eventsFormat()
            }

          })
          .catch(e => {
              this.errors.push(e)
          });
      },

      outletSelect: function (event) {
        if (event) {
          var i = event.currentTarget.id.split('.');
          this.selected_outlet = i[0];
          this.selected_screen = i[1];

          this.getScreenSched()
        }

      },

      linkSelect: function (event) {
        // `event` is the native DOM event
        if (event) {
          //console.log(event.currentTarget.id);
          // for UI ------------
          var i = event.currentTarget.id.split('.');
          this.selected_mediagroup = i[0];
          this.selected_link = i[1];
          this.selected_link_name = this.links[this.selected_link].name;
          this.selected_link_url = this.links[this.selected_link].url;
          console.log(this.selected_link_name);
          console.log(this.selected_link_url);

          // clear custom URL ---------
          this.newURL = null;
          this.newURL_name = null;
          this.isFormValid = false;
        }
      },

      addLink: function(event) {

        axios({
            method: 'post',
            url: `${ this.siteURL }/api/l`,
            data: {
              media__asset_id: 100,
              name: this.newURL_name,
              url: this.newURL
            }
        }).then(response => {

              console.log(response.data);
              alert("link save");
          })
          .catch(e => {
              this.errors.push(e)
          });

      },

      addSched: function(event) {

        console.log(this.newURL);
        console.log(this.newURL_name);
        // @todo: clean data validation
        if (this.selected_screen == null)
        {
          alert('no screen selected');
          return;
        }
        
        if (this.selected_link == null)
        {
          // check URL & name
          if (!(this.newURL) || !(this.newURL_name))
          {
            alert('Please complete URL fields');
            return;
          }
        
          // @TODO: validate URL, name
          var newURL_id = this.addLink();
          if (newURL_id == "")
          {
            return;
          }

          // @TODO check failure here
          var mydata = {
              screen_id: this.selected_screen,
              link_id: newURL_id,
              url: this.newURL,
              show_datetime: this.momentNow()
          }
        }
        else
        {
          var mydata = {
              screen_id: this.selected_screen,
              link_id: this.selected_link,
              url: this.selected_link_url,
              show_datetime: this.momentNow()
          }
        }
        
        axios({
            method: 'post',
            url: `${ this.siteURL }/api/schedule/screen/${ this.selected_screen }`,
            data: mydata
        }).then(response => {
              console.log(response);
              alert("schedule save");
              // @TODO: clear forms on save

              // refresh schedule
              this.getScreenSched()
          })
          .catch(e => {
              this.errors.push(e)
          });
        
      },

      disableMedia: function(event) {
        //alert('something');
        this.selected_mediagroup = null;
        this.selected_link = null;
        this.selected_link_name = null;
        this.selected_link_url = null;
      },

      // Helpers =================
      momentNow: function() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
      },
      trimObj: function(objArr) {
        return Object.assign({}, ...objArr );
      },
      toArray: function(obj) {
        //return Object.keys(obj).map((key) => [obj[key]]);
        return Object.entries(obj);
      },
      eventsFormat: function() {

        let esched = [];
        this.selected_screen_schedule.forEach(function (val, key, map) {
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




    }
  }
</script>

<style scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
  }

  .my-event.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
</style>