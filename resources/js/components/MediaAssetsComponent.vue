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
                    v-for="(link, i) in asset.links"
                    :key="i"
                    v-on:click="linkSelect"
                    :id="asset.name + '**' + link.id"
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
  </v-container>
</template>

<script>
export default {
  props: [
    'media_assets',
    'selected',
    'links',
    'form',
    'deleteLink'
  ],
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
    }
  }
}
</script>

<style>

</style>