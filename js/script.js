new Vue({
  el: '#root',
  data:{
    searchMovie: '',
    arrayConfiguration: [],
    arraySearches: [],
    arrayTypology: [],
    selectTypology: 'ALL',
    arrayStar: ['1','2','3', '4', '5'],
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
    axios.get('https://api.themoviedb.org/3/search/multi?api_key=e7e03c0fba8d3369b4b91d7184fa6c83&page=1&include_adult=false&query=' + this.searchMovie)
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
    }



},
})
Vue.config.devtools = true
