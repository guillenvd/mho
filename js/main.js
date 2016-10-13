;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var getHeight = function() {
		var extraHeight = 0;

		if ( isMobile.any() ) extraHeight = 50;
		
		setTimeout(function(){
			$('#fh5co-main').stop().animate({
				'height': $('.fh5co-tab-content.active').height() + extraHeight +50
			});
		}, 200);
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 8,
			lineCap: 'butt',
			barColor: '#326FAE',
			trackColor:	"#0b314f",
			size: 160,
			animate: 1000
		});
	};

	var tabContainer = function() {
		getHeight();
		$(window).resize(function(){
			getHeight();
		})
	};

	var tabClickTrigger = function() {
		$('.fh5co-tab-menu a').on('click', function(event) {
			event.preventDefault();
			var $this = $(this),
				data = $this.data('tab'),
				pie = $this.data('pie');

			// add/remove active class
			$('.fh5co-tab-menu li').removeClass('active');
			$this.closest('li').addClass('active');

			$('.fh5co-tab-content.active').addClass('animated fadeOutDown');

			setTimeout(function(){
				$('.fh5co-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
				$('.fh5co-tab-content[data-content="'+data+'"]').addClass('animated fadeInUp active');
				getHeight();
			}, 500);

			if ( pie === 'yes' ) {
				setTimeout(function(){
					pieChart();
				}, 800);
			}
			
		})
	};

	// Document on load.
	$(function(){
		tabContainer();
		tabClickTrigger();

	});
$(document).ready(function() {
    $('a.showDiv').unbind().bind('click', function(){
    	if($(this).parent().find('p.textHide').is(":visible")){
    		$(this).empty().text('Show more')
    	}else{
			$(this).empty().text('Show less')
    	}
	  $(this).parent().find('p.textHide').slideToggle('');
	  tabContainer();
	});
});

}());

