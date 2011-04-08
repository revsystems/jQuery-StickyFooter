(function ( $ ) {

/*

    Inspired by The Man In Blue's solution: http://www.themaninblue.com/writing/perspective/2005/08/29/
    I use most of his tricks, and try to make it more robust by using javascript.
    
    The advantages of a JS implementation:
    
        1. You don't need to know the height of the footer beforehand.
        2. You don't need to manually set a padding on any of your elements.
        3. Automatically clips interior margins that mess up footer positioning (can be turned off).
        
    The cons:
    
        1. If you're doing some weird CSS like body>#content, this will break because the DOM is modified.
        2. The footer will not stick if Javascript is turned off.

    This works by breaking the DOM into two top-level elements: non_footer and footer.
    We use some css tricks to make sure the non_footer is at least the size of the view.
    Then we add some internal padding (space for the footer) and set a negative margin to 
    place the footer in that space.

    All combined, this forces the footer to the bottom of the page without obscuring 
    any body contents.
    
    This plugin expects markup like:
    
    <!DOCTYPE html>
    <html>
      <head>
        ...
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
        <script type="text/javascript" src="/jquery.stickfooter.js"></script>
        <script type="text/javascript">
          $("#footer").stickyFooter();
        </script>
      </head>
      <body>
        Some contents
        <div id="contents">
          more contents here
        </div>
        .
        .
        .
        <div id="footer">
          Put anything you want in the footer.
        </div>
      </body>
    </html>

*/

    // NOTE: This does not fix the double margins bug in IE7.
    $.fn.clipMargins = function () {
        return $(this).each(function () {
            var $e = $(this),
                myTop = $e.offset().top,
                myBottom = myTop + $e.height();
            $e.find("*").each(function () {
                var $t = $(this);
                if ($t.offset().top + $t.outerHeight(true) > myBottom) {
                    $t.css("margin-bottom", 0);
                }
                if(("" + $t.css("margin-top")).match(/\d+/) && $t.offset().top - parseInt($t.css("margin-top")) < myTop){
                    $t.css("margin-top", 0);
                }
            });
        });
    };

    $.fn.stickyFooter = function ( options ) {

        if($.browser.msie && $.browser.version < 7) {
          return $(this);
        }
        
        options = $.extend({
            clipMargins: true,
            footerPadClass: "footer_pad",
            nonFooterClass: "non_footer"
        }, options);

        return $(this).each(function () {
            var $footer = $(this),
                $doc = $footer.parent(),
                footerIndex = $doc.contents().index($footer),
                $beforeFooter = $doc.contents(":lt(" + footerIndex + ")"),
                $footerPad = $("<div class='" + options.footerPadClass + "'>&nbsp;</div>"),
                $nonFooter = $("<div class='" + options.nonFooterClass + "'></div>");
            
            // wrap everything before footer in a "non_footer" div
            $("body").prepend($nonFooter);
            $nonFooter
                .append($beforeFooter)
                .append($footerPad);

            // apply css tricks
            $("html, body").css("height", "100%");

            if ($.browser.msie && $.browser.version < 7) {
                $nonFooter.css({
                    height: "100%"
                });
            } else {
                $nonFooter.css({
                    minHeight: "100%"
                });
            }

            $nonFooter.css({
                overflow: "hidden",
                position: "relative"
            });

            $footer.css({
                height: $footer.height(),
                marginTop: -$footer.outerHeight(),
                position: "relative"
            });

            $footerPad.css({
                fontSize: 0,
                height: 0,
                lineHeight: 0,
                paddingBottom: $footer.outerHeight()
            });

            // fix interior element margin issue
            if (options.clipMargins) {
                $footer.clipMargins();
            }
        });
    };

}(jQuery));