<template>


    <div>
      <navbar></navbar>
      <b-container align="center">
    <h1  align="center" > Create Venue <img src="https://img.icons8.com/color/64/000000/create-new.png"> </h1>
    

      <b-card bg-variant="dark" text-variant="white" title="Venue Form">

        <div>
          <b-input-group
            class="mb-3"
            prepend="Venue name:"
          >
            <b-form-input v-model="venueName" placeholder="Enter venue name" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <div>
          <b-input-group
            class="mb-3"
            prepend="Category:"
          >
            <b-form-input v-model="category" placeholder="Enter category ID from 1-5" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <div>
          <b-input-group
            class="mb-3"
            prepend=" Short description:"
          >
            <b-form-input v-model="shortDescription" placeholder="Enter short description" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <div>
          <b-input-group
            class="mb-3"
            prepend="Long description:"
          >
            <b-form-input v-model="longDescription" placeholder="Enter long description" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <div>
          <b-input-group
            class="mb-3"
            prepend="City:"
          >
            <b-form-input  v-model="city" placeholder="Enter city name" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <div>
          <b-input-group
            class="mb-3"
            prepend="Address:"
          >
            <b-form-input v-model="address" placeholder="Enter your address" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <div>
          <b-input-group
            class="mb-3"
            prepend="Latitude:"
          >
            <b-form-input v-model="latitude" placeholder="Enter latitude <= 90" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <div>
          <b-input-group
            class="mb-3"
            prepend="Longitude:"
          >
            <b-form-input v-model="longitude" placeholder="Enter longitude <= 90" @input="updateSearch()"></b-form-input>
            <b-input-group-append>
              <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ givenName }}</div>-->
        </div>

        <button v-on:click="postVenue()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteUserModal">
          Create
        </button>

        <!--<b-card-text>-->
        <!--With supporting text below as a natural lead-in to additional content.-->
        <!--</b-card-text>-->
        <!--<b-button href="#" variant="primary">Go somewhere</b-button>-->
      </b-card>

      <router-link :to = "{ name: 'home'}" > Back to Home </router-link>
      </b-container>
    </div>

</template>
<script>
  import Navbar from './Navbar.vue'
  export default {
    components :{Navbar},
      data() {
        return {
          venueName: '',
          category: '',
          shortDescription: '',
          longDescription: '',
          city: '',
          address: '',
          latitude: '',
          longitude: '',
          error: '',
        };
      },
      methods: {
        postVenue: function () {
          var header = {};
          header["X-Authorization"] = this.$cookies.get('token');
          console.log(header);

          // this.category = parseInt(this.category);
          // this.latitude = parseInt(this.latitude);
          // this.longitude = parseInt(this.longitude);

          this.$http.post('http://127.0.0.1:4941/api/v1/venues', JSON.stringify({
            "venueName": this.venueName,
            "categoryId": parseInt(this.category),
            "city": this.city,
            "shortDescription": this.shortDescription,
            "longDescription": this.longDescription,
            "address": this.longDescription,
            "latitude": parseInt(this.latitude),
            "longitude": parseInt(this.longitude),
          }) , {headers : header})
            .then(function (response) {
              alert('Successful'.toUpperCase());
              this.$router.push({
                name: 'home', params: {
                  login: true,
                  username: this.userName,
                  password: this.password
                }
              });
              console.log(response);
            }, function (error) {
              console.log(error);
              if(error.statusText === 'Bad Request: categoryId does not match any existing category'){
                alert(error.statusText.slice(13, error.statusText.length).toUpperCase())
              }
              else{
                alert(error.statusText.slice(18, error.statusText.length).toUpperCase())
              }
            })
          }
        }
    }

</script>

<style scoped>

</style>
