<template>
  <v-form>
    <v-container
      class="grey darken-4"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col 
          cols="12" 
          sm="4"
          class="mt-10 mb-10"  
        >
            <v-text-field
              label="Outlet Name"
              outlined
              dense
              v-model="newOutlet_name"
            ></v-text-field>
            <v-text-field
              label="Outlet ID (XX-XXX format)"
              outlined
              dense
              v-model="newOutlet_id"
            ></v-text-field>
        
            <v-row
              align="center"
              justify="center"
            >
                <v-btn rounded color="primary" dark @click="addOutlet" class="mr-2">SAVE</v-btn>
                <v-btn rounded color="primary" dark @click="clearNewOutlet" class="ml-1">CLEAR</v-btn>
            </v-row>
      
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ['getOutlets'],
  data: () => ({
    newOutlet_name: null,
    newOutlet_id: null
  }),
  methods: {
    addOutlet: function(event) {
      console.log('adding outlet');
      console.log(this.newOutlet_name);
      console.log(this.newOutlet_id);
      if (this.newOutlet_id == null || this.newOutlet_name == null)
      {
        return;
      }

      axios({
          method: 'post',
          url: `${ this.siteURL }/api/outlet`,
          data: {
            outlet_name: this.newOutlet_name,
            outlet_id: this.newOutlet_id,
          }
      }).then(response => {
          console.log('from add outlet api');
          console.log(response.data)
          this.getOutlets();
          alert('Outlet successfully added');
          this.clearNewOutlet()
        })
        .catch(e => {
            this.errors.push(e)
        });
    },
    clearNewOutlet: function() {
      this.newOutlet_name = null;
      this.newOutlet_id = null;
    },
  }

}
</script>

<style>

</style>