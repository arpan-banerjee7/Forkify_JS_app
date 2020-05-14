var request = require("request");
var cheerio = require("cheerio");

//var url = "https://www.zomato.com/kolkata/the-cake-xpress-kankurgachi";
var url = "https://www.zomato.com/kolkata/the-cake-xpress-kankurgachi";

request(url, function(err, respose, html) {
  if (!err) {
    // var $ = cheerio.load(html);
    console.log(html);
  }
  //var allitems = $("#root").children();
});
