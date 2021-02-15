new Vue({
  el: '#root',
  data:{
    searchMovie: '',
    arrayConfiguration: [],
    arraySearches: [],
    arrayPopular: [],
    arrayTypology: [],
    arrayCast: [],
    hoverIndex: '0',
    castSelectedIndex: null,
    selectTypology: 'ALL',
    active: true,
    voteStar: 'starActive',
    flagsLink: "https://www.countryflags.io/"
  },
  mounted(){
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e7e03c0fba8d3369b4b91d7184fa6c83&language=it-en&page=1')
    .then(response=>{
      this.arrayPopular =response.data.results;
   });
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
    getCreditsMovie: function(movie_id){
      if (this.arraySearches.media_type !== 'person'){
        this.castSelectedIndex = movie_id
        this.arrayCast = [],
        axios.get("https://api.themoviedb.org/3/movie/"+movie_id+"/credits?api_key=e7e03c0fba8d3369b4b91d7184fa6c83&language=en-US")
        .then(response => {
          for (var i = 0; i < 5; i++) {
            if (response.data.cast[i] === undefined) {
              break;
            }
            this.arrayCast.push(response.data.cast[i])
          }
        });
      }else{
        return;
      }
  },
  getCreditsTv: function(tv_id){
    if (this.arraySearches.media_type !== 'person') {
      this.castSelectedIndex = tv_id
      this.arrayCast = [],
      axios.get("https://api.themoviedb.org/3/tv/"+tv_id+"/credits?api_key=e7e03c0fba8d3369b4b91d7184fa6c83&language=en-US")
      .then(response => {
        for (var i = 0; i < 5; i++) {
          if (response.data.cast[i] === undefined) {
            break;
          }
          this.arrayCast.push(response.data.cast[i])
        }
      });
    }else{
      return;
    }

},
reloadPage: function(){
  window.location.reload()
},
changeIndex: function(index){
  this.hoverIndex = index;
  console.log(index)
},

  }

})
Vue.config.devtools = true
