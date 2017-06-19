/**
 * Created by Bill on 5/25/2017.
 */

import _ from "underscore";
import $ from "jquery";
import grecaptcha from  "grecaptcha";

const faqFormContainer = $("#FAQ-form");
const originalFAQForm = faqFormContainer.html();
const successTemplate = `
    <div id="FAQ-form-success">
        <h2>Thank you for your question!</h2>
        <p>We'll try to give you an answer as soon as we can. If you provided a contact email address, keep an eye on your inbox for our response. Don't forget to check back here to see if we've published your question on our site!</p>
    </div>
`;
const waitingTemplate = `
    <div id="FAQ-form-success">
        <h2>Please wait while your question is posted...</h2>
    </div>
`;
const errorListItem = ( error ) => {
    return `
        <li>${error}</li>
    `;
};
const errorTemplate = ( errors ) => {
    return `
        <div id="FAQ-form-success">
            <h2>Uh oh!</h2>
            <p>There seems to be a problem with your submission. We've encountered the following errors:</p>
            <ul>
            ${ _.chain(errors).toArray().map( (error)=> errorListItem(error) ).value() }
            </ul>
            <p></p>
        </div>
    `;
};

const initializeForm = ()=> {
    $("#publishForm").submit(function (e) {
        e.preventDefault();
        const response = grecaptcha.getResponse();
        $.post( '/recaptcha-proxy.php', {
            response: response
        })
        .done(function(data){
            if( data.success ){
                let data = $('#publishForm').serializeArray();
                $.ajax("/discover/faq", {
                    data: data,
                    method: "POST",
                    beforeSend: function () {
                        faqFormContainer.html(waitingTemplate);
                    },
                    error: function (xhr, status, error) {
                        faqFormContainer.html(errorTemplate(error));
                    },
                    success: function (response) {
                        if (response.success) {
                            faqFormContainer.html(successTemplate);
                        } else {
                            faqFormContainer.html(errorTemplate(response.field_errors));
                        }
                    }
                });
            } else {
                alert( "Please complete the CAPTCHA challenge." );
                grecaptcha.reset();
            }
        });
    });
};

const replaceForm = ( selector, element ) => {
    document.getElementById( selector ).innerHTML = element;
};


$(function(){
    initializeForm();
    document.getElementById( "resetForm" ).addEventListener( "click", ()=> {
        replaceForm("FAQ-form", originalFAQForm);
        initializeForm();
    });
});
