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
              :rules="[rules.counter]"
              counter
              maxlength="50"
            ></v-text-field>
            <v-text-field
              label="Outlet ID"
              outlined
              dense
              v-model="newOutlet_id"
              hint="strictly in (XX-XXX) format"
              :rules="[rules.required, rules.outlet]"
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
  props: [
    'getOutlets',
    'getAuth'
    ],
  data: () => ({
    newOutlet_name: "",
    newOutlet_id: "",
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 50 || 'Max 50 characters',
      outlet: value => {
        const pattern = /^[A-Z]{2}-[0-9]{3}$/
        return pattern.test(value) || 'Invalid Outlet ID.'
      },
    },
    errors: [],
  }),
  methods: {
    addOutlet: function(e) {
      this.errors = [];

      if (this.newOutlet_id == "" || this.newOutlet_name == "")
      {
        alert('Please fill outlet name and ID fields.');
        return;
      }

      if (!this.validOutletID(this.newOutlet_id)) {
        this.errors.push('Valid Outlet ID required.');
        return;
      }

      axios.post(`${ this.siteURL }/api/outlet`, {
          outlet_name: this.newOutlet_name,
          outlet_id: this.newOutlet_id,
        }, this.getAuth)
        .then(response => {
          
          if (response.data == 'outlet-exist')
          {
            alert('Outlet ID: ' + this.newOutlet_id + ' already exist');
          }
          else
          {
            alert('Outlet successfully added');
          }
          this.getOutlets();
          this.clearNewOutlet()

        })
        .catch(function (error) {
          console.log(error);
           this.errors.push(e)
        });

        if (!this.errors.length) {
          return true;
        }
        e.preventDefault();
    },
    clearNewOutlet: function() {
      this.newOutlet_name = "";
      this.newOutlet_id = "";
    },
    validOutletID: function (outletid) {
      var re = /^[A-Z]{2}-[0-9]{3}$/;
      return re.test(outletid);
    }
  }

}
</script>

<style>

</style>