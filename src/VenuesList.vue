
<style scoped>
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
    background-color: #dddddd;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>


<template>
  <div>
    <div id = "venues">
      <navbar></navbar>



      <h1 align="center"> Your Venues <img src="https://img.icons8.com/cotton/64/000000/checklist.png"> </h1>
      <div class="container">

        <h5>
          Choose image to upload:
          <input class="center" type="file" @change="onFileChanged" style="width:250px">
        </h5>

      <table>
        <th>Photo <img src="https://img.icons8.com/color/48/000000/image.png"> </th>
        <th>Name <img src="https://img.icons8.com/office/30/000000/performance.png"> </th>
        <th>City <img src="https://img.icons8.com/dusk/30/000000/city.png"> </th>
        <th>Category Name <img src="https://img.icons8.com/color/20/000000/autograph.png"> </th>
        <th>Mean Star Rating <img src="https://img.icons8.com/color/20/000000/christmas-star.png"></th>
        <th>Mode Cost Rating <img src="https://img.icons8.com/dusk/20/000000/expensive.png"> </th>
        <tr v-for = "venue in VenuesSelected">
          <td>
            <div v-if= "venue.primaryPhoto === null">
              <img src="./assets/default.png" style="width:200px;height:150px"></img>
            </div>
            <div v-else>
              <img :src="getImageUrl(venue.venueId, venue.primaryPhoto )"  style="width:200px;height:150px"></img>
            </div>
          </td>
          <td>
            {{venue.venueName}}
            <b-button size="sm" variant="success" v-on:click="moveEditVenue(venue.venueId)">Edit</b-button>
            <b-button size="sm" variant="success" v-on:click="moveEditVenue(venue.venueId)">Add picture</b-button>
          </td>
          <!--<td> {{ venue.venueName }} </td>-->
          <td> {{ venue.city }} </td>
          <td> {{ venue.categoryName }} </td>
          <td> {{ venue.meanStarRating }} </td>
          <td> {{ venue.modeCostRating }} </td>
          <!--<td><router-link :to="{ name: 'user', params: { userId: user.user_id }}"> View </router-link></td>-->
        </tr>
      </table>

      <div align="center">
        <router-link :to = "{ name: 'home'}" > Back to Home </router-link>
      </div>

      <div class="text-xs-center" >
        <nav aria-label="...">
          <ul class="pagination text-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">1</a>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  export default {
    components :{Navbar},
    data (){
      return{
        error : "",
        errorFlag : false,
        allVenues : [],
        VenuesSelected : [],
        allCategories : [],
        selectedFile : null
      }
    },
    mounted : function () {
      this . getVenues ();
      this.updateSearch();
    },
    methods : {

      onFileChanged (event) {
        this.selectedFile  = event.target.files[0];
        console.log(this.selectedFile)
      },
      onUpload() {

        var header = {};
        header["X-Authorization"] = this.$cookies.get('token');
        header["Content-Type"] = 'image/png';
        // let data = new FormData();
        // data.append('file', this.selectedFile);

        this.$http.put('http://127.0.0.1:4941/api/v1/users/' + this.userId + '/photo', this.selectedFile, {headers : header})
          .then(function (response) {
            alert("Success");
            this.$router.push({ name: 'home'});
            // this.getUser();
            // this.photo = true;

            console.log(response);
          },  function (error) {
            alert(error);
          });

      },
      getVenues : function () {
        let paramVenue =  {};
        paramVenue.adminId = parseInt(this.$cookies.get('userId'));
        this . $http . get ( 'http://127.0.0.1:4941/api/v1/venues', {
          params : paramVenue
        })
          . then ( function ( response ) {
            this . allVenues = response.data;
            this . $http . get ( 'http://127.0.0.1:4941/api/v1/categories')
              . then ( function ( response ) {
                this.allCategories = response . data;
                for(let venue of this.allVenues){
                  for(let category of this.allCategories){
                    if (venue.categoryId === category.categoryId){
                      venue.categoryName = category.categoryName;
                    }
                  }
                }
                this . VenuesSelected = this.allVenues;
                console.log(this.allVenues);
              }, function ( error ) {
                this . error = error;
                this . errorFlag = true;
              })
          }, function ( error ) {
            this . error = error;
            this . errorFlag = true;
          });
      },

      updateSearch : function () {
        this.VenuesSelected = [];
        var searchLowCase = this.searchKey.toLowerCase();
        for(let venue of this.allVenues){
          let starCompare = venue.meanStarRating;
          if(starCompare === null){
            starCompare = 3;
          }
          let costCompare = venue.modeCostRating;
          if(costCompare === null){
            costCompare = 0;
          }
          if((this.selectedCost === null || costCompare <= this.selectedCost) && (this.selected === null || venue.city === this.selected) && (this.selectedStar === null || starCompare >= this.selectedStar) && (this.selectedCategory === null || venue.categoryName === this.selectedCategory) && (venue.city.toLowerCase().includes(searchLowCase) || venue.venueName.toLowerCase().includes(searchLowCase)  || venue.categoryName.toLowerCase().includes(searchLowCase))){
            this.VenuesSelected.push(venue);
          }
        }
        if(this.selectedSort === 'Descending Star Rating'){
          this.VenuesSelected.sort(this.VenuesSelected.meanStarRating);
        }
        if(this.selectedSort === 'Ascending Star Rating'){
          this.VenuesSelected.sort(this.VenuesSelected.meanStarRating);
          this.VenuesSelected.reverse();
        }
        if(this.selectedSort === 'Descending Cost Rating'){
          this.VenuesSelected.sort(this.VenuesSelected.modeCostRating);
        }
        if(this.selectedSort === 'Ascending Cost Rating'){
          this.VenuesSelected.sort(this.VenuesSelected.modeCostRating);
          this.VenuesSelected.reverse();
        }
      },
      getImageUrl(id, photoName) {
        return 'http://127.0.0.1:4941/api/v1/venues/' + id + '/photos/' + photoName;
      },

      moveEditVenue : function(id){
        for(let venue of this.allVenues){
          if (venue.venueId === id){
            this.thisVenue = venue;
          }
        }
        this . $http . get ( 'http://127.0.0.1:4941/api/v1/venues/'+id)
          . then ( function ( response ) {
            this.singleVenueInfo = response.data;
            // token = this.$router.params.token
            console.log(this.singleVenueInfo);
            if(this.singleVenueInfo.admin.userId === parseInt(this.$cookies.get('userId'))){
              this.$router.push({ name: 'venuesEdit', params: {
                  venue : this.thisVenue,
                  singleVenueInfo : this.singleVenueInfo,
                  token : this.$cookies.get('token')
                }});
            }
            else {
              alert('You are not Admin for this venue')
            }
          });
      },
    }
  }
</script>
