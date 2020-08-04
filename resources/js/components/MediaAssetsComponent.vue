<template>
  <v-container>
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
                <!-- <v-list-item-group v-model="screen" color="primary"> -->
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(link, j) in asset.links"
                    :key="j"
                    v-on:click="linkSelect"
                    v-on:dblclick="linkRename([link.id,link.name,i,j])"
                    :id="asset.name + '**' + link.id"
                  >
                    <v-list-item-content v-if="rename_field && a==i && b==j" >
                      <v-text-field
                          outlined
                          dense
                          v-model="link_name"
                          v-on:blur="setLinkName()"
                        ></v-text-field>
                    </v-list-item-content>
                    
                    <v-list-item-content v-else>
                      <v-list-item-title v-text="link.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-tooltip left>
                      <!-- <template v-if="asset.name === 'Custom Links'" v-slot:activator="{ on, attrs }"> -->
                      <template v-slot:activator="{ on, attrs }">
                        <v-list-item-icon 
                          class="ml-5"
                          v-bind="attrs"
                          v-on="on"
                          v-on:click="deleteLink(link.id)"
                        >
                          <v-icon color="red">mdi-delete-circle</v-icon>
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
  </v-container>
</template>

<script>
export default {
  props: [
    'media_assets',
    'selected',
    'links',
    'form',
    'deleteLink',
    'getLinks'
  ],
  data: () => ({
    rename_field: false,
    a: '',
    b: '',
    int_link_id: '',
    int_link_name: '',
    int_newlink_name: '',
  }),
  methods: {
    linkSelect: function (event) {
      if (event) {
        var i = event.currentTarget.id.split('**');
        this.selected.mediagroup = i[0];
        this.selected.link = i[1];
        this.selected.link_name = this.links[this.selected.link].name;
        this.selected.link_url = this.links[this.selected.link].url;
        this.form.is_form_valid = false 
        this.$emit('linkSelect', 'deliver some values')
      }
    },
    linkRename: function (event) {
      console.log('renaming link')
      console.log(event)
      this.int_link_id = event[0]
      this.int_link_name = event[1]
      this.a = event[2]
      this.b = event[3]
      this.rename_field = true
    },
    setLinkName: function() {
      if (this.int_link_name != this.int_newlink_name) {
        if(!confirm('Are you sure you like rename this link?')) {
          this.rename_field = false
          return
        }

        console.log('saving new link name...')
        console.log(this.int_link_id)
        console.log(this.int_newlink_name)
        
        axios({
          method: 'patch',
          url: `${ this.siteURL }/api/l/${ this.int_link_id }`,
          data: {
            name: this.int_newlink_name,
          }
        }).then(response => {
            console.log('link name updated')
            console.log(response.data)
            if (response.data == "updated") {
              this.selected.link_name = this.int_newlink_name
              //this.getLinks()
              this.$emit('setLinkName', this.int_newlink_name)
            }
        })
          .catch(e => {
            this.errors.push(e)
        });

      }
      this.rename_field = false
      
    }
  },
  computed: {
    link_name: {
      get: function(event) {
        return this.int_link_name
      },
      set: function(newValue) {
        //console.log('setting new link name..')
        //console.log(newValue)
        this.int_newlink_name = newValue
      }
    }
  }
}
</script>

<style>

</style>