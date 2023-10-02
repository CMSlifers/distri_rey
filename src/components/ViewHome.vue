<template>
  <v-app>
    <v-main>
      <h1>Soy Home</h1>
    </v-main>
  </v-app>

  <v-footer app dark height="auto" class="footer justify-center" >
    <v-container fluid>
      <v-row text-align="center">
        <v-col>
          <v-card class="flex" flat tile>

            <v-card-actions class="grey darken-3 justify-center">
              &copy;2023 — <strong>CGS2</strong>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
  })
}
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;

}
</style>
