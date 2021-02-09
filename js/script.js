new Vue({
  el: '#root',
  data:{
    searchMovie: '',
    arrayConfiguration: [],
    arraySearches: [],
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
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=e7e03c0fba8d3369b4b91d7184fa6c83&query=' + this.searchMovie)
    .then(response => {
      this.arraySearches = response.data.results;
    });


  }
},
})
Vue.config.devtools = true
