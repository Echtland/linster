import * as Mailchimp from './mailchimp';

$('.myform').submit(function(e) {
  e.preventDefault();
  Mailchimp.sendForm(this);
});
