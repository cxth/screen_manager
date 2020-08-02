<template>
  <v-container>
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

                    
                    <v-list-item v-if="!add_screen_panel">
                      <v-list-item-content>
                        <v-btn 
                          x-small 
                          class="blue darken-1"
                          dark
                          v-on:click="add_screen_panel=true"
                        >
                          Add Screen
                        </v-btn>
                      </v-list-item-content>
                    </v-list-item>
                    
                    <v-list-item v-else>
                      <v-list-item-content>
                        <v-text-field
                          class="ma-0 pa-0"
                          placeholder="Screen Name"
                          outlined
                          dense
                          v-model="newScreen"
                          :rules="[rules.counter]"
                          counter
                          maxlength="25"
                        ></v-text-field>
                        <v-btn 
                          x-small 
                          class="teal"
                          dark
                          :id="item[0].outlet_id+'**'+item[0].outlet_intid+'**new'"
                          v-on:click="addNewScreen"
                        >
                          Save
                        </v-btn>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                      v-for="(screen, screen_i) in item"
                      :key="screen_i"
                      v-on:click="screenSelect"
                      :id="screen.outlet_name + '**' + screen.id + '**' + screen.description + '**' + screen_i" 
                    >
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
      </v-list>
  </v-container>
</template>

<script>
export default {
  props: [
    'outlets',
    'selected',
    'getScreenSched',
    'getScreenAutologin',
    'getScreenNotes',
    'getOutlets'
  ],
  data() {
    return {
      add_screen_panel: false,
      newScreen: "",
      rules: {
        counter: value => value.length <= 25 || 'Max 25 characters',
      }
    }
  },
  methods: {
    outletSelect: function (event) {
      this.newScreen = ""; 
    },

    addNewScreen: function(event) {
      
      if (this.newScreen == "") {
        alert('Please enter screen name')
        return
      }

      if (!confirm("Are you sure you like add this screen?")) {
          return
      }

      var i = event.currentTarget.id.split('**');
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

    screenSelect: function (event) {
      console.log('selecting screen');
      if (event) {
        var i = event.currentTarget.id.split('**');
        this.selected.outlet = i[0];
        this.selected.screen = i[1];
        this.selected.screen_name = i[2];
        this.getScreenSched()
        this.getScreenAutologin()
        this.getScreenNotes()
        // i[1] - screen ID, i[3] - screen key
        this.$emit('screenSelect', [i[1],i[3]])
        this.add_screen_panel = false;
      }
    },

    openLink: function(link) {
      window.open(`${ this.siteURL }/admin/${ link }`);
    }
  }
}
</script>

<style>

</style>