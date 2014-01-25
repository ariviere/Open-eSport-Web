$(window).scroll(function(e) {
        var scroller_anchor = $(".scroller_anchor").offset().top;
        if ($(this).scrollTop() >= scroller_anchor && $('.scroller').css('position') != 'fixed' && $( window ).width() >= 1000) 
        {
                $('.cl-sidebar').css({
                    'position': 'fixed',
                    'top': 0
                });

                $('.sidebar-item-hide').css({
                    'display': 'none'
                })

                $('.scroller_anchor').css('height', ($('.scroller').height()));
        } 
        else if ($(this).scrollTop() < scroller_anchor && $('.scroller').css('position') != 'relative') 
        {
                $('.scroller_anchor').css('height', '0px');

                $('.sidebar-item-hide').css({
                    'display': 'block'
                })

                $('.cl-sidebar').css({
                    'position': 'absolute',
                    'top': '50px',
                    'opacity': '1'
                });
        }
});