function ShowDev()	{

	tl = new TimelineLite({delay:0.4});

	TweenLite.set(".dev-front", {visibility:"visible"})

	tl.from(".img-screen", 0.6, {y:-30, opacity:0})
	  .from(".img-tablet", 0.6, {x:30, opacity:0}, "-=0.3")
	  .from(".img-mobile", 0.6, {y:30, opacity:0}, "-=0.3")
}

function ShowInterests()	{

	tl = new TimelineLite({delay:0.4});

	TweenLite.set(".competences", {visibility:"visible"})

	tl.from(".competences", 0.6, {y:-30, opacity:0.5}, "-=0.3")

}

window.addEventListener("scroll", function(event) {
  
    var top = window.scrollY;

    // console.log(top);
 
 	if(top > 1000){

 		ShowDev();

 	}

 	if(top > 1100){

 		ShowInterests();

 	}
