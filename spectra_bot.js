exports.handler = function(context, event, callback) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(context.SENDGRID_API_KEY);
    const moment = require('moment');
    let memory = JSON.parse(event.Memory);
    let first_name2 = memory.twilio.collected_data.email_user.answers.first_name.answer || 'to whom it may concern';
    let email2 = memory.twilio.collected_data.email_user.answers.email.answer || 'lsiegle@twilio.com';
    console.log("first name ", first_name2, "email ", email2);
    const msg = {
        to: email2,
        from: context.FROM_EMAIL_ADDRESS,
        subject: `Hi From Spectra!`,
        text: `Hi, ${first_name2}! This is Lizzie from Spectra. Thanks for speaking with our Facebook bot, and now you're speaking with me! How can I help you?`
        
    };
    sgMail.send(msg)
    .then(response => {
        const resp = {
            actions: [
            {
                say: "Thank your for talking with our bot. You will receive an email via SendGrid connecting you with a Spectra human soon."
        	}	 
        	]
        }
        callback(null, resp);
    })
    .catch(err => {
      callback(err);
    });
}
