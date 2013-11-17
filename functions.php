<?php
/*
Author: Eddie Machado
URL: htp://themble.com/bones/

This is where you can drop your custom functions or
just edit things like thumbnail sizes, header images,
sidebars, comments, ect.
*/

/**
   * @return false if not cached or modified, true otherwise.
   * @param bool check_request set this to true if you want to check the client's request headers and "return" 304 if it makes sense. will only output the cache response headers otherwise.
   **/     
/*

 function sendHTTPCacheHeaders($cache_file_name, $check_request = false)
  {
    $mtime = @filemtime($cache_file_name);

    if($mtime > 0)
    {
      $gmt_mtime = gmdate('D, d M Y H:i:s', $mtime) . ' GMT';
      $etag = sprintf('%08x-%08x', crc32($cache_file_name), $mtime);

      header('ETag: "' . $etag . '"');
      header('Last-Modified: ' . $gmt_mtime);
      header('Cache-Control: private');
      // we don't send an "Expires:" header to make clients/browsers use if-modified-since and/or if-none-match

      if($check_request)
      {
        if(isset($_SERVER['HTTP_IF_NONE_MATCH']) && !empty($_SERVER['HTTP_IF_NONE_MATCH']))
        {
          $tmp = explode(';', $_SERVER['HTTP_IF_NONE_MATCH']); // IE fix!
          if(!empty($tmp[0]) && strtotime($tmp[0]) == strtotime($gmt_mtime))
          {
            header('HTTP/1.1 304 Not Modified');
            return false;
          }
        }

        if(isset($_SERVER['HTTP_IF_NONE_MATCH']))
        {
          if(str_replace(array('\"', '"'), '', $_SERVER['HTTP_IF_NONE_MATCH']) == $etag)
          {
            header('HTTP/1.1 304 Not Modified');
            return false;
          }
        }
      }
    }

    return true;
  }
*/


// Return the requested graphic file to the browser
// or a 304 code to use the cached browser copy
function displayGraphicFile ($graphicFileName, $fileType='png') {
  $fileModTime = filemtime($graphicFileName);
  // Getting headers sent by the client.
  $headers = getRequestHeaders();
  // Checking if the client is validating his cache and if it is current.
  if (isset($headers['If-Modified-Since']) && (strtotime($headers['If-Modified-Since']) == $fileModTime)) {

    // Client's cache IS current, so we just respond '304 Not Modified'.
    header('Last-Modified: '.gmdate('D, d M Y H:i:s', $fileModTime).' GMT', true, 304);
  } else {
    // Image not cached or cache outdated, we respond '200 OK' and output the image.
    header('Last-Modified: '.gmdate('D, d M Y H:i:s', $fileModTime).' GMT', true, 200);
    header('Content-type: image/'.$fileType);
    header('Content-transfer-encoding: binary');
    header('Content-length: '.filesize($graphicFileName));
    readfile($graphicFileName);
  }
}

// return the browser request header
// use built in apache ftn when PHP built as module,
// or query $_SERVER when cgi
function getRequestHeaders() {
  if (function_exists("apache_request_headers")) {
    if($headers = apache_request_headers()) {
      return $headers;

    }
  }
  $headers = array();
  // Grab the IF_MODIFIED_SINCE header
  if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
    $headers['If-Modified-Since'] = $_SERVER['HTTP_IF_MODIFIED_SINCE'];
  }
  return $headers;
}

/************* INCLUDE NEEDED FILES ***************/

/*
1. library/bones.php
	- head cleanup (remove rsd, uri links, junk css, ect)
	- enqueueing scripts & styles
	- theme support functions
	- custom menu output & fallbacks
	- related post function
	- page-navi function
	- removing <p> from around images
	- customizing the post excerpt
	- custom google+ integration
	- adding custom fields to user profiles
*/
require_once('library/bones.php'); // if you remove this, bones will break
/*
2. library/custom-post-type.php
	- an example custom post type
	- example custom taxonomy (like categories)
	- example custom taxonomy (like tags)
*/
require_once('library/custom-post-type.php'); // you can disable this if you like
/*
3. library/admin.php
	- removing some default WordPress dashboard widgets
	- an example custom dashboard widget
	- adding custom login css
	- changing text in footer of admin
*/
require_once('library/admin.php'); // this comes turned off by default
/*
4. library/translation/translation.php
	- adding support for other languages
*/
// require_once('library/translation/translation.php'); // this comes turned off by default

/************* THUMBNAIL SIZE OPTIONS *************/

// Thumbnail sizes
add_image_size( 'bones-thumb-600', 600, 150, true );
add_image_size( 'bones-thumb-300', 300, 100, true );
/*
to add more sizes, simply copy a line from above
and change the dimensions & name. As long as you
upload a "featured image" as large as the biggest
set width or height, all the other sizes will be
auto-cropped.

To call a different size, simply change the text
inside the thumbnail function.

For example, to call the 300 x 300 sized image,
we would use the function:
<?php the_post_thumbnail( 'bones-thumb-300' ); ?>
for the 600 x 100 image:
<?php the_post_thumbnail( 'bones-thumb-600' ); ?>

You can change the names and dimensions to whatever
you like. Enjoy!
*/

/************* ACTIVE SIDEBARS ********************/

// Sidebars & Widgetizes Areas
function bones_register_sidebars() {
	register_sidebar(array(
		'id' => 'sidebar1',
		'name' => __('Sidebar 1', 'bonestheme'),
		'description' => __('The first (primary) sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));

	/*
	to add more sidebars or widgetized areas, just copy
	and edit the above sidebar code. In order to call
	your new sidebar just use the following code:

	Just change the name to whatever your new
	sidebar's id is, for example:
	*/
	register_sidebar(array(
		'id' => 'widgetcart',
		'name' => __('Widget Cart', 'bonestheme'),
		'description' => __('The widget cart sidebar.', 'bonestheme'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));
	/*
	To call the sidebar in your template, you can just copy
	the sidebar.php file and rename it to your sidebar's name.
	So using the above example, it would be:
	sidebar-sidebar2.php

	*/
} // don't remove this bracket!

/************* COMMENT LAYOUT *********************/

// Comment Layout
function bones_comments($comment, $args, $depth) {
   $GLOBALS['comment'] = $comment; ?>
	<li <?php comment_class(); ?>>
		<article id="comment-<?php comment_ID(); ?>" class="clearfix">
			<header class="comment-author vcard">
				<?php
				/*
					this is the new responsive optimized comment image. It used the new HTML5 data-attribute to display comment gravatars on larger screens only. What this means is that on larger posts, mobile sites don't have a ton of requests for comment images. This makes load time incredibly fast! If you'd like to change it back, just replace it with the regular wordpress gravatar call:
					echo get_avatar($comment,$size='32',$default='<path_to_url>' );
				*/
				?>
				<!-- custom gravatar call -->
				<?php
					// create variable
					$bgauthemail = get_comment_author_email();
				?>
				<img data-gravatar="http://www.gravatar.com/avatar/<?php echo md5($bgauthemail); ?>?s=32" class="load-gravatar avatar avatar-48 photo" height="32" width="32" src="<?php echo get_template_directory_uri(); ?>/library/images/nothing.gif" />
				<!-- end custom gravatar call -->
				<?php printf(__('<cite class="fn">%s</cite>', 'bonestheme'), get_comment_author_link()) ?>
				<time datetime="<?php echo comment_time('Y-m-j'); ?>"><a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ) ?>"><?php comment_time(__('F jS, Y', 'bonestheme')); ?> </a></time>
				<?php edit_comment_link(__('(Edit)', 'bonestheme'),'  ','') ?>
			</header>
			<?php if ($comment->comment_approved == '0') : ?>
				<div class="alert alert-info">
					<p><?php _e('Your comment is awaiting moderation.', 'bonestheme') ?></p>
				</div>
			<?php endif; ?>
			<section class="comment_content clearfix">
				<?php comment_text() ?>
			</section>
			<?php comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
		</article>
	<!-- </li> is added by WordPress automatically -->
<?php
} // don't remove this bracket!

/************* SEARCH FORM LAYOUT *****************/

// Search Form
function bones_wpsearch($form) {
	$form = '<form role="search" method="get" id="searchform" action="' . home_url( '/' ) . '" >
	<input type="text" value="' . get_search_query() . '" name="s" id="s" placeholder="'.esc_attr__('Search the Site...','bonestheme').'" />
	<input type="submit" id="searchsubmit" class="btn" value="'. esc_attr__('Search') .'" />
	</form>';
	return $form;
} // don't remove this bracket!

function my_body_class( $classes ) {
    global $post;

    # Page
    if ( is_page() ) {
        # Has parent / is sub-page
        if ( $post->post_parent ) {
            # Parent post name/slug
            $parent = get_post( $post->post_parent );
            $classes[] = $parent->post_name;

            # Parent template name
            $parent_template = get_post_meta( $parent->ID, '_wp_page_template', true);
            if ( !empty($parent_template) )
                $classes[] = 'template-'.sanitize_html_class( str_replace( '.', '-', $parent_template ), '' );
        }
    }

    return $classes;
}
add_filter( 'body_class', 'my_body_class' );

function wpprogrammer_post_name_in_body_class( $classes ){
	if( is_singular() )
	{
		global $post;
		array_push( $classes, "{$post->post_type}-{$post->post_name}", "{$post->post_name}" );
	}
	return $classes;
}

add_filter( 'body_class', 'wpprogrammer_post_name_in_body_class' );


add_action('show_user_profile', 'my_user_profile_edit_action');
add_action('edit_user_profile', 'my_user_profile_edit_action');
function my_user_profile_edit_action($user) {
  $checked = (isset($user->hbp) && $user->hbp) ? ' checked="checked"' : '';
?>
  <h3>High Bias Plus</h3>
  <table class="form-table">
  <tr>
  <th><label for="hbp">High Bias Plus</label></th>
    <td><input name="hbp" type="checkbox" id="hbp" value="1"<?php echo $checked; ?>></td>
  </tr>
  </table>
  <table class="form-table">
	  <tr>
			<th><label for="hbp_credits">HBP Credits</label></th>
				<td>
				<input type="text" name="hbp_credits" id="hbp_credits" value="<?php echo esc_attr( get_the_author_meta( 'hbp_credits', $user->ID ) ); ?>" class="regular-text" />
				</td>
	</tr>

	</table>
	<table class="form-table">
	  <tr>
			<th><label for="hbp_level">HBP Level</label></th>
				<td>
				<input type="text" name="hbp_level" id="hbp_level" value="<?php echo esc_attr( get_the_author_meta( 'hbp_level', $user->ID ) ); ?>" class="regular-text" />
				</td>
	</tr>

	</table>
<?php 
}

// Add custom HBP user meta fields (and save them)
add_action('personal_options_update', 'my_user_profile_update_action');
add_action('edit_user_profile_update', 'my_user_profile_update_action');
function my_user_profile_update_action($user_id) {

if ( !current_user_can( 'edit_user', $user_id ) )
		return false;
		
  update_user_meta($user_id, 'hbp', isset($_POST['hbp']));
  update_user_meta($user_id, 'hbp_credits', $_POST['hbp_credits']);
  update_user_meta($user_id, 'hbp_level', $_POST['hbp_level']);
}

// Hide admin bar for non-admins on front end
add_action('after_setup_theme', 'remove_admin_bar');

function remove_admin_bar() {
if (!current_user_can('administrator') && !is_admin()) {
  show_admin_bar(false);
}
}


function test_modify_user_table( $column ) {
    $column['hbp'] = 'HBP';
    $column['hbp_credits'] = 'HBP Credits';
    $column['hbp_level'] = 'HBP Level';
 
    return $column;
}
 
add_filter( 'manage_users_columns', 'test_modify_user_table' );
 
function test_modify_user_table_row( $val, $column_name, $user_id ) {
    $user = get_userdata( $user_id );
 
    switch ($column_name) {
        case 'hbp' :
            return $user->hbp;
            break;
        case 'hbp_credits' :
            return $user->hbp_credits;
            break;
        case 'hbp_level' :
            return $user->hbp_level;
            break;

        default:
    }
 
    return $return;
}
 
add_filter( 'manage_users_custom_column', 'test_modify_user_table_row', 10, 3 );


// ===== remove edit profile link from admin bar and side menu and kill profile page if not an admin
if( !current_user_can('activate_plugins') ) {
function mytheme_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('edit-profile', 'user-actions');
}
add_action( 'wp_before_admin_bar_render', 'mytheme_admin_bar_render' );

function stop_access_profile() {
    if(IS_PROFILE_PAGE === true) {
        wp_die( 'Please contact your administrator to have your profile information changed.<br><a href="javascript:history.go(-1)">&larr; Return to previous page.</a>' );
    }
    remove_menu_page( 'profile.php' );
    remove_submenu_page( 'users.php', 'profile.php' );
}
add_action( 'admin_init', 'stop_access_profile' );
}

// Redirect client to Client page on login
function my_redirect_function() {
	if( !current_user_can( 'administrator' ) && is_user_logged_in() ){
    // Check if Clients page is being displayed
    if ( is_page(9) ) {
        global $userdata;
        get_currentuserinfo();
        $username = $userdata->user_login;
        $url = home_url() . '/clients/' . $username;

        wp_redirect( $url );
        exit;
    }
   }
}
add_action( 'template_redirect', 'my_redirect_function' );

add_filter('body_class','browser_body_class');
function browser_body_class($classes) {
    global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;
    if($is_lynx) $classes[] = 'lynx';
    elseif($is_gecko) $classes[] = 'gecko';
    elseif($is_opera) $classes[] = 'opera';
    elseif($is_NS4) $classes[] = 'ns4';
    elseif($is_safari) $classes[] = 'safari';
    elseif($is_chrome) $classes[] = 'chrome';
    elseif($is_IE) $classes[] = 'ie';
    else $classes[] = 'unknown';
    if($is_iphone) $classes[] = 'iphone';
    return $classes;
}

//**Custom Gravatar**/
add_filter( 'avatar_defaults', 'hbm_custom_gravatar' );
function hbm_custom_gravatar ($avatar_defaults) {
$myavatar = get_bloginfo('template_directory') . '/library/images/hbmavatar.png';
$avatar_defaults[$myavatar] = "High Bias";
return $avatar_defaults;
}

// Add role class to body
function add_role_to_body($classes) {
	
	global $current_user;
	$user_role = array_shift($current_user->roles);
	
	$classes[] = $user_role;
	return $classes;
}
add_filter('body_class','add_role_to_body');
add_filter('admin_body_class', 'add_role_to_body');

// Add user name to body class
function user_bodyclass($classes) {

	global $userdata;
    get_currentuserinfo();
	
	$username = ( $userdata->user_login );
	
	$classes[] = $username;
	return $classes;
}
add_filter('body_class','user_bodyclass');
add_filter('admin_body_class', 'user_bodyclass');

// Add user meta (High Bias Plus) to body class
function user_meta_filter_body_class( $classes ) {
	global $current_user;
    get_currentuserinfo(); //wordpress global variable to fetch logged in user info
    $userID = $current_user->ID; //logged in user's ID
    $havemeta = get_user_meta($userID,'hbp',true); //stores the value of logged in user's meta data for 'hbp'.
    if ($havemeta) {
        $classes[] = 'highbiasplus';
    }
    return $classes;
}
add_filter( 'body_class', 'user_meta_filter_body_class' );

// Grab first image for post excerpts
function catch_that_image() {
  global $post, $posts;
  $first_img = '';
  ob_start();
  ob_end_clean();
  $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
  $first_img = $matches[1][0];

  if(empty($first_img)) {
    $first_img = "/path/to/default.png";
  }
  return $first_img;
}

add_action( 'wp_print_scripts', 'my_deregister_javascript', 100 );

function my_deregister_javascript() {
	wp_deregister_script( 'login-with-ajax' );
}

add_action( 'wp_print_styles', 'my_deregister_styles', 100 );

function my_deregister_styles() {
	wp_deregister_style( 'login-with-ajax' );
	wp_deregister_style( 'tablepress' );
	wp_deregister_style( 'cart66-css' );
}

// Remove auto generated feed links
function my_remove_feeds() {
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	remove_action( 'wp_head', 'feed_links', 2 );
}
add_action( 'after_setup_theme', 'my_remove_feeds' );

// Prevents WordPress from testing ssl capability on domain.com/xmlrpc.php?rsd
remove_filter('atom_service_url','atom_service_url_filter');


// Removes jQuery Migrate (added in WP Core 3.6.1)
add_filter( 'wp_default_scripts', 'dequeue_jquery_migrate' );

function dequeue_jquery_migrate( &$scripts){
	if(!is_admin()){
		$scripts->remove( 'jquery');
		$scripts->add( 'jquery', false, array( 'jquery-core' ), '1.10.2' );
	}
}

// Flush the W3 Total Cache on logout
add_action('wp_logout', 'mj_flush_w3tc_cache');
function mj_flush_w3tc_cache()
{
    if (function_exists('w3tc_pgcache_flush')) {
        w3tc_pgcache_flush();
    }
}
?>