<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
      pb="3"
    >
      <v-col class="shrink">
        <v-card
            class="mx-auto mt-5 pb-10 mb-12"
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
                      <v-list-item-subtitle>{{ selected.outlet }}</v-list-item-subtitle>
                      <v-list-item-title class="headline mb-4">{{ selected.screen }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col>
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
                    :disabled="!form.is_form_valid"
                  ></v-text-field>

                  <v-text-field
                    label="URL Name"
                    outlined
                    dense
                    v-model="newURL_name"
                    :disabled="!form.is_form_valid"
                    :rules="[rules.counter]"
                    counter
                    maxlength="50"
                  ></v-text-field>

                </v-col>
            </v-row>
            <v-row no-gutters>
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
  </v-container>
</template>

<script>
export default {
  props: [
    'selected',
    'form',
    'is_form_valid',
    'clear_URL',
    'momentNow',
    'resetData',
    'getScreenSched',
    'getMediaAssets',
    'getLinks'
  ],
  data: () => ({
    newURL: "",
    newURL_name: "",
    rules: {
      counter: value => value.length <= 50 || 'Max 50 characters',
    }
  }),
  watch: {
    clear_URL: function (event) {
      this.newURL = ''
      this.newURL_name = ''
    }
  },
  methods: {
      addSched: function(event) {
        if (this.selected.screen == null)
        {
          alert('No screen selected');
          return;
        }
        
        if (this.selected.link == null)
        {
          // check URL & name
          if (this.newURL=="" || this.newURL_name=="")
          {
            alert('Please complete URL fields');
            return;
          }
        
          var mydata = {
              screen_id: this.selected.screen,
              link_name: this.newURL_name,
              url: this.newURL,
              show_datetime: this.momentNow()
          }
        }
        else
        {
          var mydata = {
              screen_id: this.selected.screen,
              link_id: this.selected.link,
              url: this.selected.link_url,
              show_datetime: this.momentNow()
          }
        }
        
        console.log('final mydata ');
        console.log(mydata);
        
        axios({
            method: 'post',
            url: `${ this.siteURL }/api/schedule/screen/${ this.selected.screen }`,
            data: mydata
        }).then(response => {
            console.log(response);
            alert("Schedule saved");
            mydata = {}
            this.resetData()
            this.getScreenSched()
            this.getMediaAssets()
            this.getLinks()
          })
          .catch(e => {
            this.errors.push(e)
          });
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