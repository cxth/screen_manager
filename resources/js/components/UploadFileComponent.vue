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
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <upload_files></upload_files>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import upload_files from './UploadFiles'

  export default {
    components: {
      upload_files
    },
    props: ['file_upload_dialog'],
    data () {
      return {
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
    },
    watch: {
    }
  }
</script>

<style>

</style>