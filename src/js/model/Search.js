import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }
  //axios
  async getResults() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );

      this.result = result.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
//import jquery from "jquery";

/*
//vanilla js HttpRequest
function fetchHttp(query) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      console.log("http data" + http.response);
    }
  };

  http.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/search?q=${query}`,
    true
  );
  http.send();
}
fetchHttp("pizza");

console.log("Http request above");

//Jquery
function fetchJquery(query) {
  jquery.get(
    `https://forkify-api.herokuapp.com/api/search?q=${query}`,
    function (data) {
      console.log(data);
    }
  );
}
fetchJquery("salad");
*/
