<?php 
    get_header(); 

    $uploadDir = wp_upload_dir();
    $PAGE["pocet_del"] = kv_ObjektPocet();
    $PAGE["pocet_kategorii"] = kv_category_count();
    $SETTINGS = kv_settings2();
?>

  <div id="page" class="index bleft titulni">

   	<div class="inner contentheight">         


    <div class="postsIndex">
	    <div class="padding">
		<h2>O projektu</h2>     

		<p id="o-projektu">
                    <img src="<?php print ($SETTINGS["obrazekProjektu"]) ?>" alt="Obrázek k projektu" id="o-projektu-logo" /> 
                    <?php print ($SETTINGS["popisProjektu"]) ?>
		</p>
		
		<div id="o-projektu-button">
			<a href="/o-projektu/" class="button">Více o projektu</a>
		</div>  
		
        <?php include "index-content.php" ?>
		
        <div class="clear"></div>
    
    </div>
	</div>
	
      <div id="actualprojects" class="contentheight">
          <?php include "index-sidebar.php" ?>

      </div>      
    </div>

  </div> 


<?php 
    get_footer();
