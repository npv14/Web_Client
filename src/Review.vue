<template>
    <div>
      <navbar></navbar>
      <b-container>
        <h1 align="center">
          Add Review
          <img src="https://img.icons8.com/ultraviolet/50/000000/popular-topic.png">
        </h1>

        <b-card bg-variant="dark" text-variant="white" title="Review Form">


          <div>
            <b-input-group class="mb-3" prepend="Review text:">
              <b-form-input v-model="text" placeholder="Enter your message here" @input="updateSearch()"></b-form-input>
            </b-input-group>
          </div>
          <div>
            <b-form-select class="mb-2" v-model="selectedStar" :options="optionsStar" @input="updateSearch()"></b-form-select>
            <div class="mb-4" >Selected Star: <strong>{{ selectedStar }}</strong></div>
          </div>
          <div>
            <b-form-select class="mb-2" v-model="selectedCost" :options="optionsCost" @input="updateSearch()"></b-form-select>
            <div class="mb-4" >Selected Star: <strong>{{ selectedCost }}</strong></div>
          </div>

          <b-button v-on:click= "submit($route.params.id)" align="center" variant="primary" > Submit </b-button>
        </b-card>






      </b-container>
    </div>
</template>

<script>
  import Navbar from './Navbar.vue'

  export default {
    components :{Navbar},
      data() {
        return {
          text: '',
          selectedStar: null,
          selectedCost: null,
          optionsStar: [
            {value: null,text:'Please select a Star'},
            {value: 1,text:'1'},
            {value: 2,text:'2'},
            {value: 3,text:'3'},
            {value: 4,text:'4'},
            {value: 5,text:'5'},
          ],
          optionsCost: [
            {value: null,text:'Please select a Cost'},
            {value: 0,text:'Free'},
            {value: 1,text:'$'},
            {value: 2,text:'$$'},
            {value: 3,text:'$$$'},
            {value: 4,text:'$$$$'},
          ]
        }
      },
      methods :{
        submit: function(id) {
          console.log(id);
          console.log(this.$route.params.token);

          var header = {};
          header["X-Authorization"] = this.$cookies.get('token');
          if (this.selectedStar === null) {
            alert('Please select Star Rating');
          } else if (this.selectedCost === null) {
            alert('Please select Cost Rating');
          } else {
            this.$http.post('http://127.0.0.1:4941/api/v1/venues/' + id +'/reviews', JSON.stringify({
                "reviewBody": this.text,
                "starRating": this.selectedStar,
                "costRating": this.selectedCost
              }),
              {headers: header})
              . then ( function ( response ) {

                  alert('Success');
                  this.$router.push({ name: 'venue'});
              },
                function ( error ) {
                  console.log(error);
                })

          }
        }
      }
    }
</script>

<style scoped>

</style>
