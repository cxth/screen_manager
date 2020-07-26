<template>
  <v-container class="grey darken-4 pt-8 pb-8">
    <v-row
      align="center"
      justify="center"
    >
      <v-col sm="9">
        <v-card
          class="pa-6"
          outlined
          tile
        >
          <div class="pb-2">
            <v-chip
              class="ma-1"
              color="primary"
              outlined
              pill
            >
              Auto-Login URL
              <v-icon right>mdi-account-key</v-icon>
            </v-chip>
              <span class="font-weight-thin"> 
                {{ screen_autologin }}
              </span>
          </div>
          <div class="pa-2">
            <v-chip
              class="ma-1"
              color="primary"
              outlined
              pill
            >
              Now Showing
              <v-icon right>mdi-play-circle</v-icon>
            </v-chip>
              <span class="font-weight-thin"> 
                {{ screen_now_showing }}
              </span>
          </div>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props:['screen_autologin','screen_now_showing']
}
</script>

<style>

</style>