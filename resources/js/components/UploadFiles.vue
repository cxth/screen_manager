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

    <!-- <label class="btn btn-default"> -->
      <!-- <input type="file" ref="file" @change="selectFile" /> -->
      <v-container class="ma-5">
        <v-file-input 
          show-size 
          v-model="vfile"
          accept="video/*" 
          label="File input"
          prepend-icon="mdi-file-video"
          ref="file" 
          @change="selectFile"
          
        >
        </v-file-input>
         <v-text-field
            label="Video Name"
            v-model="vname"
            prepend-icon="mdi-rename-box"
          ></v-text-field>
        
            <!-- <button class="btn btn-success"  @click="upload">
              Upload
            </button> -->
          <div class="text-center">
            <v-btn rounded color="primary" dark @click="upload">Upload</v-btn>
          </div>
      </v-container>
 
    <!-- </label> -->

    

    <div class="alert alert-light" role="alert">{{ message }}</div>

    <v-divider></v-divider>

    <div class="card">
      <div class="card-header">List of Files</div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(file, index) in fileInfos"
          :key="index"
        >
          <a :href="file.path">{{ file.name }}</a>
        </li>
      </ul>
    </div>
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
      vname: ''
    };
  },
  methods: {
    selectFile() {
      
      // console.log(this.$refs.file.files)
      // this.selectedFiles = this.$refs.file.files;

      console.log(this.vname)
      console.log(this.vfile)
      this.selectedFiles = this.vfile;
    },

    upload() {
    
      this.progress = 0;

      //this.currentFile = this.selectedFiles.item(0);

      this.currentFile = this.selectedFiles;
        
      UploadService.upload(this.currentFile, this.vname, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then(response => {
          console.log('im uploading')
          console.log(response.data)
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then(files => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
      

      // console.log('mydata')
      // console.log(this.currentFile)
      // axios({
      //     method: 'post',
      //     url: `${ this.siteURL }/api/upload`,
      //     data: {
      //       file: this.currentFile
      //     },
      //     headers: {
      //       "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
      //     }
      // }).then(response => {
      //     console.log(response.data)
      // })
      // .catch(e => {
      //     this.errors.push(e)
      //     console.log('error uploading file')
      // });

      alert('File uploaded')
      this.vfile = []
      this.vname = ''
    }
  },
  mounted() {
    UploadService.getFiles().then(response => {
      this.fileInfos = response.data;
    });
  }
};
</script>
