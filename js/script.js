new Vue({
  el: '#root',
  data:{
    searchMovie: '',
    arrayConfiguration: [],
    arraySearches: [],
    arrayTypology: [],
    arrayCast: [],
    selectTypology: 'ALL',
    active: true,
    voteStar: 'starActive',
    flagsLink: "https://www.countryflags.io/"
  },
  mounted(){
    axios.get('https://api.themoviedb.org/3/configuration?api_key=e7e03c0fba8d3369b4b91d7184fa6c83')
    .then(response=>{
      this.arrayConfiguration =response.data.images
    })
  },
  methods:{
    searchFunction: function(){
      this.arraySearches = [];
      axios.get('https://api.themoviedb.org/3/search/multi?api_key=e7e03c0fba8d3369b4b91d7184fa6c83&language=it&page=1&include_adult=false&query=' + this.searchMovie)
      .then(response => {
        this.arraySearches = response.data.results;
      });
    },
    filterTypology : function(){
      this.arraySearches.forEach(item => {
        if(this.arrayTypology.includes(item.media_type)){
          return
        }else{
          this.arrayTypology.push(item.media_type)
        }
      });
    },
    mouseOver: function(){
      this.active = false;
    },
    getVote(vote){
      return parseInt(vote/2);
    },
    getCredits: function(movie_id){
      axios.get("https://api.themoviedb.org/3/movie/"+ movie_id +"/credits?api_key=e7e03c0fba8d3369b4b91d7184fa6c83&language=en-US")
      .then(response => {
        this.arrayCast.push(response.cast);
        console.log(this.arrayCast)
      });
  },

  }

})
Vue.config.devtools = true
