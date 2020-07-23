<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
      :width="270"
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

                      <v-tooltip left>
                        <template v-if="asset.name === 'Custom Links'" v-slot:activator="{ on, attrs }">
                          <v-list-item-icon 
                            class="ml-5"
                            v-bind="attrs"
                            v-on="on"
                            v-on:click="deleteLink(link.id)"
                          >
                            <v-icon>mdi-server-remove</v-icon>
                          </v-list-item-icon>
                        </template>
                        <span>delete link</span>
                      </v-tooltip>
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
      <v-toolbar-title style="color:#FFA500">Screen Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app  
      :width="270"
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
        <v-list-item link
          v-on:click="outletSelect"
        >
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

                    <v-list-item>
                      <v-list-item-content>
                        <v-text-field
                          class="ma-0 pa-0"
                          placeholder="Screen Name"
                          outlined
                          dense
                          v-model="newScreen"
                        ></v-text-field>
                        <v-btn 
                          x-small 
                          color="secondary" 
                          dark
                          :id="item[0].outlet_id+'.'+item[0].outlet_intid+'.new'"
                          v-on:click="addNewScreen"
                        >
                          Add Screen
                        </v-btn>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                      v-for="(screen, screen_i) in item"
                      :key="screen_i"
                      v-on:click="screenSelect"
                      :id="screen.outlet_name + '.' + screen.id"
                    >
                      <!-- <v-list-item-icon>
                        <v-icon v-text="screen.admin_icon" ></v-icon>
                      </v-list-item-icon> -->
                      <v-list-item-content>
                        <v-list-item-title v-text="screen.description"></v-list-item-title>
                      </v-list-item-content>

                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-list-item-icon 
                            class="ml-5"
                            v-bind="attrs"
                            v-on="on"
                            v-on:click="openLink(screen.id)"
                          >
                            <v-icon>mdi-eye</v-icon>
                          </v-list-item-icon>
                        </template>
                        <span>click to visit screen</span>
                      </v-tooltip>
                    
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
        <!-- <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item link
          v-on:click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
                    <v-icon left>mdi-key</v-icon>
                    INFO
                  </v-tab>

                  <v-tab-item>
                    <v-row
                      justify="center"
                      align="center"
                      pb="3"
                    >
                      <v-col class="shrink">
                        <v-card
                            class="mx-auto pb-10 mb-12"
                            height="100%"
                            width="500"
                            outlined
                          >
                            <v-row 
                              no-gutters
                              class="mb-5"
                            >
                            
                                <v-col>
                                  <v-list-item three-line>
                                    <v-list-item-content>
                                      <div class="overline mb-4">SCREEN</div>
                                      <v-list-item-subtitle>{{ selected_outlet }}</v-list-item-subtitle>
                                      <v-list-item-title class="headline mb-4">{{ selected_screen }}</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-col>
                                <v-col>
                                  <v-list-item three-line>
                                    <v-list-item-content>
                                      <div class="overline mb-4">CONTENT</div>
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
                              <v-col 
                                style="maxWidth: 280px"
                                :fullscreen="$vuetify.breakpoint.mobile"
                              >
                                  <v-text-field
                                    label="or enter URL"
                                    type="url"
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
                                    :disabled="!isFormValid"
                                    v-model="newURL_name"
                                  ></v-text-field>

                                </v-col>
                            </v-row>
                            <v-row 
                              no-gutters 
                            >
                              <v-col 
                                align="center"
                                justify="center"
                              >
                                  <v-btn rounded color="primary" dark @click="addSched" class="mr-2">SAVE</v-btn>
                                  <v-btn rounded color="primary" dark @click="disableMedia" class="ml-2">CLEAR</v-btn>
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
                          <v-sheet 
                             style="maxWidth: 500px"
                            :fullscreen="$vuetify.breakpoint.mobile"
                          >
                            <v-calendar
                              ref="calendar"
                              v-model="todayx"
                              :now="todayx"
                              :value="todayx"
                              :events="events"
                              color="primary"
                              type="day"
                            ></v-calendar>
                          </v-sheet>
                        </v-col>
                      </v-row>
                      </template>

                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
          
                    <template>
                      <v-container class="grey lighten-5">
                        <v-row
                          align="center"
                          justify="center"
                        >
                          <v-col sm="9">
                            <v-card
                              class="pa-2"
                              outlined
                              tile
                            >
                              <div class="pa-4">
                                <v-btn class="text-center" rounded color="primary" dark>Auto-Login URL</v-btn>
                                <span class="font-weight-thin pl-3"> 
                                <!-- http://sm.local/client?r=BrCbp9TN/k72XHk6DHm/WQ==__AC-102SS1 -->
                                {{ screen_autologin }}
                                </span>
                              </div>
                              
                            </v-card>
                            <!-- <v-row no-gutters>
                              <v-col
                                cols="8"
                                sm="6"
                              >
                                <v-card
                                  class="pa-2"
                                  outlined
                                  style="background-color: darkgrey;"
                                  tile
                                >
                                  Level 2: .col-8 .col-sm-6
                                </v-card>
                              </v-col>
                              <v-col
                                cols="4"
                                sm="6"
                              >
                                <v-card
                                  class="pa-2"
                                  outlined
                                  style="background-color: darkgrey;"
                                  tile
                                >
                                  Level 3: .col-4 .col-sm-6
                                </v-card>
                              </v-col>
                            </v-row> -->
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>

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
import axios from 'axios';

  export default {
    props: {
      source: String,
    },
    data: () => ({
      selected_outlet: null,
      selected_screen: null,
      selected_screen_schedule: null,
      screen_autologin: null,

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
      newURL_id: null,
      isFormValid: true,
      newScreen: null,

      // Layout
      drawer: null,
      drawerRight: null,
      screen: 1,
      screenm: null,     
      
      // Schedule
      todayx: '2020-01-01',
      events: [],

    }),
    mounted () {
      //this.$refs.calendar.scrollToTime('08:00')
    },
    computed: {
      // outlets() {
      //   return {
      //     test: "aaaa"
      //   }
      // }
    },

    created () {
      this.$vuetify.theme.dark = true;
      this.getOutlets()
      this.getMediaAssets()
      this.getLinks()
      this.todayx = this.momentNow('date');
    },
    methods: {

      openLink: function(link) {
        window.open(`${ this.siteURL }/admin/${ link }`);
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
              console.log(this.outlets);
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
              //localStorage.name = 'Cxian';

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

      getScreenAutologin: function() {
        console.log('getScreenAutologin');
        axios({
            method: 'post',
            url: `${ this.siteURL }/api/screen/login`,
            data: {
              screen_id: this.selected_screen
            }
        }).then(response => {
              console.log(response.data);
              this.screen_autologin = `${ this.siteURL }/client?r=${ response.data }`;
          })
          .catch(e => {
              this.errors.push(e)
          });
      },

      outletSelect: function (event) {
        console.log('outlet select');
        this.newScreen = "";
      },

      screenSelect: function (event) {
        if (event) {
          var i = event.currentTarget.id.split('.');
          this.selected_outlet = i[0];
          this.selected_screen = i[1];

          this.getScreenSched()
          this.getScreenAutologin()
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

      addNewScreen: function(event) {
        console.log('adding new screen');
        //console.log(this.newScreen);
        //console.log(event.currentTarget.id);
        var i = event.currentTarget.id.split('.');
        axios({
            method: 'post',
            url: `${ this.siteURL }/api/${ i[0] }/screen`,
            data: {
              outlet_id: i[0],
              outlet_intid: i[1],
              screen_description: this.newScreen
            }
        }).then(response => {
              
            if (response.data == "Saved")
            {
              this.getOutlets()
            }
          })
          .catch(e => {
              this.errors.push(e)
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
              alert("link save");
              console.log('the link id: ' + response.data)
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

      addSched: function(event) {

        console.log('selected link ');
        console.log(this.selected_link);
        //return;
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
        
          var mydata = {
              screen_id: this.selected_screen,
              link_name: this.newURL_name,
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
        
        console.log('final mydata ');
        console.log(mydata);

        axios({
            method: 'post',
            url: `${ this.siteURL }/api/schedule/screen/${ this.selected_screen }`,
            data: mydata
        }).then(response => {
              console.log(response);
              alert("schedule save");
              // reset mydata
              mydata = {}
              // reset all data
              this.resetData()
              // @TODO: clear forms on save
              // refresh schedule
              this.getScreenSched()
              // refresh media assets
              this.getMediaAssets()
              // refresh links
              this.getLinks()
          })
          .catch(e => {
              this.errors.push(e)
          });
        
      },

      resetData: function() {
        this.selected_link = null
        this.selected_link_url = null
        this.selected_link_name = null
        this.selected_mediagroup = null;
        this.newURL = null
        this.newURL_name = null
        this.newURL_id = null

      },

      // new URL keyup
      disableMedia: function(event) {
        //alert('something');
        this.isFormValid = true
        this.selected_mediagroup = null;
        this.selected_link = null;
        this.selected_link_name = null;
        this.selected_link_url = null;
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