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

<style scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
  }

  .my-event.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
</style>