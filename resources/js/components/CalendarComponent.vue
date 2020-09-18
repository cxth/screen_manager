<template>
  <v-row>
    <v-col
      align="center"
      justify="center"
    >
      <v-sheet 
        style="maxWidth: 800px"
        :fullscreen="$vuetify.breakpoint.mobile"
        outlined
      >
        <v-toolbar
            class="grey darken-4"
            flat
            dense
            dark
            
          >
          <v-spacer></v-spacer>
          <v-toolbar-title
           style="text-align: center; width: 100%"
          >
            {{ selected.screen_name }}
          </v-toolbar-title>
          
          <v-btn
            fab
            small
            absolute
            left
            color="primary"
            @click="$refs.calendar.prev()"
          >
            <v-icon dark>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            absolute
            right
            color="primary"
            @click="$refs.calendar.next()"
          >
            <v-icon dark>mdi-chevron-right</v-icon>
          </v-btn>
         
        </v-toolbar>
        <v-calendar
          ref="calendar"
          v-model="calendar.today"
          :now="calendar.today"
          :value="calendar.today"
          :events="calendar.events"
          color="primary"
          type="4day"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    calendar: Object,
    selected: Object
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