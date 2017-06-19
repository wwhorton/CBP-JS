/**
 * Created by Bill on 3/7/2017.
 */

// Imports
import NewsletterUI from "newsletter/NewsletterUI";

// Initialize Foundation JS
$(document).foundation({
    equalizer: {
        equalize_on_stack: true
    }
});

// Re-run Foundation scripts once entire page is loaded
window.addEventListener("load", function(){
    // Newsletter signup modal in footer
    ReactDOM.render(
        React.createElement(NewsletterUI, { modalSelector: '#newsletterModal'} ),
        document.querySelector('#newsletter-modal')
    );
    $(document).foundation('reflow');
});