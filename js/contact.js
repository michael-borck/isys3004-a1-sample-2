const form = document.getElementById('contact-form');
const successMsg = document.getElementById('success-msg');

function getField(id) { return document.getElementById(id); }
function getError(id) { return document.getElementById(id + '-error'); }

function setError(id, msg) {
  const field = getField(id);
  const error = getError(id);
  if (!field || !error) return;
  error.textContent = msg;
  field.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function validate() {
  let valid = true;

  const name = getField('name').value.trim();
  if (!name) { setError('name', 'Please enter your name.'); valid = false; }
  else setError('name', '');

  const email = getField('email').value.trim();
  if (!email) { setError('email', 'Please enter your email address.'); valid = false; }
  else if (!validateEmail(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
  else setError('email', '');

  const message = getField('message').value.trim();
  if (!message) { setError('message', 'Please enter a message.'); valid = false; }
  else if (message.length < 10) { setError('message', 'Message must be at least 10 characters.'); valid = false; }
  else setError('message', '');

  return valid;
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('visible');
      successMsg.focus();
    }, 800);
  });

  ['name', 'email', 'message'].forEach(id => {
    const field = getField(id);
    if (field) field.addEventListener('input', () => setError(id, ''));
  });
}
