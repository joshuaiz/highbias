<?php
/*
Template Name: Clients Page
*/
?>

<?php get_header(); ?>

			<div id="content">

				<div id="inner-content" class="wrap clearfix">

						<div id="main" class="eightcol first clearfix" role="main">
						
						<?php $thetitle = strtolower(get_the_title());
		$shorttitle = str_replace(' ', '', $thetitle);
		$username = ( $userdata->user_login ) ?>

		<?php if ( current_user_can( 'level_10' ) || is_user_logged_in() && $username==$shorttitle )  { ?>

							<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

							<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">

								<header class="article-header">

									<h1 class="page-title"><?php the_title(); ?></h1>
									


								</header> <!-- end article header -->

								<section class="entry-content clearfix" itemprop="articleBody">
								<?php
  $children = wp_list_pages('title_li=&child_of='.$post->ID.'&echo=0');
  if ($children) { ?>
  <ul class="child-pages">
  <?php echo $children; ?>
  </ul>
  <?php } ?>

									<?php the_content(); ?>
								</section> <!-- end article section -->

								<footer class="article-footer">
									<p class="clearfix"><?php the_tags('<span class="tags">' . __('Tags:', 'bonestheme') . '</span> ', ', ', ''); ?></p>

								</footer> <!-- end article footer -->

								<?php comments_template(); ?>

							</article> <!-- end article -->

							<?php endwhile; endif; ?>
							
							<?php } elseif ( is_user_logged_in()==false ) { ?>

									<section class="clientcontent">

			<h2>Sorry...</h2>

				<p>You must be logged in to access this area.</p>
				
				<p>To set up an account, please <a href="/contact/">contact us</a> or <a href="/upload/">upload</a> your first project.</p>
				
				<p>&nbsp;</p>

			</section>

		<?php } elseif ( is_user_logged_in() && $username!=$shorttitle ) { ?>

			<div class="unlock_client"><a href="<?php echo home_url(); ?>/clients/<?php global $userdata;
      					get_currentuserinfo(); echo( $userdata->user_login );?>">Go to your Client Page</a></div>
		<?php } ?>


							

						</div> <!-- end #main -->

						<?php get_sidebar(); ?>

				</div> <!-- end #inner-content -->

			</div> <!-- end #content -->

<?php get_footer(); ?>
