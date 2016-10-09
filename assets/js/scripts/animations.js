var flag1 = true;
var flag2 = true;
var flag3 = true;

$(window).on('scroll', function() {

    var y_scroll_pos = window.pageYOffset;
    // console.log(y_scroll_pos);

    var scroll_pos_ShowDev = 200;  
    var scroll_pos_ShowParcours = 800;   
    var scroll_pos_ShowInterests = 1500;             

    if(y_scroll_pos > scroll_pos_ShowDev && flag1 == true) {
        
        ShowDev();
        flag1 = false;

    }

    if(y_scroll_pos > scroll_pos_ShowParcours && flag2 == true) {
        
        ShowParcours();
        flag2 = false;

    }

    if(y_scroll_pos > scroll_pos_ShowInterests && flag3 == true) {
        
        ShowInterests();
        flag3 = false;

    }

});

function ShowDev()	{

	tl = new TimelineLite({delay:0.2});

	TweenLite.set(".dev-front", {visibility:"visible"})

	tl.from(".title-dev", 0.6, {y:-30, opacity:0})
	  .from(".img-screen", 0.6, {y:-30, opacity:0})
	  .from(".img-tablet", 0.6, {x:+30, opacity:0})
	  .from(".img-mobile", 0.6, {y:30, opacity:0})
	  .from(".texte_presentation", 0.6, {y:+30, opacity:0})

}

function ShowParcours()	{

	tl = new TimelineLite({delay:0.4});

	TweenLite.set(".parcours", {visibility:"visible"})

	tl.from(".title-parcours", 0.6, {y:-30, opacity:0})
	  .from(".row-dut", 0.6, {x:+30, opacity:0})
	  .from(".row-erasmus", 0.6, {x:+30, opacity:0})
	  .from(".row-ducci", 0.6, {x:+30, opacity:0})
	  .from(".row-cim", 0.6, {x:+30, opacity:0})
	  .from(".stage1", 0.6, {x:-30, opacity:0})
	  .from(".stage2", 0.6, {x:-30, opacity:0})
	  .from(".stage3", 0.6, {x:-30, opacity:0})
	  .from(".stage4", 0.6, {x:-30, opacity:0})
	  .from(".stage5", 0.6, {x:-30, opacity:0})

}

function ShowInterests()	{

	tl = new TimelineLite({delay:0.4});

	TweenLite.set(".interets-part", {visibility:"visible"})
	TweenLite.set(".interets", {visibility:"visible"})

	tl.from(".interets-part", 0.6, {y:30, opacity:0.6})
	tl.from(".interets", 0.6, {y:30, opacity:0.6})
}