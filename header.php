<?php
  if (is_front_page() && is_home()) {
	$objectId = $_GET["objekt"];
	if (strlen($objectId) > 0) {
		wp_redirect("/katalog/dilo/".$objectId."/");	
	}
  }
  
  $SETTINGS = kv_settings2();
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="keywords" content="" />
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    
  <title><?php wp_title( '|', true, 'right' ); ?><?php bloginfo( 'name' ); ?></title>

  <?php wp_head(); ?>

    <link rel="icon" href="<?php bloginfo('template_url') ?>/favicon.ico" type="image/x-icon" />
 
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/content.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/line_list_style.css" media="screen" />
    <link rel='stylesheet' id='vpp-css'  href='<?php bloginfo('template_url') ?>/style-global.css?ver=4.0.1' type='text/css' media='all' />
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>" media="screen, print" />
    <link rel="stylesheet"  type="text/css" href="<?php bloginfo('template_url') ?>/print.css" media="print" />
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/style-custom.css" media="screen, print" />
  
  <link href="//fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext,latin-ext" rel="stylesheet" type="text/css">

  <script>
    TEMPLATE_URL = "<?php bloginfo('template_url') ?>";
    BID = <?php echo get_current_blog_id() ?>;
  </script>
  <script type='text/javascript' src='<?php bloginfo('template_url') ?>/js/jquery-1.7.2.min.js'></script>
  <script type="text/javascript" src="<?php bloginfo('template_url') ?>/js/jquery.MultiFile.pack.js"></script>
  <script type="text/javascript" src="<?php bloginfo('template_url') ?>/js/jquery.unveil.js"></script>
  <script type="text/javascript" src="<?php bloginfo('template_url') ?>/js/sprintf.js"></script>
  <script type="text/javascript" src="<?php bloginfo('template_url') ?>/js/vpp.js"></script>


  <?php
        // TODO
      $project_color = '#000'; 
      $project_background = '';
      ?>
      <style>
        #page.index .post h3 {color: <?php echo $project_color ?>}
        h3.titleBigGreen {color: <?php echo $project_color ?>}   
        #mappage h2 {color: <?php echo $project_color ?>} 
      </style>
  
</head>                                                                     
<body> 
  <div id="header" <?php printf('style="background-color: %s; background-image: url(\'%s\')"', $project_color, $project_background) ?>>
    <div id="header-top"> 
      <div id="blacked">
        <div class="inner">       
			
          <div id="header-top-right">
            
            <div id="search">
				<form id="searchbox_000059552786512968692:qcvcek8b33y" action="https://www.google.com/cse">
				    <input name="cx" value="000059552786512968692:qcvcek8b33y" type="hidden">
				    <input name="cof" value="FORID:0" type="hidden">
				    <input name="ie" value="utf-8" type="hidden">
				    <input type="text" name="q" placeholder="Hledat...">
				    <input type="submit" value="Hledat">
				</form>
            </div>
            
            <?php if (strlen($SETTINGS["profilFacebook"]) > 0) { ?>
                <div class="separator"></div>
            <?php } ?>
                
            <div id="socials">
                <?php if (strlen($SETTINGS["profilFacebook"]) > 0) { ?>
                    <a id="social_rss" href="<?php printf('%s/feed', get_bloginfo('url')); ?>"></a><a id="social_fb" target="_blank" href="<?php print($SETTINGS["profilFacebook"]) ?>"></a>
                <?php } ?>
              <div id="newsletterpopup" class="menupopup">
              </div> 
					
			      </div>
            


  
          </div>
  
          </div>

          <div class="clear"></div>

        </div>
        
        <div class="inner">

        <label for="show-menu" class="show-menu">Zobrazit menu</label>
        <input type="checkbox" id="show-menu" role="button">


      </div>   
    </div>
         
    <div id="header-content">
      <div class="inner">
        <h1><?php print (get_bloginfo()) ?></h1>
        <span>
          <p><?php print (get_bloginfo('description')) ?></p>
        </span>
        <?php wp_nav_menu( array('menu' => 'main_menu', 'container' => '', 'menu_id' => 'project-menu', 'depth' => 1)); ?>
        
      </div> 
    </div>  
  </div>