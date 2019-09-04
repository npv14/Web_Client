
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

  <!--<div>-->
    <div v-if = "$route.params.venueId">
      <div id = "venue">
        <navbar></navbar>
        <div class="container" align="center">


        <h1 align="center" > {{this.singleVenueInfo.venueName}} </h1>
        <h5 align="center"> {{this.singleVenueInfo.address}} </h5>
        <div v-if= "this.singleVenueInfo.photos.length === 0">
          <img src="./assets/default.png" style="width:300px;height:300px"  class="center" >
        </div>
        <div v-else>
          <img align="center" :src="getImageUrl($route.params.venueId, this.singleVenueInfo.photos[0].photoFilename)"   style="width:300px;height:300px"  >
        </div>
        <!--<h1> Venue page </h1>-->
        <!--<h1> {{$route.params.venueId}} </h1>-->
        <!--<br /><br />-->
        <table>
          <tr><th>Category</th><td colspan="4">{{this.singleVenueInfo.category.categoryName}}</td></tr>
          <tr><th>Administrator User Name</th><td colspan="4">{{this.singleVenueInfo.admin.username}}</td></tr>
          <tr><th>City</th><td colspan="4">{{this.singleVenueInfo.city}}</td></tr>
          <tr><th>Address</th><td colspan="4">{{this.singleVenueInfo.address}}</td></tr>
          <tr><th>Date Added</th><td colspan="4">{{this.singleVenueInfo.dateAdded.slice(0,10)}}</td></tr>
          <tr><th>Description</th><td colspan="4"> {{this.singleVenueInfo.shortDescription}}
            <div v-if="this.singleVenueInfo.shortDescription.includes(this.singleVenueInfo.longDescription) === false">
              <button v-on:click= "expandDescription()"> Read more </button>
            </div>
          </td>
          </tr>
          <tr><th>Mean Star Rating</th><td colspan="4">{{this.thisVenue.meanStarRating}}</td></tr>
          <tr><th>Mode Cost Rating</th><td colspan="4">{{this.thisVenue.modeCostRating}}</td></tr>
          <tr><th colspan="6">Reviews <img src="https://img.icons8.com/ultraviolet/40/000000/popular-topic.png"> </th></tr>
          <tr>
            <th>Review Author</th>
            <th>Review Body</th>
            <th>Star Rating</th>
            <th>Cost Rating</th>
            <th>Time Posted</th>
          </tr>
          <tr  v-for = "review of listReviews">
          <td>{{review.reviewAuthor.username}}</td>
          <td>{{review.reviewBody}}</td>
          <td>{{review.starRating}}</td>
          <td>{{review.costRating}}</td>
          <td>{{review.timePosted.slice(0, 10) + ':' + review.timePosted.slice(12, 19) }}</td>
          </tr>


          <!--<tr> {{getVenueInfo($route.params.venueId).venueName}} </tr>-->
        </table>
          <div v-if="this.userId !== this.singleVenueInfo.admin.userId" align="center" >
            <button v-if="this.login.toString() === 'true'"   v-on:click= "moveToReview($route.params.venueId)"  > Add Review  </button>
          </div>
        <!--<div> {{getVenueInfo($route.params.venueId).venueName}} </div>-->
        <router-link :to = "{ name: 'venues'}" @click.native="resetListId()" > Back to Venues </router-link>
        </div>
      </div>

    </div>




  <!--</div>-->




  <div v-else>
    <div id = "venues">
      <navbar></navbar>

    <div class="container" align="center">
      <h1> Venues page  <img src="https://img.icons8.com/color/48/000000/gallery.png"> </h1>

      <div class="row">
        <div class="col-sm">
        <b-form-select class="mb-2" v-model="selected" :options="options" @input="updateSearch()"></b-form-select>
          <div class="mb-4" >Selected city: <strong>{{ selected }}</strong></div>
        </div>
        <div class="col-sm">
          <b-form-select class="mb-2" v-model="selectedCategory" :options="optionsCategory" @input="updateSearch()"></b-form-select>
          <div class="mb-4" >Selected Category: <strong>{{ selectedCategory }}</strong></div>
        </div>
        <div class="col-sm">
          <b-form-select class="mb-2" v-model="selectedSort" :options="optionsSort" @input="updateSearch()"></b-form-select>
          <div class="mb-4" >Sort by: <strong>{{ selectedSort }}</strong></div>
        </div>
        <div class="col-sm">
          <b-form-select class="mb-2" v-model="selectedStar" :options="optionsStar" @input="updateSearch()"></b-form-select>
          <div class="mb-4" >Selected Star: <strong>{{ selectedStar }}</strong></div>
        </div>
        <div class="col-sm">
          <b-form-select class="mb-2" v-model="selectedCost" :options="optionsCost" @input="updateSearch()"></b-form-select>
          <div class="mb-4" >Selected Cost: <strong>{{ selectedCost }}</strong></div>
        </div>
      </div>




    <div>
      <b-input-group
        class="mb-3"
        prepend="Enter key word:"
      >
        <b-form-input v-model="searchKey" placeholder="Enter your name" @input="updateSearch()"></b-form-input>
        <b-input-group-append>
          <b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search <img src="https://img.icons8.com/ultraviolet/20/000000/search.png"></b-button>
        </b-input-group-append>
      </b-input-group>
      <!--<div class="mt-2">Value: {{ searchKey }}</div>-->
    </div>



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
              <img src="./assets/default.png" style="width:200px;height:100px"></img>
            </div>
            <div v-else>
              <img :src="getImageUrl(venue.venueId, venue.primaryPhoto )" style="width:200px;height:100px" ></img>
            </div>
          </td>
          <td>
            <router-link :to="{ name: 'venue', params: {venueId: venue.venueId}}" @click.native="getVenueInfo(venue.venueId)"> {{ venue.venueName }}</router-link>
          </td>
          <!--<td> {{ venue.venueName }} </td>-->
          <td> {{ venue.city }} </td>
          <td> {{ venue.categoryName }} </td>
          <td> {{ venue.meanStarRating }} </td>
          <td> {{ venue.modeCostRating }} </td>
        <!--<td><router-link :to="{ name: 'user', params: { userId: user.user_id }}"> View </router-link></td>-->
      </tr>
    </table>


    <div>
      <router-link :to = "{ name: 'home'}" > Back to Home </router-link>
    </div>

    <div class="text-xs-center" >
    <nav aria-label="...">
      <ul class="pagination text-center">

        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">1</a>
        </li>
        <li class="page-item" v-for = "number in this.numPage" >
          <a class="page-link" href="#">{{number}}</a>
        </li>
        <!--<li class="page-item"><a class="page-link" href="#">3</a></li>-->
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
        login : false,
        error : "",
        userId : '',
        listReviewedId : [],
        token : '',
        errorFlag : false,
        allVenues : [],
        VenuesSelected : [],
        allCategories : [],
        searchKey : '',
        selected: null,
        singleVenueInfo: null,
        thisVenue: null,
        listReviews : null,
        selectedCategory: null,
        selectedStar: null,
        selectedCost: null,
        numPage: 1,
        selectedSort: 'Descending Star Rating',
        optionsCategory: [
          {value: null,text:'Please select a Category'},
          {value: 'Cafés & Restaurants',text:'Cafés & Restaurants'},
          {value: 'Accommodation',text:'Accommodation'},
          {value: 'Nature Spots',text:'Nature Spots'},
          {value: 'Attractions',text:'Attractions'},
          {value: 'Events',text:'Events'},
        ],
        optionsSort: [
          {value: 'Descending Star Rating',text:'Descending Star Rating'},
          {value: 'Ascending Star Rating',text:'Ascending Star Rating'},
          {value: 'Descending Cost Rating',text:'Descending Cost Rating'},
          {value: 'Ascending Cost Rating',text:'Ascending Cost Rating'},
        ],

        options: [
          {value: null,text:'Please select a City'},

        ],
        optionsStar: [
          {value: null,text:'Please select a Star'},
          {value: '1',text:'1'},
          {value: '2',text:'2'},
          {value: '3',text:'3'},
          {value: '4',text:'4'},
          {value: '5',text:'5'},
        ],

        optionsCost: [
          {value: null,text:'Please select a Cost'},
          {value: '0',text:'Free'},
          {value: '1',text:'$'},
          {value: '2',text:'$$'},
          {value: '3',text:'$$$'},
          {value: '4',text:'$$$$'},
        ]

      }
    },
    mounted : function () {
      this . getVenues ();
      this.updateSearch();
      this.getVenueInfo(this.$route.params.venueId);
    },
    methods : {

      moveToReview : function(id){
        if(this.listReviewedId.includes(this.userId)){
          alert("You all ready reviewed for this venue")
        }
        else{
          this.$router.push({ name: 'review', params: {
              token : this.token,
              id : id,
            }});
        }
      },

      getVenues : function () {
        this.userId = parseInt(this.$cookies.get('userId'));
        this.token = this.$cookies.get('token');

        this.login = this.$cookies.get('login');
        console.log('haha');
        console.log(this.login);

        this . $http . get ( 'http://127.0.0.1:4941/api/v1/venues')
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
                this.numPage = parseInt(this.VenuesSelected.length / 10);
                // console.log(this.allVenues);
                var checkCity = [] ;
                var City = [] ;
                City.push({value: null,text:'Please select a City'});
                for (let venue of this.allVenues ) {
                  let city = {};
                  city.value = venue.city;
                  city.text = venue.city;
                  // console.log(city);
                  // console.log(checkCity.includes(city.text) === false);

                  if (checkCity.includes(city.text) === false){
                    checkCity.push(city.text);
                    City.push(city);
                  }

                }
                this.options = City;

              }, function ( error ) {
                this . error = error;
                this . errorFlag = true;
              })
          }, function ( error ) {
            this . error = error;
            this . errorFlag = true;
          });
      },
      resetListId : function() {
        this.listReviewedId = [];
      },
      updateSearch : function () {
        this.VenuesSelected = [];
        var searchLowCase = this.searchKey.toLowerCase();

        for(let venue of this.allVenues){

          let starCompare = venue.meanStarRating;

          if(venue.meanStarRating === null){
            starCompare = 3;
          }
          // console.log("venue",venue);

          let costCompare = venue.modeCostRating;
          // console.log("costCompare",costCompare);
          if(costCompare === null){
            costCompare = 0;
          }

          venue.starCompare = starCompare;
          venue.costCompare = costCompare;

          // console.log("costCompare",venue.costCompare);

          if((this.selectedCost === null || costCompare <= this.selectedCost) && (this.selected === null || venue.city === this.selected) && (this.selectedStar === null || starCompare >= this.selectedStar) && (this.selectedCategory === null || venue.categoryName === this.selectedCategory) && (venue.city.toLowerCase().includes(searchLowCase) || venue.venueName.toLowerCase().includes(searchLowCase)  || venue.categoryName.toLowerCase().includes(searchLowCase))){
            this.VenuesSelected.push(venue);
          }
        }

        if(this.selectedSort === 'Descending Star Rating'){
          this.VenuesSelected.sort(this.VenuesSelected.starCompare);
        }
        else if(this.selectedSort === 'Ascending Star Rating'){
          this.VenuesSelected.sort(this.VenuesSelected.starCompare);
          this.VenuesSelected.reverse();
        }
        else if(this.selectedSort === 'Descending Cost Rating'){
          this.VenuesSelected.sort((r1, r2) => {
            return r2.costCompare - r1.costCompare
          });
        }
        else if(this.selectedSort === 'Ascending Cost Rating'){
          this.VenuesSelected.sort((r1, r2) => {
            return r2.costCompare - r1.costCompare
          });
          this.VenuesSelected.reverse();
        }
        console.log('asssssssssssssaasas', this.allVenues.length());
        this.numPage = parseInt(this.allVenues.length / 10);
        console.log('asssssssssssss', this.numPage);

      },
      getImageUrl(id, photoName) {
          return 'http://127.0.0.1:4941/api/v1/venues/' + id + '/photos/' + photoName;
      },

      // moveEditVenue : function(id){
      //   for(let venue of this.allVenues){
      //     if(venue.venueId === id){
      //       this.thisVenue = venue;
      //     }
      //   }
      //
      //   this . $http . get ( 'http://127.0.0.1:4941/api/v1/venues/'+id)
      //     . then ( function ( response ) {
      //       this.singleVenueInfo = response.data;
      //       // token = this.$router.params.token
      //       console.log(this.singleVenueInfo);
      //       if(this.singleVenueInfo.admin.userId === this.$cookies.get('userId')){
      //         this.$router.push({ name: 'venuesEdit', params: {
      //             venue : this.thisVenue,
      //             singleVenueInfo : this.singleVenueInfo,
      //             token : this.$cookies.get('token')
      //           }});
      //       }
      //       else {
      //         alert('You are not Admin for this venue')
      //       }
      //     });
      //
      //
      // },


      getVenueInfo : function (id){
        console.log("come here");
        for(let venue of this.allVenues){
          if(venue.venueId === id){
            this.thisVenue = venue;
          }
        }
        this . $http . get ( 'http://127.0.0.1:4941/api/v1/venues/'+id)
          . then ( function ( response ) {
            this.singleVenueInfo = response.data;
          });
        this . $http . get ( 'http://127.0.0.1:4941/api/v1/venues/'+id+'/reviews')
          . then ( function ( response ) {
            this.listReviews = response.data.sort(response.data.timePosted);
            this.listReviews.sort((r1, r2) => {
              return new Date(r2.timePosted) - new Date(r1.timePosted)
            });
            for (let review of this.listReviews){
              this.listReviewedId.push(review.reviewAuthor.userId);
            }
            console.log(this.listReviewedId);
            console.log(this.listReviewedId.includes(3));



            // this.listReviews.sort(parseInt());
            //   return new Date(b.date) - new Date(a.date);
            // });
            // console.log(this.listReviews[0].timePosted.slice(0,4));
          });

        // return this.singleVenueInfo;

      },
      expandDescription : function (){
        this.singleVenueInfo.shortDescription  = this.singleVenueInfo.shortDescription +  "," + this.singleVenueInfo.longDescription;
      }
      // deleteUser : function ( user_id ) {
      //   this . $http . delete ( 'http://127.0.0.1:8000/api/users/' + user_id)
      //     . then ( function ( response ){
      //       for ( var i = 0 ; i < this . users . length ; i ++){
      //         if ( user_id === this . users [ i ]. user_id ){
      //           this . users . splice ( i , 1 );
      //         }
      //       }
      //       this . $router . push ( '/users' );
      //     }, function ( error ){
      //       this . error = error;
      //       this . errorFlag = true;
      //     });
      // }


    }
  }
</script>
