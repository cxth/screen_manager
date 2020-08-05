<template>
  <v-container class="grey darken-4 pt-8 pb-8">
    <v-row
      align="center"
      justify="center"
    >
      <v-col sm="9">
        <v-card
          outlined
          tile
        >
          <v-toolbar
            class="grey darken-4"
            flat
            dark
          >
            <v-toolbar-title>
              <!-- {{ selected.screen_name }} -->
              <v-text-field
                single-line
                class="pt-4 ma-2"
                v-model="screen_name"
                append-outer-icon="mdi-pencil"
                @click:append-outer="renameScreen('name')"
              ></v-text-field>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <template v-if="this.selected.outlet_screen > 1">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile outlined 
                    color="danger"
                    class="ma-2 white--text"
                    @click="toDeleteScreen()"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Delete Screen
                  </v-btn>
                </template>
                <span>delete this screen</span>
              </v-tooltip>
            </template>

            <template>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile outlined 
                    color="error"
                    class="ma-2 white--text"
                    @click="toDeactivateOutlet()"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Deactivate Outlet
                  </v-btn>
                </template>
                <span>delete this screen</span>
              </v-tooltip>
            </template>


          </v-toolbar>

          <v-container class="pa-6"
            align="center"
            justify="center"
          >
            <v-row no-gutters>
              <template>
                <v-col lg="3">
                  <v-card
                    class="pa-2 pr-6"
                    flat tile color="teal"
                    align="right"
                  >
                    Auto-Login URL
                  </v-card>
                </v-col>
                <v-col lg="8">
                  <v-card
                    class="pa-2"
                    flat tile
                  >
                    <v-text-field
                      single-line dense
                      v-model="screen_autologin"
                      readonly
                    ></v-text-field>
                  </v-card>
                </v-col>
              </template>
            </v-row>

            <v-row no-gutters>
              <template>
                <v-col lg="3">
                  <v-card
                    class="pa-2 pr-6"
                    flat tile color="teal"
                    align="right"
                  >
                    Now Showing
                  </v-card>
                </v-col>
                <v-col lg="8">
                  <v-card
                    class="pa-2"
                    flat tile
                  >
                    <v-text-field
                      single-line dense
                      v-model="screen_now_showing"
                      readonly
                    ></v-text-field>
                  </v-card>
                </v-col>
              </template>
            </v-row>

            <v-row no-gutters>
              <template>
                <v-col lg="3">
                  <v-card
                    class="pa-2 pr-6"
                    flat tile color="teal"
                    align="right"
                  >
                    Screen Resolution
                  </v-card>
                </v-col>
                <v-col lg="8">
                  <v-card
                    class="pa-2"
                    flat tile
                  >
                    <v-text-field
                      single-line dense
                      v-model="resolution"
                      append-outer-icon="mdi-pencil"
                      @click:append-outer="saveScreenNotes('resolution')"
                    ></v-text-field>
                  </v-card>
                </v-col>
              </template>
            </v-row>

            <v-row no-gutters>
              <template>
                <v-col lg="3">
                  <v-card
                    class="pa-2 pr-6"
                    flat tile color="teal"
                    align="right"
                  >
                    Equipment Model
                  </v-card>
                </v-col>
                <v-col lg="8">
                  <v-card
                    class="pa-2"
                    flat tile
                  >
                    <v-text-field
                      single-line dense
                      v-model="equipment_model_installed"
                      append-outer-icon="mdi-pencil"
                      @click:append-outer="saveScreenNotes('equipment')"
                    ></v-text-field>
                  </v-card>
                </v-col>
              </template>
            </v-row>

            <v-row no-gutters>
              <template>
                <v-col lg="3">
                  <v-card
                    class="pa-2 pr-6"
                    flat tile color="teal"
                    align="right"
                  >
                    Team Viewer Details
                  </v-card>
                </v-col>
                <v-col lg="8">
                  <v-card
                    class="pa-2"
                    flat tile
                  >
                    <v-text-field
                      single-line dense
                      v-model="teamviewer"
                      append-outer-icon="mdi-pencil"
                      @click:append-outer="saveScreenNotes('teamviewer')"
                    ></v-text-field>
                  </v-card>
                </v-col>
              </template>
            </v-row>

            <v-row no-gutters>
              <template>
                <v-col lg="3">
                  <v-card
                    class="pa-2 pr-6"
                    flat tile color="teal"
                    align="right"
                  >
                    Activation Date
                  </v-card>
                </v-col>
                <v-col lg="8">
                  <v-card
                    class="pa-2"
                    flat tile
                  >
                    <active_screen_component
                    :screen_activation_date="screen_activation_date"
                    :selected="selected"
                    @save="refreshActivationDate($event)"
                    ></active_screen_component>
                  </v-card>
                </v-col>
              </template>
            </v-row>

          </v-container>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import active_screen_component from './ScreenActivatedComponent'
export default {
  components: {
      active_screen_component
  },
  props:[
    'screen_autologin',
    'screen_now_showing',
    'screen_resolution',
    'screen_activation_date',
    'screen_equipment_model_installed',
    'screen_teamviewer_details',
    'selected'
  ],
  data: () => ({
    int_resolution: '',
    int_equipment_model: '',
    int_teamviewer: '',
    int_screen_name: '',
  }),
  methods: {
    saveScreenNotes: function(event) {
      let mydata = {
        id: this.selected.screen,
        description: this.int_screen_name ? this.int_screen_name : this.selected.screen_name,
        resolution: this.int_resolution ? this.int_resolution : this.screen_resolution,
        equipment_model_installed: this.int_equipment_model ? this.int_equipment_model : this.screen_equipment_model_installed,
        teamviewer_details: this.int_teamviewer ? this.int_teamviewer : this.screen_teamviewer_details
      }
      axios({
          method: 'post',
          url: `${ this.siteURL }/api/getscreen`,
          data: mydata
      }).then(response => {
          if (response.data != "no-request")
          {
          }

          this.int_resolution = ''
          this.int_equipment_model = ''
          this.int_teamviewer = ''
          this.int_screen_name = ''
      })
      .catch(e => {
          this.errors.push(e)
      });
      this.$emit('saveScreenNotes',mydata.description)
    },
    
    renameScreen: function() {
      if (this.int_screen_name == '')
      {
        alert('Enter a valid name')
        return
      }
      
      if (!this.selected.screen)
      {
        return
      }

      if (confirm("Are you sure you like to rename the screen?")){
        this.saveScreenNotes('name')
      }
    },

    refreshActivationDate: function(newActivationDate) {
      this.$emit('refreshActivationDate',newActivationDate)
    },


    toDeleteScreen: function() {

      if (!confirm('DANGER: This will remove all schedules and login for this screen. \r\nAre you sure you want to DELETE this screen?')) {
        return;
      }

      var screen = this.selected.screen
      this.deleteScreen(screen)
      
      alert('Screen deleted. click OK to reload the page.');
      setTimeout(function() {
        location.reload();
      }, 1500)
    },

    toDeactivateOutlet: function() {

      if (!confirm('DANGER: This will remove all screens and schedules for this outlet . \r\nAre you sure you want to DEACTIVATE this outlet?')) {
        return;
      }

        // get screen IDs
        axios.get(`${ this.siteURL }/api/getscreens/${ this.selected.outlet_id }`)
        .then(response => {

          var screens = response.data
          screens.forEach((val, key, map) => {
            this.deleteScreen(val.id)
          });

          this.deactivateOutlet(this.selected.outlet_id)
          alert('Outlet has been deactivated. Click OK to reload the page.')
          setTimeout(function() {
            location.reload();
          }, 1500)

        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    deleteScreen: function(screen) {
      
      axios.delete(`${ this.siteURL }/api/screen/${ screen }`)
      .then(response => {

      })
      .catch(e => {
        this.errors.push(e)
      });
    },

    deactivateOutlet: function(outlet) {

      axios.delete(`${ this.siteURL }/api/outlet/${ outlet }`)
      .then(response => {

      })
      .catch(e => {
        this.errors.push(e)
      });
    }


  },
  created() {
    this.int_resolution = this.screen_resolution
    this.int_equipment_model = this.screen_equipment_model_installed
    this.int_teamviewer = this.screen_teamviewer_details
  },
  computed: {
    resolution: {
      get: function (event) {
        return this.screen_resolution
      },
      set: function (newValue) {
        this.int_resolution = newValue
      }
    },
    equipment_model_installed: {
      get: function (event) {
        return this.screen_equipment_model_installed
      },
      set: function (newValue) {
        this.int_equipment_model = newValue
      }
    },
    teamviewer: {
      get: function (event) {
        return this.screen_teamviewer_details
      },
      set: function (newValue) {
        this.int_teamviewer = newValue
      }
    },
    screen_name: {
      get: function (event) {
        return this.selected.screen_name
      },
      set: function (newValue) {
        this.int_screen_name = newValue
      }
    }

  }
}
</script>

<style>

</style>