# jQuery-StickyFooter

Most of the time, I want my footer to anchor to the bottom of the page. If the page contents 
are very short, this won't happen naturally. Enter: jQuery-StickyFooter. jQuery-StickyFooter 
takes the pain out forcing a page footer.

# Demo

You can view the selectboxes in action [here](http://dl.dropbox.com/u/124192/websites/jquerystickyfooter/index.html).
  
# Usage

Requires [jQuery](http://jquery.com) and this plugin.

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
          $(document).ready(function() {
            $("#footer").stickyFooter();
          });
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

# Options

### clipMargins (default: true)

By default, it attempts to clip interior margins that change the positioning of the footer. If you want to handle this yourself,
set to false.

### footerPadClass (default: "footer_pad")

The class of the element that applies padding space for the footer. Sometimes it's useful to have access to it.

### nonFooterClass (default: "non_footer")

The class of the element that wraps everything except the footer.

# Troubleshooting