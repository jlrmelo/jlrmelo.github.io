// Contact form: loads hCaptcha, keeps its theme in step with the site, and posts the form to Web3Forms as JSON.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var root = document.documentElement;
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var captchaEl = document.getElementById('contact-captcha');
  var submit = document.getElementById('contact-submit');
  var status = document.getElementById('contact-status');
  var success = document.getElementById('contact-success');
  var widgetId = null;
  var sending = false;

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  function renderCaptcha() {
    widgetId = window.hcaptcha.render(captchaEl, { sitekey: captchaEl.dataset.sitekey, theme: currentTheme() });
  }

  // Re-draws an unsolved captcha so it matches the theme; a solved one is left alone.
  function refreshCaptcha() {
    if (widgetId === null || !window.hcaptcha || window.hcaptcha.getResponse(widgetId)) return;
    window.hcaptcha.remove(widgetId);
    renderCaptcha();
  }

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
    try { window.hcaptcha.reset(widgetId); } catch (e) {}
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

    if (!window.hcaptcha || widgetId === null) {
      showLinkedInError("The captcha couldn't load. Please refresh the page, or contact me on ");
      return;
    }

    var token = window.hcaptcha.getResponse(widgetId);
    if (!token) {
      setStatus('Please complete the captcha check before sending.', true);
      return;
    }

    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';

    var payload = Object.fromEntries(new FormData(form));
    payload['h-captcha-response'] = token;

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

  window.onContactCaptchaLoad = renderCaptcha;
  var script = document.createElement('script');
  script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&onload=onContactCaptchaLoad';
  script.async = true;
  document.head.appendChild(script);

  new MutationObserver(refreshCaptcha).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (systemDark.addEventListener) systemDark.addEventListener('change', refreshCaptcha);
})();
