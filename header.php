<!doctype html>

<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

	<head>
		<!-- <meta charset="utf-8"> -->

		<!-- Google Chrome Frame for IE -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title><?php wp_title( '|', true, 'right' ); bloginfo( 'name' ); ?></title>

		<!-- mobile meta (hooray!) -->
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<!-- icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) -->
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-icon-touch.png">
		<link rel="icon" href="http://hbmstatic.com/favicon.ico">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<![endif]-->
		<!-- or, set /favicon.ico for IE10 win -->
		<meta name="msapplication-TileColor" content="#f01d4f">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">
		<meta property="og:title" content="High Bias Mastering"/>
		<meta property="og:type" content="article"/>
		<meta property="og:url" content="http://highbiasmastering.com/"/>
		<meta property="og:image" content="http://hbmstatic.com/images/hbm_fb_profile.png"/>
		<meta property="og:site_name" content="High Bias Mastering"/>
		<meta property="og:description" content="Expert audio mastering for digital. Featuring a drag + drop uploader, private Client pages and High Bias Plus mastering credits."/>	
		
		<link rel="stylesheet" href="http://hbmstatic.com/uploader/css/bootstrap.min.hbm.css">
		<link rel="stylesheet" href="http://hbmstatic.com/js/jquery.qtip.min.css">

		
		<!-- Bootstrap CSS fixes for IE6 -->
		<!--[if lt IE 7]><link rel="stylesheet" href="http://blueimp.github.io/cdn/css/bootstrap-ie6.min.css"><![endif]-->
		<!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
		
		<!-- web fonts -->
		<link href='http://fonts.googleapis.com/css?family=Lato:400,700,400italic' rel='stylesheet' type='text/css'>
		<!-- end web fonts -->

		<!-- wordpress head functions -->
		<?php wp_head(); ?>
		<!-- end of wordpress head -->

		<!-- drop Google Analytics Here -->
		<!-- end analytics -->

	</head>

	<body <?php body_class(); ?>>

		<div id="container">

			<header class="header" role="banner">

				<div id="inner-header" class="wrap clearfix">

					<!-- to use a image just replace the bloginfo('name') with your img src and remove the surrounding <p> -->
					<div id="logo">
						<a href="<?php echo home_url(); ?>" rel="nofollow"><img src="http://img.hbmstatic.com/images/hbm_logo2@2x.png" width="96px" height="57px"></a>
					</div>
					<span class="header-description">Expert audio mastering for digital</span>

					<!-- if you'd like to use the site description you can un-comment it below -->
					<?php // bloginfo('description'); ?>


					<nav role="navigation clearfix">
						<?php bones_main_nav(); ?>
					</nav>
					
					<!--
<div class="header-hbp">
					<a href="/hbp/"><img class="hbpimg" height="48px" width="144px" src="http://hbmstatic.com/images/hbp_header2@2x.png"></a>
					</div>
-->
					
					<div class="lwa-header clearfix">
					<?php login_with_ajax(); ?>
					</div>
					
					<div class="top-cart clearfix">
					
					<a href="/store/cart/"><i class="icon-shopping-cart icon-white"></i></a>

					<!--dynamic-cached-content--><?php dynamic_sidebar('widgetcart'); ?><!-- dynamic_sidebar('widgetcart'); --><!--/dynamic-cached-content-->
					
					</div>

				</div> <!-- end #inner-header -->

			</header> <!-- end header -->
		
