
<style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>


<template>
  <div>
    <navbar></navbar>
    <h1  align="center" > Venues Edit page  <img src="https://img.icons8.com/clouds/80/000000/multi-edit.png"> </h1>

    <b-container>

    <b-card bg-variant="dark" text-variant="white" title="Venues Edit page">

      <table>
        <tr>
          <b-input-group class="mb-3" prepend="Venue name:">
            <b-form-input v-model="venueName" placeholder="Enter venue name"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3" prepend="Category ID:">
            <b-form-input v-model="category" placeholder="Enter category ID from 1-5"></b-form-input>
          </b-input-group>


          <b-input-group class="mb-3" prepend="Short description:">
            <b-form-input v-model="shortDescription" placeholder="Enter short description"></b-form-input>
          </b-input-group>


          <b-input-group class="mb-3" prepend="Long description:">
            <b-form-input v-model="longDescription" placeholder="Enter long description"></b-form-input>
          </b-input-group>


          <b-input-group class="mb-3" prepend="City:">
            <b-form-input v-model="city" placeholder="Enter city name"></b-form-input>
          </b-input-group>


          <b-input-group class="mb-3" prepend="Address:">
            <b-form-input v-model="address" placeholder="Enter your address"></b-form-input>
          </b-input-group>


          <b-input-group class="mb-3" prepend="Latitude:">
            <b-form-input v-model="latitude" placeholder="Enter latitude <= 90"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3" prepend="longitude:">
            <b-form-input v-model="longitude" placeholder="Enter longitude <= 90"></b-form-input>
          </b-input-group>
        </tr>

      </table>

      <b-button  variant="success" v-on:click= "Edit(venue.venueId)"> Change </b-button>
      <b-button  variant="danger" v-on:click= "moveToVenueList()"> Close </b-button>
    </b-card>

    </b-container>





    </div>
</template>


<script>
  import Navbar from './Navbar.vue'
  export default {
    components :{Navbar},


    data (){
      return {
        venueName: '',
        category: '',
        shortDescription: '',
        longDescription: '',
        city : '',
        address : '',
        latitude: '',
        longitude: '',
        venue : '',
        singleVenueInfo : '',
      }

    },
    mounted : function () {
      this.getVenue();
    },

    methods: {

      moveToVenueList : function(){
        this.$router.push({ name: 'venuesList'});
      },

      getVenue : function () {
        this.venue = this.$route.params.venue;
        this.singleVenueInfo = this.$route.params.singleVenueInfo;
        this.venueName = this.singleVenueInfo.venueName  ;
        this.category = this.singleVenueInfo.category.categoryId;
        this.shortDescription = this.singleVenueInfo.shortDescription;
        this.longDescription = this.singleVenueInfo.longDescription;
        this.city = this.singleVenueInfo.city;
        this.address = this.singleVenueInfo.address;
        this.latitude = this.singleVenueInfo.latitude;
        this.longitude = this.singleVenueInfo.longitude;
      },
      Edit : function (id) {
        var header = {};
        header["X-Authorization"] = this.$cookies.get('token');
        console.log(header);
        this.$http.patch('http://127.0.0.1:4941/api/v1/venues/' + id , JSON.stringify({
          "venueName": this.venueName.toString(),
          "categoryId": parseInt(this.category),
          "city": this.city,
          "shortDescription": this.shortDescription,
          "longDescription": this.longDescription,
          "address": this.address,
          "latitude": parseInt(this.latitude),
          "longitude": parseInt(this.longitude),
        }) , {headers : header})
          .then(function (response) {

            alert('Successful'.toUpperCase());
            this.$router.push({ name: 'venuesList'});
          }, function (error) {
            console.log(error);
            if(error.statusText === 'Bad Request: categoryId does not match any existing category'){
              alert(error.statusText.slice(13, error.statusText.length).toUpperCase())
            }
            else{
              alert(error.statusText.slice(18, error.statusText.length).toUpperCase())
            }
            }
          )
      }
    }
  }

</script>
