$(document).ready(function () {

    // PRELOADER
    $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website.


        // PAGE LOADER
    jQuery('#grid-container').on('initComplete.cbp', function () {
        if ($('#ajax-tab-container').length) {
            $('#ajax-tab-container').easytabs({
                tabs: 'header nav ul li',
                animate			: true,
                updateHash		: false,
                transitionIn	:'fadeIn',
                transitionOut	:'fadeOut',
                animationSpeed	:100,
                tabActiveClass	:'active',
                transitionInEasing: 'linear',
                  transitionOutEasing: 'linear',
            });
        }
    });


    // RESPONSIVE MENU
    function transform(){
        var outdiv = '<div class="menuout"><div class="menuin"><ul class="tabs"></ul></div></div>';
        $(outdiv).appendTo("nav");
        var resmenus = $('.tabs').html();
        $(".menuout .menuin .tabs").append(resmenus);
       $('.menuin').hide(); 
    }
    transform();
    $('.hamburger').on('click', function() {
       $('.menuin').slideToggle(); 
    });
    $('.menuout').on('click', function () {
        $('.menuin').slideUp();  
    });

    // OWL CAROUSEL GENERAL JS
    if ($('.owl-carousel').length) {
        $('.owl-carousel').each(function () {
            $(this).owlCarousel({
                items: $(this).data('items') ? $(this).data('items') : 3
                , autoPlay: $(this).data('autoplay') ? $(this).data('autoplay') : 2500
                , pagination: $(this).data('pagination') ? $(this).data('pagination') : false
                , itemsDesktop: [1199, 3]
                , itemsDesktopSmall: [979, 3]
            });
        });
    }

    // PORTFOLIO CONTENT  
    $('#grid-container').cubeportfolio({
        layoutMode: 'grid',
        filters: '#filters-container',
        gridAdjustment: 'responsive',
        animationType: 'skew',
        defaultFilter: '*',
        gapVertical: 0,
        gapHorizontal: 0,
        singlePageAnimation: 'fade',
        mediaQueries: [{
                width: 700,
                cols: 3,
            }, {
                width: 480,
                cols: 2,
                options: {
                    caption: '',
                    gapHorizontal: 30,
                    gapVertical: 20,
                }
            }, {
                width: 320,
                cols: 1,
                options: {
                    caption: '',
                    gapHorizontal: 50,
                }
            }],            
        singlePageCallback: function (url, element) {
            var t = this;
            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 30000
                })
                .done(function (result) {
                    t.updateSinglePage(result);
                })
                .fail(function () {
                    t.updateSinglePage('AJAX Error! Please refresh the page!');
                });
        },
            plugins: {
                loadMore: {
                    element: '#js-loadMore-agency',
                    action: 'click',
                    loadItems: 3,
                }
            }
    }); 

    // BLOG CONTENT  
    $('#grid-blog').cubeportfolio({
        layoutMode: 'grid',
        gridAdjustment: 'responsive',
        gapVertical: 0,
        gapHorizontal: 0,
        mediaQueries: [{
                width: 700,
                cols: 3,
            }, {
                width: 480,
                cols: 2,
                options: {
                    caption: '',
                    gapHorizontal: 30,
                    gapVertical: 20,
                }
            }, {
                width: 320,
                cols: 1,
                options: {
                    caption: '',
                    gapHorizontal: 50,
                }
            }],
            plugins: {
                loadMore: {
                    element: '#load-posts',
                    action: 'click',
                    loadItems: 3,
                }
            }
    }); 

    // GALLERY WIDGET  
    $('#widget-gallery').cubeportfolio({
        layoutMode: 'grid',
        gridAdjustment: 'responsive',
        gapVertical: 0,
        gapHorizontal: 0,
        mediaQueries: [{
                width: 700,
                cols: 4,
            }, {
                width: 480,
                cols: 2,
                options: {
                    caption: '',
                    gapHorizontal: 30,
                    gapVertical: 20,
                }
            }, {
                width: 320,
                cols: 1,
                options: {
                    caption: '',
                    gapHorizontal: 50,
                }
            }]
    }); 

}); // document ready end 


"use strict";
$(window).load(function () {





}); // window load end 



(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      
      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      
      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      
      $self.data('countTo', data);
      
      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      
      // initialize the element with the starting value
      render(value);
      
      function updateTimer() {
        value += increment;
        loopCount++;
        
        render(value);
        
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
  }
});







