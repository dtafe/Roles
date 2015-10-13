(function($) {
    $(function() {
		$(window).scroll(function() {
		 "use strict";
			if ($("#TopDetect").offset().top > 20) {
				$("header#Header").addClass("Fixed");
				$(".ShowPanelButton").addClass("FixedPanel");
			} else {
				$("header#Header").removeClass("Fixed");
				$(".ShowPanelButton").removeClass("FixedPanel");
				//alert('Hehe');
			}
		});
		
		//Testimonials Slider
		$(function() {
			var jcarousel = $('.jcarousel');
	
			jcarousel
				.on('jcarousel:reload jcarousel:create', function () {
					var width = jcarousel.innerWidth();
					//width = 430;
					jcarousel.jcarousel('items').css('width', width + 'px');
				})
				.jcarousel({
					wrap: 'circular'
				}).jcarouselAutoscroll({
            interval: 5000,
            target: '+=1',
            autostart: true
        });

	
			$('.jtest-prev')
				.jcarouselControl({
					target: '-=1'
				});
	
			$('.jtest-next')
				.jcarouselControl({
				target: '+=1'
			});
		});
		
		//Partner Slider Carousel
        $('.PartnerScroll').jcarousel({
			wrap: 'both'
		});
		//Partner Slider Carousel
        $('.PScroll').jcarousel({
			wrap: 'both'
		});
        $('.JPrev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: '-=1'
            });
        $('.JNext')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: '+=1'
		});
		
		//Overlay
		var mainarea = $('#Wraper');
		mainarea.after('<div id="SlideOverlay"></div>');
		var overlay = $('#SlideOverlay');
		overlay.css({
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 99998,
			display: 'none'
		});
		
		
		//Support New
		var support = $('#SupportRight');
		$(document.body).keydown(function (e) {
			if (e.keyCode === 27) {
				hideSupport();
			}
		});
		$(".CloseSupport").click(function (e) {
			hideSupport();
			return false;
		});
		if($.cookie('buble_status') == 1)
		{
			$("#ChatBuble").hide();
		}
		$("#ChatBuble .CloseIcon").click(function (e) {
			$.cookie('buble_status', 1, {expires: 7});
			$("#ChatBuble").hide();
			return false;
		});
		
		$("#ChatBuble .BubleIMG").click(function (e) {
			showSupport();
			$.cookie('buble_status', 1, {expires: 7});
			$("#ChatBuble").hide();
			return false;
		});

		//Profile New
		var profile = $('#ProfileRight');
		$(document.body).keydown(function (e) {
			if (e.keyCode === 27) {
				hideProfile();
			}
		});
		$(".CloseProfile").click(function (e) {
			hideProfile();
			return false;
		});

		// Btn Support
		var btnsupport = $('.ShowSideButton');
		btnsupport.on('click', function (e) {
			e.preventDefault();

			if (btnsupport.hasClass('hide'))
			{
				hideSupport();
			}
			else
			{
				showSupport();
				$.cookie('buble_status', 1, {expires: 7});
				$("#ChatBuble").hide();
			}
		});

		// Btn Profile
		var btnprofile = $('.ShowProfileButton');
		btnprofile.on('click', function (e) {
			e.preventDefault();

			if (btnprofile.hasClass('hide'))
			{
				hideProfile();
			}
			else
			{
				showProfile();
			}
		});
		
		overlay.on('click', function (e) {
			e.preventDefault();
			hideProfile();
			hideSupport();
		});

		//Show Hide Support
		function showSupport() {
			support.stop().animate({
				right: 0
			}, 430);
			$("#ShowSupport").stop().animate({
				right: -200
			}).addClass('hide');
			overlay.show();
		}

		function hideSupport() {
			support.stop().animate({
				right: -400
			}, 430);
			$("#ShowSupport").stop().animate({
				right: 10
			}).removeClass('hide');
			overlay.hide();
		}

		//Show Hide Profile
		function showProfile() {
			profile.stop().animate({
				right: 0
			}, 430);
			$("#ShowSupport").stop().animate({
				right: -200
			}).addClass('hide');
			overlay.show();
		}

		function hideProfile() {
			profile.stop().animate({
				right: -400
			}, 430);
			$("#ShowSupport").stop().animate({
				right: 10
			}).removeClass('hide');
			overlay.hide();
		}
		
		//Uniform
		$(".SCheckbox").uniform();
		
		
		//Login Panel
		var loginarea = $('#LoginTop');
		$(document.body).keydown(function (e) {
			if (e.keyCode === 27) {
				hideLogin();
			}
		});
		var btnLogin = $('#ShowLogin');
		btnLogin.on('click', function (e) {
			e.preventDefault();

			if (btnLogin.hasClass('hide'))
			{
				hideLogin();
			}
			else
			{
				showLogin();
			}
		});
		
		overlay.on('click', function (e) {
			e.preventDefault();

			hideLogin();
		});

		function showLogin() {
			loginarea.stop().animate({
				top: 0
			}, 430);
			btnLogin.stop().addClass('hide');
			overlay.show();
		}

		function hideLogin() {
			loginarea.stop().animate({
				top: -141
			}, 430);
			btnLogin.stop().removeClass('hide');
			overlay.hide();
		}
		
		//Services Tabs
		$("#ServiceTabs li a").click(function () {
			$("#SVTabsContent").empty().append('<div class="vida-loading"><ul class="bokeh"><li></li><li></li><li></li><li></li></ul></div>');
			$("#ServiceTabs li a").removeClass("Active");
			$(this).addClass("Active");
			$.ajax({
				url: this.href,
				success: function (html) {
					$("#SVTabsContent").empty().append(html)
				}
			});
			return false;
		});
    });
})(jQuery);

function refreshCaptcha()
{
	var img = document.images['captchaimg'];
	img.src = img.src.substring(0,img.src.lastIndexOf("?"))+"?width=120&height=38&rand="+Math.random()*1000;
}

$.fn.rater = function (d) {
    var c = $.extend({}, $.fn.rater.defaults, d);
    return this.each(function () {
        var b = $(this);
        var f = b.find(".ui-rater-starsOn");
        var a = b.find(".ui-rater-starsOff");
        c.size = f.height()-1;
        if (c.rating == undefined) {
            c.rating = f.width() / c.size
        }
        if (c.id == undefined) {
            c.id = b.attr("id")
        }
        a.mousemove(function (e) {
            var j = e.clientX - a.offset().left;
            var k = a.width() - (a.width() - j);
            k = Math.ceil(k / (c.size / c.step)) * c.size / c.step;
            f.width(k)
        }).hover(function (e) {
            f.addClass("ui-rater-starsHover")
        }, function (e) {
            f.removeClass("ui-rater-starsHover");
            f.width(c.rating * c.size)
        }).click(function (e) {
            var h = Math.round(f.width() / a.width() * (c.units * c.step)) / c.step;
            a.unbind("click").unbind("mousemove").unbind("mouseenter").unbind("mouseleave");
            a.css("cursor", "default");
            f.css("cursor", "default");
            $.fn.rater.rate(b, c, h)
        }).css("cursor", "pointer");
        f.css("cursor", "pointer")
    })
};
$.fn.rater.defaults = {
    postHref: location.href,
    units: 5,
    step: 1
};
$.fn.rater.rate = function (k, f, g) {
    var h = k.find(".ui-rater-starsOn");
    var j = k.find(".ui-rater-starsOff");
    j.fadeTo(600, 0.4, function () {
        $.ajax({
            url: f.postHref,
            type: "POST",
            data: "id=" + f.id + "&rating=" + g * 2,
            complete: function (a) {
                if (a.status == 200) {
                    if (a.responseText == "Dup") {
                        alert("You cannot spam rating !")
                    } else {
                        alert("Thanks for your rating!");
                        f.rating = parseFloat(a.responseText);
                        j.fadeTo(600, 0.1, function () {
                            h.removeClass("ui-rater-starsHover").width(f.rating * f.size);
                            var b = k.find(".ui-rater-rateCount");
                            b.text(parseInt(b.text()) + 1);
                            k.find(".ui-rater-rating").text(f.rating.toFixed(1));
                            j.fadeTo(600, 1);
                            k.attr("title", "Your rating: " + g.toFixed(1))
                        })
                    }
                } else {
                    alert("Thanks for your rating!");
                    h.removeClass("ui-rater-starsHover").width(f.rating * f.size);
                    k.rater(f);
                    j.fadeTo(2200, 1)
                }
            }
        })
    })
};