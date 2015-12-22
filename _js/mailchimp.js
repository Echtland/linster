import $ from 'jquery';

function sendRequest(form, url) {
  $.ajax({
    type: "GET",
    url: url,
    data: form.serialize(),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    error: error,
    success: success.bind(form)
  });
}

function success(data) {
  if (data.result !== "success") {
    this.closest('.box.newsletter').html("<p>" + data.msg + "</p>");
  } else {
    this.closest('.box.newsletter').html("<p>" + data.msg + "</p>");
    this.find('input[name="EMAIL"]').val();
  }
}

function error(err) {
  return alert("Could not connect to the registration server.");
}

export function sendForm(form) {
  var form = $(form);
  sendRequest(form, "//andiemutigen.us11.list-manage.com/subscribe/post-json?c=?");
  return false;
}
