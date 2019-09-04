<style scoped>
  a {
    color: white;
  }
</style>

<template>
  <div>
    <div id = "Home">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand >
            <router-link :to = "{ name: 'home'}"> Home Page</router-link>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-form >
                <b-nav-item-dropdown left>
                  <!-- Using 'button-content' slot -->
                  <template slot="button-content"><em> Venues </em></template>
                  <b-dropdown-item v-on:click="moveToVenues()">List</b-dropdown-item>
                  <b-dropdown-item v-if="this.login === true" v-on:click="moveToVenuesAd()">Add Venue</b-dropdown-item>
                  <b-dropdown-item v-if="this.login === true" v-on:click="moveToVenueList()">Your Venues</b-dropdown-item>
                </b-nav-item-dropdown>
                <!--<b-button size="sm" class="my-2 my-sm-0"  v-on:click="userLogin()">Logout</b-button>-->
              </b-nav-form>
              <!--<router-link :to = "{ name: 'venues'}" > Venues </router-link>-->
              <!--Venues-->
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form v-if="this.login === false">
                <b-form-input  v-model="usernameOrEmail" size="sm" class="mr-sm-2" placeholder="Username or email"></b-form-input>
                <b-form-input  v-model= "password" size="sm" class="mr-sm-2" placeholder="Password" type="password"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0"  v-on:click="userLogin()">Sign in</b-button>
                <b-button size="sm" class="my-2 my-sm-0 ml-1"  v-on:click="moveToRegister()">Register</b-button>
                <!--<b-nav-item href="/register" >Register</b-nav-item>-->
              </b-nav-form>

              <b-nav-form v-else>
                <img src="https://img.icons8.com/color/40/000000/jake.png">
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->

                  <template slot="button-content"><em>{{this.usernameOrEmail}}</em></template>
                  <b-dropdown-item v-on:click="moveToUserProfile()">  <img src="https://img.icons8.com/color/30/000000/user.png">      Profile </b-dropdown-item>
                  <b-dropdown-item v-on:click="userLogout()"><img src="https://img.icons8.com/nolan/30/000000/login-rounded-right.png">  Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                <!--<b-button size="sm" class="my-2 my-sm-0"  v-on:click="userLogin()">Logout</b-button>-->
              </b-nav-form>



            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>


      <!--<div>-->
      <!--<router-link :to = "{ name: 'venues'}" > Go to venues </router-link>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>

  export default {
    name :"Navbar",
    data() {
      return {
        usernameOrEmail : '',
        password : '',
        login  : false,
        token  : "",
        userId  : "",
      };
    },
    mounted : function () {
      this . checkLogin ();
    },
    methods : {
      userLogin : function () {
        var body = {};
        // console.log(this.usernameOrEmail);
        // console.log(this.password);
        if (this.usernameOrEmail.includes("@")){
          body.email = this.usernameOrEmail;
        }
        else {
          body.username = this.usernameOrEmail;
        }
        body.password = this.password;

        this.$http.post('http://127.0.0.1:4941/api/v1/users/login', JSON.stringify(body))
          .then(function (response) {
            this.token = response.body.token;
            this.userId = response.body.userId;
            this.login = true;

            this.$cookies.set('usernameOrEmail', this.usernameOrEmail);
            this.$cookies.set('token', this.token);
            this.$cookies.set('userId', this.userId);
            this.$cookies.set('password', this.password);
            this.$cookies.set('login', this.login);

            console.log(this.$cookies.get('token'));
            console.log(this.$cookies.get('userId'));
          }, function (error) {
            console.log(error);
            alert(error.statusText.slice(13, error.length).toUpperCase())
          })
      },
      checkLogin : function(){
        try{
          if (this.$cookies.isKey('userId')){
            console.log(this.$cookies.get('usernameOrEmail'));
            console.log(this.$cookies.get('password'));
            this.usernameOrEmail = this.$cookies.get('usernameOrEmail');
            this.password =  this.$cookies.get('password');
            this.userLogin();
          }
        }catch (e) {
        }
      },

      moveToRegister : function(){
        this.$router.push({ name: 'register'});
      },

      moveToUserProfile : function(){
        this.$router.push({ name: 'userProfile'
        });
      },

      moveToVenues : function(){
        this.$router.push({ name: 'venues'});
      },
      moveToHome : function(){
        this.$router.push({ name: 'home'});
      },

      moveToVenueList : function(){
        this.$router.push({ name: 'venuesList'});
      },



      moveToVenuesAd : function(){
        this.$router.push({ name: 'venuesAdmin', params: {
          }});
      },


      userLogout : function () {
        console.log(this.token);
        var header = {};
        header["X-Authorization"] = this.token;
        this.$http.post('http://127.0.0.1:4941/api/v1/users/logout', {}, {headers : header})
          .then(function (response) {
            console.log(response);
            this.login = false;
            this.$cookies.remove('usernameOrEmail');
            this.$cookies.remove('token');
            this.$cookies.remove('userId');
            this.$cookies.remove('password');
            this.$cookies.set('login', false);

            console.log(this.login);
          }, function (error) {

            console.log(error);
            alert(error.statusText.slice(13, error.length).toUpperCase())
          })
      }
    },
  }

</script>



