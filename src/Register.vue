<style>
  h1 {
    text-align: center;
  }
</style>

<template>


  <div>
    <navbar></navbar>
    <b-container align="center">
      <h1>Register</h1>


    <b-card bg-variant="dark" text-variant="white" title="Register Form">

      <div>
        <b-input-group
          class="mb-3"
          prepend="First name:"
        >
          <b-form-input v-model="givenName" placeholder="" @input="updateSearch()"></b-form-input>
          <b-input-group-append>
            <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
          </b-input-group-append>
        </b-input-group>
        <!--<div class="mt-2">Value: {{ givenName }}</div>-->
      </div>

      <div>
        <b-input-group
          class="mb-3"
          prepend="Last name:"
        >
          <b-form-input v-model="familyName" placeholder="" @input="updateSearch()"></b-form-input>
          <b-input-group-append>
            <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
          </b-input-group-append>
        </b-input-group>
        <!--<div class="mt-2">Value: {{ givenName }}</div>-->
      </div>

      <div>
        <b-input-group
          class="mb-3"
          prepend=" Username:"
        >
          <b-form-input v-model="userName" placeholder="" @input="updateSearch()"></b-form-input>
          <b-input-group-append>
            <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
          </b-input-group-append>
        </b-input-group>
        <!--<div class="mt-2">Value: {{ givenName }}</div>-->
      </div>

      <div>
        <b-input-group
          class="mb-3"
          prepend="Email:"
        >
          <b-form-input v-model="email" placeholder="" @input="updateSearch()"></b-form-input>
          <b-input-group-append>
            <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
          </b-input-group-append>
        </b-input-group>
        <!--<div class="mt-2">Value: {{ givenName }}</div>-->
      </div>

      <div>
        <b-input-group
          class="mb-3"
          prepend="Password:"
        >
          <b-form-input type="password" v-model="password" placeholder="" @input="updateSearch()"></b-form-input>
          <b-input-group-append>
            <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
          </b-input-group-append>
        </b-input-group>
        <!--<div class="mt-2">Value: {{ givenName }}</div>-->
      </div>

      <div>
        <b-input-group
          class="mb-3"
          prepend="Confirm password:"
        >
          <b-form-input type="password" v-model="confirmPassword" placeholder="" @input="updateSearch()"></b-form-input>
          <b-input-group-append>
            <!--<b-button v-on:click = "updateSearch()" size="sm" text="Button" variant="primary">Search</b-button>-->
          </b-input-group-append>
        </b-input-group>
        <!--<div class="mt-2">Value: {{ givenName }}</div>-->
      </div>

      <button v-on:click="postUser()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteUserModal">
        Register
      </button>

      <!--<b-card-text>-->
        <!--With supporting text below as a natural lead-in to additional content.-->
      <!--</b-card-text>-->
      <!--<b-button href="#" variant="primary">Go somewhere</b-button>-->
    </b-card>


      <div>
        <router-link :to = "{ name: 'home'}" > Back to Home</router-link>
        <!--<router-link :to = "{ name: 'home'}" > Back to Home</router-link>-->
      </div>
    </b-container>
    </div>



</template>

<script>
  import Navbar from './Navbar.vue'

  export default {
    components :{Navbar},
    data() {
      return {
        givenName : '',
        familyName : '',
        userName : '',
        email : '',
        password : '',
        confirmPassword : '',
        error : '',
        
      };
    },
    methods : {
      postUser : function () {
        if (this.password === this.confirmPassword) {
          this.$http.post('http://127.0.0.1:4941/api/v1/users', JSON.stringify({
            "username": this.userName,
            "givenName": this.givenName,
            "familyName": this.familyName,
            "email": this.email,
            "password": this.password,
          }))
            .then(function (response) {
              alert('Successful'.toUpperCase());

              this.$cookies.set('userId', response.data.userId);
              this.$cookies.set('password', this.password);
              this.$cookies.set('usernameOrEmail', this.userName);

              this.$router.push({ name: 'home'});
              console.log(response);
            }, function (error) {
              console.log(error);
              if (error.statusText === "Bad Request: username or email already in use"){
                alert(error.statusText.slice(13, error.statusText.length).toUpperCase())
              }
              else{
              alert(error.statusText.slice(18, error.statusText.length).toUpperCase());
              }
              this.error = error;
            })


        }

        else{
          alert("Confirm password does not match".toUpperCase())
        }
      }

    }

  }

</script>
