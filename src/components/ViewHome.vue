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
 
    <div class="contenedor">
      <div id="categoriaCamisetas" class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen1.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisas Manga Corta
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">256</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">45</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>

        </v-card>

      </div>
      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen2.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisetas Estampadas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">125</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">28</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>
      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen3.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisetas Polo
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">170</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">35</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>

      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen4.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisetas Polo
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">450</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">100</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>

      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen5.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisetas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">60</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">25</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>


      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen6.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">525</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">185</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>

      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen7.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Gorras
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">650</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">200</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>

      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen8.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Gorras
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">350</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">82</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>

      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen9.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Vermudas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">925</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">532</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>

      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen10.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisetas Estampadas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">180</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">48</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>


      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen11.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Gorras
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">450</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">95</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>


      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen12.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Sudaderas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">820</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">290</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>


      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen13.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Sudaderas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">545</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">110</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>


      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen14.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Sudaderas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">100</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">25</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>


      <div class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../assets/img/Imagen15.jpeg" height="300px" cover></v-img>

          <v-card-title class="titulo">
            Camisetas Estampadas
          </v-card-title>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>

          <v-row class="mx-0"> <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
              size="small"></v-rating>
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <v-card-actions>
            <div class="corazon">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">480</span>
              <span class="me-3">·</span>
              <v-icon class="me-2" icon="mdi-share-variant"></v-icon>
              <span class="subheading">100</span>
            </div>

            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </div>

    </div>
  </v-app>



  <v-footer app dark height="auto" class="footer justify-center">
    <v-container fluid>
      <v-row text->
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

.contenedor {
  display: flex;
  flex-wrap: wrap;
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 7%;
}

.card {
  width: 33%;
  margin-bottom: 5%;
}

. {
  color: #BF722E;
}

.corazon {
  margin-left: 1%;
  margin-top: 10%;
  margin-bottom: 5%;
}

.titulo {
  margin-left: -3%;
}

.me-1 {
  color: red;
}
</style>