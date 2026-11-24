// Contact form: posts the form to Web3Forms as JSON. Web3Forms' script renders the hCaptcha widget and
// adds its token to the form as the h-captcha-response field; this file only reads that token.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var submit = document.getElementById('contact-submit');
  var status = document.getElementById('contact-status');
  var success = document.getElementById('contact-success');
  var sending = false;

  function setStatus(message, isError) {
    status.textContent = '';
    status.classList.toggle('is-error', isError);
    if (message) status.appendChild(document.createTextNode(message));
  }

  // Shows an error with "LinkedIn" as a link after `before` and before the closing full stop.
  function showLinkedInError(before) {
    status.textContent = '';
    status.classList.add('is-error');
    status.appendChild(document.createTextNode(before));
    var link = document.createElement('a');
    link.href = form.dataset.linkedin;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'LinkedIn';
    status.appendChild(link);
    status.appendChild(document.createTextNode('.'));
  }

  function showFailure() {
    showLinkedInError("Sorry, your message couldn't be sent. Please try again, or contact me on ");
    sending = false;
    submit.disabled = false;
    submit.textContent = 'Send message';
    try { if (window.hcaptcha) window.hcaptcha.reset(); } catch (e) {}
  }

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    var title = document.getElementById('contact-success-title');
    title.setAttribute('tabindex', '-1');
    title.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (sending) return;
    setStatus('', false);

    var field = form.querySelector('textarea[name=h-captcha-response]');
    if (!field) {
      showLinkedInError("The captcha couldn't load. Please refresh the page, or contact me on ");
      return;
    }

    if (!field.value) {
      setStatus('Please complete the captcha check before sending.', true);
      return;
    }

    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';

    var payload = Object.fromEntries(new FormData(form));
    payload['h-captcha-response'] = field.value;

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (json) {
          if (res.ok && json.success === true) showSuccess();
          else showFailure();
        });
      })
      .catch(showFailure);
  });
})();
