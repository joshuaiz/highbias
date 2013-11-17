<?php 
/*
 * This is the page users will see logged in. 
 * You can edit this, but for upgrade safety you should copy and modify this file into your template folder.
 * The location from within your template folder is plugins/login-with-ajax/ (create these directories if they don't exist)
*/
?>
<div class="lwa">
	<?php 
		global $current_user;
		get_currentuserinfo();
	?>
	<div class="lwa-title-sub" style="display:none"><?php echo __( 'Hi', 'login-with-ajax' ) . " " . $current_user->display_name  ?></div>
	<table>
		<tr>
			<td class="avatar" class="lwa-avatar">
				<?php echo get_avatar( $current_user->ID, $size = '57' );  ?>
			</td>
			<td class="lwa-info">
				<?php
					//Admin URL
					if ( $lwa_data['profile_link'] == '1' ) {
						if( function_exists('bp_loggedin_user_link') ){
							?>
							<a href="<?php bp_loggedin_user_link(); ?>"><?php esc_html_e('Profile','login-with-ajax') ?></a><br/>
							<?php	
						}else{
							?>
							<a href="<?php echo trailingslashit(get_admin_url()); ?>profile.php"><?php esc_html_e('Profile','login-with-ajax') ?></a><br/>
							<?php	
						}
					}
					//Logout URL
					?>
					<a id="wp-logout" href="<?php echo wp_logout_url() ?>"><?php esc_html_e( 'Log Out' ,'login-with-ajax') ?></a><br />
					
					<?php 
					if( current_user_can('client') ) {
						?>
						<a href="<?php echo home_url(); ?>/clients/<?php global $userdata;
      					get_currentuserinfo(); echo( $userdata->user_login );?>"><?php esc_html_e("Your Client page", 'login-with-ajax'); ?></a>
						<?php
					} ?>
					<?php
					//Blog Admin
					if( current_user_can('list_users') ) {
						?>
						<a href="<?php echo get_admin_url(); ?>"><?php esc_html_e("Dashboard", 'login-with-ajax'); ?></a>
						<?php
					}
				?>
			</td>
		</tr>
	</table>
</div>