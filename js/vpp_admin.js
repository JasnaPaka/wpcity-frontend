jQuery(document).ready(function($) {
  $('#excerpt').prop('required', true);

  $('#post_authors').on('change', 'select', function() {
      var div = $(this).closest('div');
      var nextDiv = div.next('div');
  
      if (!nextDiv.is('div') && $(this).val())
      {
        $('#post_authors .inside').append(selectTemplate);
      }
  })
  
  $('#post_authors .inside').sortable();
});


