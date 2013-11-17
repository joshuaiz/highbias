			<footer class="footer" role="contentinfo">

				<div id="inner-footer" class="wrap clearfix">

					<nav role="navigation">
							<?php bones_footer_links(); ?>
					</nav>
					
					<div class="tooltip fade bottom in" style="top: 0px; left: 0px; display: block;float:left;"><div class="tooltip-arrow"></div><div class="tooltip-inner">Follow High Bias Mastering on Twitter: <a class="twitter-link" href="http://twitter.com/hbmastering">@hbmastering</a></div></div>
					
					<div id="testimonials">
<?php
$args = array( 'post_type' => 'testimonial', 'posts_per_page' => 10 );
$loop = new WP_Query( $args );
if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();
$data = get_post_meta( $loop->post->ID, 'testimonial', true );
static $count = 0;
if ($count == "1") { ?>


<div class="slide" style="display: none;">
<div class="client-contact-info"><?php echo $data[ 'person-name' ]; ?>,&nbsp;<?php echo $data[ 'position' ]; ?>,&nbsp;<span><?php echo $data[ 'company' ]; ?></span></div>
<div class="clear"></div>
<div class="testimonial-quote"><?php the_content(); ?></div>
</div>
<?php }
else { ?>


<div class="slide">
<div class="client-contact-info"><?php echo $data[ 'person-name' ]; ?>,&nbsp;<?php echo $data[ 'position' ]; ?>,&nbsp;<span><?php echo $data[ 'company' ]; ?></span></div>
<div class="clear"></div>
<div class="testimonial-quote"><?php the_content(); ?></div>
</div>

<?php 
$count++; } 
endwhile; 
endif; ?>
</div>

<div class="client-guide">
					<a href="http://hbmstatic.com/downloads/HighBiasMastering_2013_Client_Guide.pdf"><img src="http://hbmstatic.com/images/2013_hbm_client_guide_cover@2x.png" width="96px" height="124px"></a>
					<p>Download our <a href="http://hbmstatic.com/downloads/HighBiasMastering_2013_Client_Guide.pdf">2013 Client Guide</a> with submission tips, FAQ, pricing and more.</p>
					</div>

					<p class="source-org copyright small">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <a href="/faq/">FAQ</a> | <a href="/terms/">Terms & Conditions</a> | <a href="/contact/">Contact Us</a></p>

				</div> <!-- end #inner-footer -->

			</footer> <!-- end footer -->

		</div> <!-- end #container -->

<script>
</script>


		<!-- all js scripts are loaded in library/bones.php -->
		<?php wp_footer(); ?>

	</body>

</html> <!-- end page. what a ride! -->
