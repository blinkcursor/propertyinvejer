// @codekit-prepend "vendor/instafeed.min.js"
// @codekit-prepend "../resources/slick/slick.js"

$(function() { // WRAP EVERYTHING UP IN DOM READY
  // var $body = $('body'); //cache body

  var $map = document.getElementById('map');
  if ( $map ) {
    // set up map
    google.maps.event.addDomListener(window, 'load', mapInit);
    // add click event handler to enable mouse events on map 
    $('.map--cover').on('click', function() {
      $(this).css( {'left': '20%', 'right': '20%'} );
    });
  }

  function isInView(elem){ // helper function to check if elem is in view
     return $(elem).offset().top - $(window).scrollTop() < $(elem).height() ;
  }

  // Initialise instafeed (only onscroll to save initial page load)
  var $instafeed = document.getElementById('instafeed');
  if ( $instafeed ) {
    $(window).scroll( function() {
      var $width = $(window).width(),
      limit = ( $width < 360 ) ? 8 : 20,
      feed = new Instafeed({
          get: 'tagged',
          limit: limit,
          tagName: 'vejer',
          sortBy: 'random',
          clientId: 'd8a69f232d6e4a44a49d380f239a08f1',
          resolution: 'low_resolution',
          template: '<a class="instapic" href="{{link}}" target="_blank"><img src="{{image}}" /></a>'//,
          //filter: function(image) {
          //  return image.user.username !== "ponientecomplementos";
          //} Problem: returns less than limit if some images are excluded by filter...
      });
      feed.run();
      $(window).off( "scroll" );
    });
  }

  // Initialise slick slider on home page
  var $sV = $('.slider-vejer');
  if ( $sV.length !== 0 ) {
    $sV.slick({
      lazyLoad: "progressive",
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true,
      variableWidth: true,
      speed: 600,
      slidesToShow: 1
    });
  }

  // Initialise slick slider on featured property
  var $sF = $('.slider-featured');
  if ( $sF.length !== 0 ) {
    $sF.slick({
   
      lazyLoad: "progressive", // bug with slick, "ondemand" not working
      autoplay: false,
      autoplaySpeed: 2500,
      centerMode: true,
      variableWidth: true,
      speed: 600,
      slidesToShow: 1,
      infinite: true,
    });

    $(window).scroll( function(){
      if ( isInView( $sF ) ) { // trigger autoplay when in view
        $sF.slick('slickPlay').slick('setOption', 'autoplay', true);
        $(this).off("scroll"); // don't keep testing once triggered
      }
    });
  }

  // Access exchange rate on featured property page
  var $priceEuro = $('.price--euro');
  if ( $priceEuro.length !== 0 ) {
    // Use jQuery.ajax to get the latest exchange rates, with JSONP:
    $.ajax({
        url: 'http://openexchangerates.org/api/latest.json?app_id=626cf2549e4f43838e32ee6a1c15204a',
        dataType: 'jsonp',
        success: function(json) {
            // Rates are in `json.rates`
            // Base currency (USD) is `json.base`
            // UNIX Timestamp when rates were collected is in `json.timestamp`
            var EURGBP = json.rates.EUR/json.rates.GBP,
            priceSterling = Math.round( parseInt( $priceEuro.text() ) / (1000 * EURGBP) ) * 1000;
            $('.price--sterling').text( priceSterling );
        }
    });
  }

  // Set up ajax form handling via formspree.io
  $form = $('.contact-form');
  if ( $form.length !== 0 ) {
    $form.submit(function(event){
        var msgSuccess = "Thank you! We'll be in touch soon.";
        var msgFail = "Oops. Something went wrong, please try again.";
        var formData = $(this).serialize();
        event.preventDefault();
        $.ajax({
            url: "//formspree.io/info@propertyinvejer.com",
            method: "POST",
            data: formData,
            dataType: "json"
        }).done(function(data) {
            if (data.success) {
                $('button[type="submit"]').remove();
                console.log('removed button');
                $form.append('<div class="notification success">' + msgSuccess + '</div>');
            } else {
                $form.append('<div class="notification alert">' + msgFail + '</div>');
            }
        });
    });
  }

  function mapInit() {
    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(36.2499739, -5.9673969),
      styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
  }

}); // END DOM READY WRAPPER