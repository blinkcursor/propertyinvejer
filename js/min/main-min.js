$(function(){function e(e){return $(e).offset().top-$(window).scrollTop()<$(e).height()}function t(){var e={zoom:10,center:new google.maps.LatLng(36.2499739,-5.9673969),styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#46bcec"},{visibility:"on"}]}]},t=document.getElementById("map"),a=new google.maps.Map(t,e)}var a=document.getElementById("map");a&&(google.maps.event.addDomListener(window,"load",t),$(".map--cover").on("click",function(){$(this).css({left:"20%",right:"20%"})}));var l=document.getElementById("instafeed");l&&$(window).scroll(function(){var e=$(window).width(),t=360>e?8:20,a=new Instafeed({get:"tagged",limit:t,tagName:"vejer",sortBy:"random",clientId:"d8a69f232d6e4a44a49d380f239a08f1",resolution:"low_resolution",template:'<a class="instapic" href="{{link}}" target="_blank"><img src="{{image}}" /></a>'});a.run(),$(window).off("scroll")});var i=$(".slider-vejer");0!==i.length&&i.slick({lazyLoad:"progressive",autoplay:!0,autoplaySpeed:3e3,centerMode:!0,variableWidth:!0,speed:600,slidesToShow:1});var o=$(".slider-featured");0!==o.length&&(o.slick({lazyLoad:"ondemand",infinite:!0,speed:600,slidesToShow:1,centerMode:!0,variableWidth:!0,autoplay:!1,autoplaySpeed:2500}),$(window).scroll(function(){e(o)&&(o.slick("slickPlay").slick("setOption","autoplay",!0),$(this).off("scroll"))}));var s=$(".price--euro");0!==s.length&&$.ajax({url:"http://openexchangerates.org/api/latest.json?app_id=626cf2549e4f43838e32ee6a1c15204a",dataType:"jsonp",success:function(e){var t=e.rates.EUR/e.rates.GBP,a=1e3*Math.round(parseInt(s.text())/(1e3*t));$(".price--sterling").text(a)}})});