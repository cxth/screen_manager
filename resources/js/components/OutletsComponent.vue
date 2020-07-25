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
                          class="blue darken-1"
                          dark
                          :id="item[0].outlet_id+'**'+item[0].outlet_intid+'**new'"
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
                      :id="screen.outlet_name + '**' + screen.id"
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
    'getOutlets'
  ],
  data() {
    return {
      newScreen: null
    }
  },
  methods: {
    outletSelect: function (event) {
      console.log('outlet select');
      this.newScreen = ""; //TODO activate
      //let newScreenx = this.newScreen;
      //this.setNewscreen(null)
      //this.$emit("update-number","");
    },
    addNewScreen: function(event) {
      console.log('adding new screen');
      //console.log(this.newScreen);
      //console.log(event.currentTarget.id);
      var i = event.currentTarget.id.split('**');
      console.log(event.currentTarget.id);
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
      if (event) {
        console.log(event.currentTarget.id);
        var i = event.currentTarget.id.split('**');
        this.selected.outlet = i[0];
        this.selected.screen = i[1];
        this.getScreenSched()
        this.getScreenAutologin()
      }
    },
    openLink: function(link) {
      window.open(`${ this.siteURL }/admin/${ link }`);
    }
    // getOutlets() {
    //     axios.get(`${ this.siteURL }/api/screen/all`)
    //     .then(response => {
    //         let combined = {};
    //         response.data.forEach(function (arrayItem) {
    //         if (!(Object.keys(arrayItem) in combined)) {
    //             combined[Object.keys(arrayItem)] = Object.values(arrayItem);
    //         }
    //         else {
    //             combined[Object.keys(arrayItem)].push(Object.values(arrayItem)[0]);
    //         }
    //         });
    //         this.outlets = combined;
    //         console.log(this.outlets);
    //     })
    //     .catch(e => {
    //         this.errors.push(e)
    //     })
    // }
    

  },
  computed: {

  }
}
</script>

<style>

</style>