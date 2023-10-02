<template>
  <v-app>
    <v-main>
      <v-carousel>
        <v-carousel-item src="../assets/img/Home7.jpg" cover></v-carousel-item>
        <v-carousel-item src="../assets/img/Home3.jpg" cover></v-carousel-item>
        <v-carousel-item src="../assets/img/Home5.jpg" cover></v-carousel-item>
        <v-carousel-item src="../assets/img/home12.jpg" cover></v-carousel-item>
      </v-carousel>

      <!-- <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover">
        <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slides.src">
          <v-sheet :color="colors[i]" height="100%">
            <div class="d-flex fill-height justify-center align-center">
              <v-img cover>{{ slide }}</v-img>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel> -->
    </v-main>


    

  </v-app>

  <v-footer app dark height="auto" class="footer justify-center">
    <v-container fluid>
      <v-row text-align="center">
        <v-col>
          <v-card class="flex" flat tile>

            <v-card-actions class="grey darken-3 justify-center">
              &copy;2023 — <strong>Grupo CGS2 SaTovar/CJimenez/JSBuitrago</strong>
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
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
    ],
    slides: [

      {
        src: '../assets/img/Home3.jpg',
      },
      {
        src: "../assets/img/Home2.jpg",
      },
      {
        src: "../assets/img/Home1.jpg",
      },

    ],

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
