$(window).scroll(function(e) {
	var scroller_anchor = $(".scroller_anchor").offset().top;
	if ($(this).scrollTop() >= scroller_anchor && $('.scroller').css('position') != 'fixed' && $( window ).width() >= 1000) 
	{
		$('.scroller').css({
			'position': 'fixed',
			'top': '0',
			'right': '0',
	    'left': '0',
	    'margin-right': 'auto',
	    'margin-left': 'auto',
	    'opacity': '0.95'
		});


		$('.scroller_anchor').css('height', ($('.scroller').height()));
	} 
	else if ($(this).scrollTop() < scroller_anchor && $('.scroller').css('position') != 'relative') 
	{
		$('.scroller_anchor').css('height', '0px');

		$('.scroller').css({
			'position': 'relative',
	    'opacity': '1'
		});
	}
});