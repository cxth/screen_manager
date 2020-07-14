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
              v-for="(item,i) in 5"
              :key="i"
            >
              <v-expansion-panel-header>Item</v-expansion-panel-header>
              <!-- <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content> -->
              <v-expansion-panel-content>
                <v-list dense>
                  <!-- <v-subheader>REPORTS</v-subheader> -->
                  <v-list-item-group v-model="screen" color="primary">
                    <v-list-item
                      v-for="(screen, i) in screens"
                      :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="screen.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="screen.text"></v-list-item-title>
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
                  <v-list-item-group v-model="screen" color="primary">
                    <v-list-item
                      v-for="(screen, screen_i) in item"
                      :key="screen_i"

                      v-on:click="greet"

                      :id="screen.id"
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
            <v-tooltip right>
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
            </v-tooltip>
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
      outlets: null,
      drawer: null,
      drawerRight: null,
      screen: 1,
      screens: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
     
    }),
    created () {
      this.$vuetify.theme.dark = true;
      this.getOutlets()
    },
    methods: {
      getOutlets() {
          //axios.get(`http://sm.local/api/schedule`)
          axios.get(`http://sm.local/api/screen/all`)
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
              console.log(this.outlets);
              
              //this.screens[0].text = 'sample';
              //console.log(Object.keys(this.outlet[0]));
          })
          .catch(e => {
              this.errors.push(e)
          })
          console.log('testing');
      },

      greet: function (event) {
        // `event` is the native DOM event
        if (event) {
          alert(event.currentTarget.id)
          
        }
      },
      
    }
  }
</script>