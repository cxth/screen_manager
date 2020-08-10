<template>
   <v-row justify="center">
    <v-dialog v-model="file_upload_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="setUploadDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Upload Short Clip Videos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn dark text @click="setUploadDialog('false')">Save</v-btn> -->
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <template>
            <v-file-input 
              chips 
              accept="video/*" 
              label="File input"
              prepend-icon="mdi-file-video"
            >
            </v-file-input>
          </template>
        </v-container>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['file_upload_dialog'],
    data () {
      return {
        //dialog: true,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
    methods: {
      setUploadDialog: function() {
        this.$emit('setUploadDialog', false)
      }
    },
    computed: {
      // dialog: {
      //   get: function (event) {
      //     return this.file_upload_dialog
      //   },
      //   set: function (newVal) {
      //     return false
      //   }
      // }
    },
    watch: {
      // dialog: function(newVal, oldVal) {
      //   console.log('dialog newval: ' + newVal)
      //   console.log('dialog oldval: ' + oldVal)
      // }
    }
  }
</script>

<style>

</style>