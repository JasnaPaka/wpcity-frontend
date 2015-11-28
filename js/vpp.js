function findInMap(address) {

  if (!address) return;

  address = address + ' Plzeň';

  jQuery.ajax({
    dataType: 'json',
    url: 'http://maps.google.com/maps/api/geocode/json?sensor=false&address='+address,
    async: false
    }).done(function(data) {

      var lat = data.results[0].geometry.location.lat;
      var lon = data.results[0].geometry.location.lng;
      
      if (lat && lon)
      {

        jQuery('input[name=initiative_coordinates_lat]').val(lat);
        jQuery('input[name=initiative_coordinates_lon]').val(lon);

        var lonLat = new OpenLayers.LonLat(lon, lat).transform(epsg4326, epsg900913);
        feature.move(lonLat);

        map.setCenter(lonLat, 5);
      }
      
    });
}

function getMarkers()
{
    jQuery('#mappage #filters').css({opacity: 0.5});
    
    vectorLayer.removeAllFeatures();

    while(map.popups.length) {
      map.removePopup(map.popups[0]);
    }
         
    filters = [];
    jQuery('#mappage label.tag.filter.active').each(function( index ) {
       filters.push(jQuery(this).attr('name'));        
    }); 

    jQuery.ajax({
      type: 'post',
      url: TEMPLATE_URL + '/getmarkers.php',
      data: {filters: filters, bid: BID},
      dataType: 'script'
    })
      .done(function(data) {
        jQuery('#mappage #filters').css({opacity: 1});
        map.addLayer(vectorLayer);
      });
}

function getKMLMarkerContent(id) { 
  jQuery.getJSON('http://zelenamapa-dev.plzne.cz/webmap/pois/' + id + '/?format=json', function(data) {
    
    var photo = data.photos[0];
    photo_url = (photo) ? photo.photo : '';  
    
    jQuery('#pop_contentDiv .markerContent').html(
      sprintf('%s<div class="padding"><h3>%s</h3><p>Kategorie: <strong>%s</strong><p><p>Autor: <strong>%s</strong><p><a href="%s" class="button orange">Detail</a></div>', (photo_url) ? sprintf('<img src="%s" width="247" height="154">', photo_url) : '', data.name, data.marker.name, data.author, ZM_URL +'/misto/'+data.id)
    );
  });
}

function togglePopup(id) {
 jQuery('#header-top #header-top-right #'+id).toggleClass('active'); 
 jQuery('#header-top #header-top-right #'+id+'popup').toggleClass('active');    
}

jQuery(document).ready(function($) {

  $("img").unveil();

  $('.addinitiative form').submit(function(event) { 
        var imgVal = $('[name="initiative_photos[]"]').val();
        if (imgVal == '') {
            alert("Musíte vybrat alespoň jednu fotografii!");
            return false;
        }  
  });
  
  $('textarea[maxlength]').each(function(){
      var tName=$(this).attr("name");
      $(this).after('<p id="cnt_'+tName+'" class="gray charsremaining"></p>');
      $(this).keyup(function () {
          var tName=$(this).attr("name");
          var tMax=$(this).attr("maxlength");
          var left = tMax - $(this).val().length;
          if (left < 0) left = 0;
          $('#cnt_'+tName).text('zbývá ' + left + ' znaků');
      }).keyup();
  });
 
  $(document).click(function(event) { 
      if(!$(event.target).closest('#header-top #header-top-right #loginpopup').length) {
          if($('#header-top #header-top-right #loginpopup').hasClass('active')) {
              togglePopup('login');
          }
      }
      if(!$(event.target).closest('#header-top #header-top-right #newsletterpopup').length) {
          if($('#header-top #header-top-right #newsletterpopup').hasClass('active')) {
              togglePopup('newsletter');
          }
      }      
  })  
  
  $('#header-top #header-top-right #login a.showpopup').click(function(event){
    togglePopup('login'); 
    return false;
  });
  
  $('#mappage .panel .tabs span').click(function(event){
    $('#mappage .panel .tabs span').removeClass('active');
    $(this).addClass('active');
   
    var index = $(this).index();
    
    $('#mappage .panel .blocks .block').removeClass('active');
    $('#mappage .panel .blocks .block').eq(index).addClass('active');
    
    return false;
  });
  
  $('#header-top #header-top-right #newsletter.showpopup').click(function(event){
    togglePopup('newsletter'); 
    return false;
  });

  $('input[name=initiative_address]').bind('keypress', function(event) {
   	if(event.keyCode==13)
    {
      event.preventDefault();
      $('#findinmap').click();
  	}
  });
  
  $('#mappage .panel .blocks .block input[name=search]').bind('keyup', function(event) {
    $('#mappage .panel .blocks .block #searchresults div').hide();
    
    var value = $(this).val();
    
    if (value)
    {
      $('#mappage .panel .blocks .block #searchresults div').each(function( index ) { 
        if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) !=-1)
          $(this).show();
      });
    }
    
  });
  
  $('#mappage .panel .blocks .block #searchresults div').click(function(event){
    var id = $(this).attr('name');
    showPopupByFID(id);
  });

  $('#mappage .panel .blocks .block .export').click(function(event){
  });
  
  
  $('#mappage .panel .blocks .block .print').click(function(event){
    print();
    return false;
  });  
  
  $('#findinmap').click(function(event){
    findInMap(jQuery('input[name=initiative_address]').val());
    return false;
  }); 
  
  $('input[name=initiative_author_alreadyregistered]').click(function(event){
    var index = $(this).val();
    $('.formblock').removeClass('visible');
    $('.formblock.b'+index).addClass('visible');
    
    $('.registerpage #lostpassword').hide();
             
    if (index == 1)
    {
      $('.registerpage input[name=initiative_submit]').val('Přihlásit'); 
      $('.registerpage #lostpassword').show(); 
    }         
    else
    {
      $('.registerpage input[name=initiative_submit]').val('Registrovat'); 
    }
  });
  
  
  $('input[name=initiative_category]').click(function(event){
    var index = $(this).val();
   
    if ($(this).attr('id') == 'cat_pestovat')
      $('form .grant').addClass('visible');
    else
      $('form .grant').removeClass('visible');
    
  });  
  
  $('#listfilters span.arrow, .rightMenu span.arrow').click(function(event){
    var name = $(this).attr('name');
    if (name)
    {
      $(this).toggleClass('up');
      $('.tags .tagsblock.'+name).toggle();
    }
  });
  
  $('.tags .tagsblock span').click(function(event){
      $(this).toggleClass('active');
      
      var active_classes_count = $('.tags .tagsblock span.active').length;
               
      if (active_classes_count)
      {
        $('#page .postitem').hide();
        
        $('.tags .tagsblock span.active').each(function( index ) {
          var itemclass = $(this).attr('name');
          $('#page .postitem.'+itemclass).show();         
        });        
      }
      else
       $('#page .postitem').show();      
       
      $("img").unveil();
  });
  
  
  $('#mappage #cela_obrazovka').click(function(event){
    $("#header, #footer").toggle();  
    return false;
  });
    
  $( '.addplace form' )
  .submit( function( e ) {
    $.ajax( {
      url: $(this).attr('action'),
      type: 'POST',
      data: new FormData( this ),
      processData: false,
      contentType: false,
      async: false
    } ).done(function(data) {
        if (data == 'OK')
          location.href = 'http://zelenamapa.plzne.cz/dekujeme-za-pridani-nebo-doplneni-mista/';
        else
          $('#load_content').html(data);
    });

    e.preventDefault();
  });
  
  $('#mappage .zoomplus').click(function(event){
    map.zoomIn();
    return false;
  });  
  
  $('#mappage .zoomminus').click(function(event){
    map.zoomOut();
    return false;
  });    
  
  $('#mappage .minimize').click(function(event){
    $('#mappage #filters .panel, #mappage #load_panel .panel').slideToggle();
    $(this).toggleClass('minimized');
    return false;
  });  
  
  $('#mappage .fullscreen').click(function(event){
     $("#header, #footer").toggle();  
     $("#mappage").toggleClass('fullscreen'); 
     
     allcontrols = map.getControlsByClass('OpenLayers.Control.Navigation');
     for(var i = 0; i < allcontrols.length; ++i)
     {    
        if ($("#mappage").hasClass('fullscreen')) 
          allcontrols[i].enableZoomWheel();
        else
          allcontrols[i].disableZoomWheel();
     }
      
    return false;
  });  
  
  $('#mappage .layer .popup p').click(function(event){
    var name = $(this).attr('name');
    var text = $(this).text();
    var layer = $(this).closest('.layer');
    layer.find('.text').text(text);
    
    baseOSM.setVisibility(false);
    satOSM.setVisibility(false);
    
    window[name].setVisibility(true);
    
    return false;
  });  
    
  $('#mappage label.tag').click(function(event){
 
      $(this).toggleClass('active'); 

      var allCheckboxes = $('#mappage label.tag.filter .checkbox').length;
      var allCheckedboxes = $('#mappage label.tag.filter.active .checkbox').length; 
 
      if ($(this).attr('name') == 'all')
      {
        if (!$(this).hasClass('active'))
          $('#mappage label.allfilter').removeClass('active');
        else
          $('#mappage label.allfilter').addClass('active');
      }
 
      getMarkers();

  });
 
});