<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Activation Date"
        prepend-icon="event"
        readonly
        v-bind="attrs"
        v-on="on"
        single-line dense
        suffix="(auto-save)"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="2010-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    props: [
      'screen_activation_date',
      'selected',
      'getAuth'
    ],
    data: () => ({
      menu: false,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        
        // axios({
        //   method: 'post',
        //   url: `${ this.siteURL }/api/getscreen`,
        //   data: {
        //     id: this.selected.screen,
        //     activation_date: date
        //   }
        // }).then(response => {

        // })
        // .catch(e => {
        //     this.errors.push(e)
        //     console.log('error getting auto login')
        // });

        axios.post(`${ this.siteURL }/api/getscreen`, {
            id: this.selected.screen,
            activation_date: date
        }, this.getAuth)
        .then(response => {
          
        })
        .catch(function (error) {
          this.errors.push(e)
          console.log('error getting auto login')
        });

        this.$refs.menu.save(date)
        this.$emit('save', date)
      },
    },
    created() {
      this.date = this.screen_activation_date
    },
    computed: {
      date: {
        get: function (event) {
          return this.screen_activation_date
        },
        set: function (newEvent) {

        }
      }
    }
  }
</script>

<style>

</style>