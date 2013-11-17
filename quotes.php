<?php
 //Chooses a random number 
 $num = Rand (1,6); 
 //Based on the random number, gives a quote 
 switch ($num)
 {
 case 1:
 echo "<p>If architecture is frozen music then music must be liquid architecture. -- <span>Quincy Jones</span></p>";
 break;
 case 2:
 echo "<p>Music gives a soul to the universe, wings to the mind, flight to the imagination
and life to everything. -- <span>Plato</span></p>";
 break;
 case 3:
 echo "<p>If I were not a physicist, I would probably be a musician. I often think in music. I live my daydreams in music. I see my life in terms of music. -- <span>Albert Einstein</span></p>";
 break;
 case 4:
 echo "<p>If it sounds right, it IS right. -- <span>Joe Meek</span></p>";
 break;
 case 5:
 echo "<p>The act of multitrack recording is the act of arranging. -- <span>Quincy Jones</span></p>";
 break;
 case 6:
 echo "<p>After silence, that which comes nearest to expressing the inexpressible is music. -- <span>Aldous Huxley</span><p>";
 }
 ?> 
 