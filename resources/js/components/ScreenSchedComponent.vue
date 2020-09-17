<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
      pb="3"
    >
      <v-col class="shrink">
        <v-card transition="scroll-y-transition"
            class="mx-auto mt-5 pb-10 mb-7"
            height="100%"
            width="500"
            outlined 
          >
            <v-row 
              no-gutters
              class="mb-5"
            >
                <v-col class="ml-5">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">SCREEN</div>
                      
                      <v-list-item-subtitle>{{ selected.outlet }}</v-list-item-subtitle>
                      <v-list-item-title class="headline mb-4">{{ selected.screen_name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col class="mr-4">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">CONTENT</div>
                      
                      <v-list-item-subtitle>{{ selected.mediagroup }}</v-list-item-subtitle>
                      <v-list-item-title class="headline mb-4">{{ selected.link_name }}</v-list-item-title>
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
                v-if="!selected.link"
            >
                <v-col 
                  style="maxWidth: 280px"
                  :fullscreen="$vuetify.breakpoint.mobile"
                >
                  <v-text-field
                    label="enter URL https://..."
                    type="url"
                    outlined
                    dense
                    @keyup="disableMedia"
                    :rules="[rules.url]"
                    v-model="newURL"
                    :disabled="!form.is_form_valid"
                  ></v-text-field>

                  <v-text-field v-if="newURL"
                    label="URL Name"
                    hint="give this link a name"
                    outlined
                    dense
                    v-model="newURL_name"
                    :disabled="!form.is_form_valid"
                    :rules="[rules.counter]"
                    counter
                    maxlength="50"
                  ></v-text-field>

                  <v-select v-if="newURL_name"
                    v-model="media_asset_id"
                    :items="media_items"
                    item-text="name"
                    item-value="id"
                    label="Select Group"
                    outlined
                    dense
                    single-line
                  ></v-select>

                </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col 
                align="center"
                justify="center"
              >
                
           
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-width="300"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      rounded 
                      color="primary" 
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="mr-2">
                      SET
                    </v-btn>
                  </template>

                  
                  <v-card
                    height="525"
                    width="428"
                    class="mx-auto"
                  >
                    <v-list>
                      <v-list-item>
                      
                        <v-list-item-content>
                          <v-list-item-title>Select Date Time</v-list-item-title>
                        </v-list-item-content>

                        <!-- <v-list-item-action>
                          <v-btn
                            :class="fav ? 'red--text' : ''"
                            icon
                            @click="fav = !fav"
                          >
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                        </v-list-item-action> -->
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <!-- <v-list>
                      <v-list-item>
                        <v-list-item-action>
                          <v-switch v-model="message" color="purple"></v-switch>
                        </v-list-item-action>
                        <v-list-item-title>Enable messages</v-list-item-title>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-action>
                          <v-switch v-model="hints" color="purple"></v-switch>
                        </v-list-item-action>
                        <v-list-item-title>Enable hints</v-list-item-title>
                      </v-list-item>
                    </v-list> -->

                    <VueCtkDateTimePicker 
                      v-model="dtValue" 
                      :inline=true />

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text @click="menu = false">Cancel</v-btn>
                      <v-btn color="primary" @click="addSched" rounded>SAVE</v-btn>
                    </v-card-actions>
                  </v-card>
                  

                </v-menu>
            
                
                
                
                <v-btn rounded color="primary" dark @click="disableMedia" class="ml-2">CLEAR</v-btn>
              </v-col>
            </v-row>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    'selected',
    'media_assets',
    'form',
    'is_form_valid',
    'clear_URL',
    'momentNow',
    'resetData',
    'getSelectedScreenInfo',
    'screen_key',
    'getScreenSched',
    'getMediaAssets',
    'getLinks',
    'getAuth'
  ],
  data: () => ({
    media_asset_id: 100, //default for 'custom links'
    newURL: "",
    newURL_name: "",
    rules: {
      counter: value => value.length <= 50 || 'Max 50 characters',
      url: value => {
        const pattern = /^https:\/\//
        return pattern.test(value) || 'URL should start in https://'
      },
    },
    fav: true,
    menu: false,
    message: false,
    hints: true,
    dtValue: '2019-03-06 8:20 pm',
    minDate: ''
    //dtValue: this.momentNow()
  }),
  watch: {
    clear_URL: function (event) {
      this.newURL = ''
      this.newURL_name = ''
    }
  },
  computed: {
    media_items: {
      get: function(event) {
        let datax = []
        this.media_assets.map((media_assets, index) => {
          datax.push({id: media_assets.id, name: media_assets.name})
        })
        return datax
      },
      set: function(newValue) {
      }
    }
  },
  created() {
    this.dtValue = this.momentNow()
    // this.minDate = this.momentNow('ISO')
    // console.log('printing moment now p')
    // console.log(this.momentNow('ISO'))
  },
  methods: {
      addSched: function(event) {

        console.log('adding sched <<< the date')
        console.log(this.dtValue)


        this.menu = false

        if (this.selected.screen == null)
        {
          alert('No screen selected');
          return;
        }
        
        // Using Custom URL
        if (this.selected.link == null)
        {
          if (this.newURL=="" || this.newURL_name=="")
          {
            alert('Please complete URL fields');
            return;
          }

          if (/^https:\/\//.test(this.newURL) == false) {
            alert('URL should be in https://');
            return;
          }
        
          var mydata = {
              screen_id: this.selected.screen,
              link_name: this.newURL_name,
              url: this.newURL,
              media__asset_id: this.media_asset_id,
              show_datetime: this.momentNow(this.dtValue)
              //show_datetime: this.dtValue
          }
        }
        // Using Media Link
        else
        {
          var mydata = {
              screen_id: this.selected.screen,
              link_id: this.selected.link,
              url: this.selected.link_url,
              show_datetime: this.momentNow(this.dtValue)
              //show_datetime: this.dtValue
          }
        }
        
        console.log('saving schedule: ');
        console.log(mydata);
        //return
        
        // axios({
        //     method: 'post',
        //     url: `${ this.siteURL }/api/schedule/screen/${ this.selected.screen }`,
        //     data: mydata
        // }).then(response => {
        //     console.log(response);
        //     alert("Schedule saved");
        //     this.getSelectedScreenInfo([this.selected.screen,this.screen_key])
        //     this.getScreenSched()
        //     // refresh for custom URL
        //     this.getMediaAssets()
        //     this.getLinks()
        //     this.intclearURL()
        //   })
        //   .catch(e => {
        //     this.errors.push(e)
        //   });

        axios.post(`${ this.siteURL }/api/schedule/screen/${ this.selected.screen }`, 
            mydata, this.getAuth)
        .then(response => {
            console.log(response);
            alert("Schedule saved");
            this.getSelectedScreenInfo([this.selected.screen,this.screen_key])
            this.getScreenSched()
            // refresh for custom URL
            this.getMediaAssets()
            this.getLinks()
            this.intclearURL()
        })
        .catch(function (error) {
          this.errors.push(e)
          console.log(error);
        });


      },
      intclearURL: function() {
        this.newURL = ''
        this.newURL_name = ''
      },

      // new URL keyup
      disableMedia: function(event) {
        this.form.is_form_valid = true
        this.selected.mediagroup = null;
        this.selected.link = null;
        this.selected.link_name = null;
        this.selected.link_url = null;

        this.$emit('disableMedia', 'message from disable media')
      },
  }
}
</script>

<style>

</style>