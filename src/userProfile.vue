

<template>
    <div>
      <navbar></navbar>
      <h1 align = "center">
        User Profile <img src="https://img.icons8.com/color/60/000000/edvard-munch.png">
      </h1>

      <b-container>
        <div>
          <b-input-group
            class="mb-3"
            prepend="Search other user:"
          >
            <b-form-input v-model="searchId" placeholder="Enter User ID here"></b-form-input>
            <b-input-group-append>
              <div>
                <b-button   variant="primary" v-on:click = "getOtherUser()" >Search
                  <img src="https://img.icons8.com/color/25/000000/find-user-female.png">
                </b-button>
                <b-modal ref="modal-1" title="User Profile">
                  <b-container>

                    <div class="mb-4" >
                      <img v-if="otherPhoto === false" src="./assets/default.png" style="width:200px;height:200px" class="center"></img>
                      <img v-else :src="getImageUrl(this.searchId)" style="width:200px;height:200px" class="center"></img>
                    </div>

                    <table>
                      <tr><th>User Name</th><td colspan="4"> {{this.otherUser.username}}</td></tr>
                      <tr><th>Given Name</th><td colspan="4"> {{this.otherUser.givenName}}</td></tr>
                      <tr><th>Family Name</th><td colspan="4"> {{this.otherUser.familyName}}</td></tr>
                    </table>
                  </b-container>
                </b-modal>
              </div>
              <!--<b-button v-on:click = "getOtherUser()" size="sm" text="Button" variant="primary">Search</b-button>-->
            </b-input-group-append>
          </b-input-group>
          <!--<div class="mt-2">Value: {{ searchId }}</div>-->
        </div>

        <div class="mb-4" >
          <img v-if="photo === false" src="./assets/default.png" style="width:200px;height:200px" class="center"></img>
          <img v-else :src="getImageUrl(this.userId)" style="width:200px;height:200px" class="center"></img>
        </div>

        <input class="center" type="file" @change="onFileChanged" style="width:250px">

        <div class="center" style="width:350px">
          <b-button style="width:80px;height:40px" variant="info"  class=" mb-2  mt-2"   v-on:click="onUpload()">
            Change
          </b-button>


          <b-button style="width:110px;height:40px" variant="danger" class="ml-5 mb-2  mt-2"  v-on:click="deletePhoto()">
            Delete
          </b-button>

        </div>












      <table>
        <tr><th>User Name</th><td colspan="4"> {{this.user.username}}</td></tr>
        <tr><th>Given Name</th><td colspan="4"> {{this.user.givenName}}</td></tr>
        <tr><th>Family Name</th><td colspan="4"> {{this.user.familyName}}</td></tr>
        <tr><th>Email Address</th><td colspan="4"> {{this.user.email}}</td></tr>
      </table>
        <div>
          <b-button class="center mt-1" style="width:60px;height:40px" variant="primary" v-on:click = "change()" >Edit</b-button>

          <b-modal ref="modal-2" title="Edit User Profile" @ok="updateUser">
            <b-container>
              <table>
                <tr><th>Given Name</th><b-form-input v-model="changeGivenName" placeholder=""></b-form-input></tr>
                <tr><th>Family Name</th><b-form-input v-model="changeFamilyName" placeholder=""></b-form-input></tr>
                <tr><th>Current Password</th><b-form-input type= "password" v-model="changeCurrentPassword" placeholder="Enter your current password"></b-form-input></tr>
                <tr><th>New Password</th><b-form-input type= "password" v-model="changeNewPassword" placeholder="Enter new password"></b-form-input></tr>
              </table>
            </b-container>
          </b-modal>
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
          user : null,
          userId : null,
          searchId : null,
          otherUser : '',
          changeGivenName : '',
          changeFamilyName : '',
          changeCurrentPassword : '',
          changeNewPassword : '',
          currentPassword :'',
          photo :false,
          otherPhoto :false,
          selectedFile: null
        }
      },
      mounted: function () {
        this.getUser();
      },
      methods: {

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


        getUser : function () {
          var header = {};
          header["X-Authorization"] = this.$cookies.get('token');
          this.currentPassword = this.$cookies.get('password');
          this.userId = this.$cookies.get('userId');
          this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.userId,  {headers : header})
            .then(function (response) {
              // console.log(response);
              this.user = response.data;
            },  function (error) {
              console.log(error.statusText);
            });

          this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.userId + '/photo')
            .then(function (response) {
              this.photo = true;
              console.log(response);
            },  function (error) {
              // console.log(error);
            });


        },

        getImageUrl(id) {
          return 'http://127.0.0.1:4941/api/v1/users/' + id + '/photo';
        },

        deletePhoto : function () {
          var header = {};
          header["X-Authorization"] = this.$cookies.get('token');
          this.$http.delete('http://127.0.0.1:4941/api/v1/users/' + this.userId + '/photo', {headers : header})
            .then(function (response) {
              alert("Success");
              this.$router.push({ name: 'home'});
              // this.photo = true;
              console.log(response);
            },  function (error) {
              alert(error.statusText);
              console.log(error);
            });

        },

        getOtherUser : function () {
          if(this.searchId === null || this.searchId === "" ){
            alert("Please enter user id");
          }
          else if (this.searchId.toString() === this.userId.toString()){
            alert("You can not search your own id")
          }
          else{
            console.log("come here");
            console.log(this.searchId);
            this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.searchId)
              .then(function (response) {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                this.otherUser = response.data;
                console.log(this.otherUser);
                this.$refs['modal-1'].show()
              },  function (error) {
                console.log(error);
              });

            this.otherPhoto = false;
            this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.searchId + '/photo')
              .then(function (response) {
                this.otherPhoto = true;
                console.log(response);
              },  function (error) {
                // console.log(error);
              });


          }
        },
        change : function () {
          this.changeGivenName = this.user.givenName;
          this.changeFamilyName = this.user.familyName;
          this.$refs['modal-2'].show()
        },

        updateUser : function (bvModalEvt) {
          bvModalEvt.preventDefault();
          console.log(this.currentPassword);
          console.log(this.changeCurrentPassword);
          if (this.currentPassword !== this.changeCurrentPassword){
            alert('Wrong current password')
          }
          else{
            var header = {};
            header["X-Authorization"] = this.$cookies.get('token');
            var body = {};
            body.givenName = this.changeGivenName;
            body.familyName = this.changeFamilyName;
            body.password = this.changeNewPassword;

            this.$http.patch('http://127.0.0.1:4941/api/v1/users/' + this.userId, JSON.stringify(body),  {headers : header})
              .then(function (response) {
                alert('Success');
                console.log(response);
                this.$refs['modal-2'].hide();
                this.getUser();
                this.$cookies.set('password', this.changeNewPassword);
                this.currentPassword = this.changeNewPassword;
                this.changeCurrentPassword = '';
                this.changeNewPassword = '';
              },  function (error) {
                alert(error.statusText.slice(18, error.length).toUpperCase())
              })
          }
        }
      }
    }
</script>

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
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

</style>
