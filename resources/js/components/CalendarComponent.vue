<template>
  <v-row>
    <v-col
      align="center"
      justify="center"
    >
      <v-sheet 
        style="maxWidth: 500px"
        :fullscreen="$vuetify.breakpoint.mobile"
      >
        <v-calendar
          ref="calendar"
          v-model="calendar.today"
          :now="calendar.today"
          :value="calendar.today"
          :events="calendar.events"
          color="primary"
          type="day"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    calendar: Object
  }
}
</script>

<style>

</style>