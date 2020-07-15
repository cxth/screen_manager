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
              <!-- <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content> -->
              <v-expansion-panel-content>
                <v-list dense>
                  <!-- <v-subheader>REPORTS</v-subheader> -->
                  <v-list-item-group v-model="screen" color="primary">
                    <v-list-item
                      v-for="(link, i) in asset.links"
                      :key="i"
                      v-on:click="linkSelect"
                      :id="asset.name + '.' + link.id"
                    >
                      <!-- <v-list-item-icon>
                        <v-icon v-text="screen.icon"></v-icon>
                      </v-list-item-icon> -->
                      <v-list-item-content>
                        <v-list-item-title v-text="link.description"></v-list-item-title>
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
              <!-- <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content> -->
              <v-expansion-panel-content>
                <v-list dense>
                  <!-- <v-subheader>REPORTS</v-subheader> -->
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
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">

            <!-- <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip> -->

              <v-card
                  class="mx-auto"
                  width="600"
                  height="300"
                  outlined
                >

                  <v-row no-gutters>
                    <template>
                      <v-col>
                        <v-card
                          class="pa-2"
                          outlined
                          tile
                        >
                          
                        <v-list-item two-line>
                          <v-list-item-content>
                            <div class="overline mb-4">ASSIGN SCREEN</div>
                            <v-list-item-subtitle>{{ selected_outlet }}</v-list-item-subtitle>
                            <v-list-item-title class="headline mb-4">{{ selected_screen }}</v-list-item-title>
                          </v-list-item-content>
                          <!-- <v-list-item-avatar
                            tile
                            size="80"
                            color="grey"
                          ></v-list-item-avatar> -->
                        </v-list-item>

                        </v-card>
                      </v-col>
                      <v-col>
                        <v-card
                          class="pa-2"
                          outlined
                          tile
                        >
                          
                        <v-list-item two-line>
                          <v-list-item-content>
                            <div class="overline mb-4">ASSIGN CONTENT</div>
                            <v-list-item-subtitle>{{ selected_mediagroup }}</v-list-item-subtitle>
                            <v-list-item-title class="headline mb-4">{{ selected_link_name }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>

                        </v-card>
                      </v-col>
                      <v-responsive

                        width="100%"
                      ></v-responsive>
                    </template>
                  </v-row>
                  <v-divider></v-divider>
                  <v-card-actions> 
                      <v-btn rounded color="primary" dark @click="addSched">SAVE</v-btn>
                  </v-card-actions>
                </v-card>

          </v-col>
        </v-row>
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
      test: 'TEST',
      selected_outlet: null,
      selected_screen: null,
      selected_mediagroup: null,
      selected_link: null,
      selected_link_name: null,
      selected_link_url: null,

      outlets: null,
      media_assets: null,
      links: null,
      drawer: null,
      drawerRight: null,
      screen: 1,
      screenm: null,
      screens: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      
    }),
    
    created () {
      this.$vuetify.theme.dark = true;
      this.getOutlets()
      this.getMediaAssets()
      this.getLinks()
    },
    methods: {
      getOutlets() {
          axios.get(`${ this.siteURL }/api/screen/all`)
          .then(response => {
            
              let combined = {};
              response.data.forEach(function (arrayItem) {
                if (!(Object.keys(arrayItem) in combined))
                {
                    combined[Object.keys(arrayItem)] = Object.values(arrayItem);
                }
                else
                {
                    combined[Object.keys(arrayItem)].push(Object.values(arrayItem)[0]);
                }
              });

              this.outlets = combined;
              console.log('outlets obj');
              console.log(this.outlets);
              
              //this.screens[0].text = 'sample';
              //console.log(Object.keys(this.outlet[0]));
          })
          .catch(e => {
              this.errors.push(e)
          })
      },

      getMediaAssets() {
        axios.get(`${ this.siteURL }/api/media/all`)
          .then(response => {
          
              this.media_assets = response.data;
              console.log('media obj');
              console.log(this.media_assets);

              // test
              localStorage.name = 'Cxian';

          })
          .catch(e => {
              this.errors.push(e)
          })
      },

      getLinks() {
        axios.get(`${ this.siteURL }/api/l`)
          .then(response => {
              //this.links = this.trimObj(response.data);
              this.links = response.data;
              console.log('link');
              console.log(this.links[0]);
              //console.log('link Arr');
              //console.log(this.toArray(this.links));

          })
          .catch(e => {
              console.log('links not working');
              this.errors.push(e)
          })
      },

      outletSelect: function (event) {
        // `event` is the native DOM event
        if (event) {
          var i = event.currentTarget.id.split('.');
          console.log(event.currentTarget.id);
          this.selected_outlet = i[0];
          this.selected_screen = i[1];
        }
      },

      linkSelect: function (event) {
        // `event` is the native DOM event
        if (event) {
          var i = event.currentTarget.id.split('.');
          console.log(event.currentTarget.id);
          this.selected_mediagroup = i[0];

          this.selected_link = i[1];
          this.selected_link_name = this.links[this.selected_link - 1].description;
          this.selected_link_url = this.links[this.selected_link - 1].url;
          
          //this.selected_link = this.links[this.selected_link - 1].description;
          //var myURL = this.links[this.selected_link - 1].url;
          //console.log('selected url');
          //console.log(myURL);
          
          //alert(event.currentTarget.id)
        }
      },

      addSched: function(event) {

        var myURL = this.links[this.selected_link - 1].url;

        axios({
          method: 'post',
          url: `${ this.siteURL }/api/schedule/screen/${ this.selected_screen }`,
          data: {
            screen_id: this.selected_screen,
            link_id: this.selected_link,
            url: this.selected_link_url,
            show_datetime: this.now()
          }
        }).then(response => {
        
              console.log(response);
              alert("schedule save");
          })
          .catch(e => {
              this.errors.push(e)
          });
        
      },

      // Helpers
      now: function() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
      },
      trimObj: function(objArr) {
        return Object.assign({}, ...objArr );
      },
      toArray: function(obj) {
        //return Object.keys(obj).map((key) => [obj[key]]);
        return Object.entries(obj);

      }

    }
  }
</script>