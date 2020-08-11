<template>
  <div>
    <div v-if="currentFile" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>
    <v-container class="ma-5">
      <v-form ref="form">
        <v-file-input 
          show-size 
          v-model="vfile"
          accept="video/*" 
          label="File input"
          prepend-icon="mdi-file-video"
          ref="file" 
          @change="selectFile"
          :rules="[rules.required]"
        >
        </v-file-input>
        <v-text-field
          label="Video Name"
          v-model="vname"
          prepend-icon="mdi-rename-box"
          :rules="[rules.required]"
          suffix="required"
        >
        </v-text-field>
        <div class="text-center">
          <v-btn rounded color="primary" dark @click="upload">Upload</v-btn>
        </div>
      </v-form>
    </v-container>
    <div class="alert alert-light" role="alert">{{ message }}</div>
    <v-divider></v-divider>
    <template>
      <v-card
        class="mx-auto"
        max-width="100%"
      >
        <v-container class="py-0">
          <v-row
            align="center"
            justify="start"
          >
            <v-col v-if="!allSelected" cols="12">
              <v-text-field
                ref="search"
                v-model="search"
                full-width
                hide-details
                label="Search Clips"
                single-line
                append-icon="mdi-magnify"
                @click:append="$refs.search.focus()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-list
          class="result"
        >
          <template v-for="item in categories">
            <v-list-item
              v-if="!selected.includes(item)"
              :key="item.text"
              :disabled="loading"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-video</v-icon>
              </v-list-item-avatar>
              <v-btn class="ma-2" 
                rounded dense
                color="indigo" 
                dark
                @click="openClip(item.path)"
              >
                Open Link
              </v-btn>
              <div>
                <v-list-item> 
                  {{ item.name }} &dash; {{ dateDay(item.created_at) }}
                </v-list-item>
              </div>
              <v-spacer></v-spacer>
              <v-btn class="ma-2" 
                outlined dense
                color="red" 
                dark
                @click="deleteClip(item.id)"
              >
                Delete
              </v-btn>
            </v-list-item>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!selected.length"
            :loading="loading"
            color="purple"
            text
            @click="next"
          >Next</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
import UploadService from "../services/UploadFilesService";
export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: '',
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      vfile: [],
      vname: '',
      items: [],
      loading: false,
      search: '',
      selected: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    };
  },
  methods: {
    selectFile() {
      if (this.vfile.size > 20880694)
      {
        alert('Please select video clip size 20MB or less')
        this.vfile = []
        return
      }

      this.selectedFiles = this.vfile;
      console.log(this.selectedFiles.size)
    },
    upload() {

      if (!this.selectFile) 
      {
        return
      }

      if (!this.vname) 
      {
        return
      }
      

      this.progress = 0;
      this.currentFile = this.selectedFiles;
      UploadService.upload(this.currentFile, this.vname, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
      .then(response => {
        // console.log('im uploading')
        // console.log(response.data)
        this.message = response.data.message;
        return UploadService.getFiles();
      })
      .then(files => {
        //this.fileInfos = files.data;
        this.items = files.data;
        alert('File uploaded')
        this.selectedFiles = [];
        this.vfile = []
        this.vname = ''
        //this.$refs.form.reset()
      })
      .catch(() => {
        this.progress = 0;
        this.message = "Could not upload the file!";
        this.currentFile = undefined;
      });
    },
    openClip: function(link) {
      window.open(`${ this.siteURL }/watch?v=${ link }`);
    },
    deleteClip: function(id) {
      if (!confirm('Are you sure you like to delete this clip?')) {
        return;
      }
      // console.log(id)
      axios.delete(`${ this.siteURL }/api/clip/delete/${ id }`)
      .then(response => {
        // console.log(response.data)
        alert('Clip deleted')
        UploadService.getFiles().then(response => {
          this.items = response.data;
        });
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    dateDay: function(value) {
      if (value) {
        return dayjs(String(value)).format('MMM D')
      }
    },
    next () {
      this.loading = true
      setTimeout(() => {
        this.search = ''
        this.selected = []
        this.loading = false
      }, 2000)
    },
  },
  mounted() {
    UploadService.getFiles().then(response => {
      this.items = response.data;
    });
  },

  computed: {
    allSelected () {
      return this.selected.length === this.items.length
    },
    categories () {
      const search = this.search.toLowerCase()
      if (!search) return this.items
      return this.items.filter(item => {
        const text = item.name.toLowerCase()
        return text.indexOf(search) > -1
      })
    },
    selections () {
      const selections = []
      for (const selection of this.selected) {
        selections.push(selection)
      }
      return selections
    },
  },

  watch: {
    selected () {
      this.search = ''
    },
  },
};
</script>

<style>
.result{
  height:300px;/* or any height you want */
  overflow-y:auto
}
</style>
