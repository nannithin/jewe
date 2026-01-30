// ---------------- GLOBAL FLAG ----------------
let hasInteracted = false;

// ---------------- DISPOSABLE EMAILS ----------------
const disposableDomains = [
  'tempmail.com', 'temp-mail.org', '10minutemail.com', 'guerrillamail.com',
  'mailinator.com', 'maildrop.cc', 'spam4.me', 'trashmail.com', 'yopmail.com',
  'throwaway.email', 'fakeinbox.com', 'mailnesia.com', 'temp-mail.io'
];

// ---------------- LOCATION DATA ----------------
const locationData = {
  'United States': {
    'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
    'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville']
  },
  'Canada': {
    'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'London'],
    'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Kelowna'],
    'Quebec': ['Montreal', 'Quebec City', 'Gatineau', 'Sherbrooke']
  },
  'United Kingdom': {
    'England': ['London', 'Manchester', 'Birmingham', 'Leeds'],
    'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
    'Wales': ['Cardiff', 'Swansea', 'Newport', 'Caerphilly']
  },
  'Australia': {
    'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'],
    'Victoria': ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'],
    'Queensland': ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville']
  }
};

// ---------------- ELEMENTS ----------------
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const errorAlert = document.getElementById('errorAlert');
const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');

// ---------------- COUNTRY → STATE ----------------
countrySelect.addEventListener('change', function () {
  hasInteracted = true;
  stateSelect.innerHTML = '<option value="">Select State</option>';
  citySelect.innerHTML = '<option value="">Select City</option>';

  if (this.value && locationData[this.value]) {
    Object.keys(locationData[this.value]).forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  }
  validateForm();
});

// ---------------- STATE → CITY ----------------
stateSelect.addEventListener('change', function () {
  hasInteracted = true;
  citySelect.innerHTML = '<option value="">Select City</option>';

  const country = countrySelect.value;
  if (country && this.value && locationData[country][this.value]) {
    locationData[country][this.value].forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }
  validateForm();
});

// ---------------- PASSWORD STRENGTH ----------------
document.getElementById('password').addEventListener('input', function () {
  hasInteracted = true;

  const password = this.value;
  const strengthBar = this.parentElement.querySelector('.strength-bar');
  const strengthText = this.parentElement.querySelector('.strength-text');

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  strengthBar.className = 'strength-bar';
  strengthText.className = 'strength-text';

  if (!password) {
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
  } else if (strength <= 1) {
    strengthBar.classList.add('weak');
    strengthText.classList.add('weak');
    strengthText.textContent = 'Weak password';
  } else if (strength <= 2) {
    strengthBar.classList.add('medium');
    strengthText.classList.add('medium');
    strengthText.textContent = 'Medium strength';
  } else {
    strengthBar.classList.add('strong');
    strengthText.classList.add('strong');
    strengthText.textContent = 'Strong password';
  }

  validateForm();
});

// ---------------- INTERACTION LISTENERS ----------------
document.querySelectorAll('input, select').forEach(field => {
  field.addEventListener('input', () => {
    hasInteracted = true;
    validateForm();
  });
  field.addEventListener('change', () => {
    hasInteracted = true;
    validateForm();
  });
});

// ---------------- VALIDATION ----------------
function validateForm() {
  let isValid = true;

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('termsCheckbox').checked;

  // ---------- FIRST NAME ----------
  const firstNameField = document.getElementById('firstName');
  const firstNameError = firstNameField.parentElement.querySelector('.error-message');
  if (!firstName && hasInteracted) {
    firstNameField.classList.add('error');
    firstNameError.textContent = 'First name is required';
    firstNameError.classList.add('show');
    isValid = false;
  } else {
    firstNameField.classList.remove('error');
    firstNameError.classList.remove('show');
  }

  // ---------- LAST NAME ----------
  const lastNameField = document.getElementById('lastName');
  const lastNameError = lastNameField.parentElement.querySelector('.error-message');
  if (!lastName && hasInteracted) {
    lastNameField.classList.add('error');
    lastNameError.textContent = 'Last name is required';
    lastNameError.classList.add('show');
    isValid = false;
  } else {
    lastNameField.classList.remove('error');
    lastNameError.classList.remove('show');
  }

  // ---------- EMAIL ----------
  const emailField = document.getElementById('email');
  const emailError = emailField.parentElement.querySelector('.error-message');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email && hasInteracted) {
    emailField.classList.add('error');
    emailError.textContent = 'Email is required';
    emailError.classList.add('show');
    isValid = false;
  } else if (email && !emailRegex.test(email) && hasInteracted) {
    emailField.classList.add('error');
    emailError.textContent = 'Please enter a valid email';
    emailError.classList.add('show');
    isValid = false;
  } else if (email) {
    const domain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
      emailField.classList.add('error');
      emailError.textContent = 'Disposable email domains are not allowed';
      emailError.classList.add('show');
      isValid = false;
    } else {
      emailField.classList.remove('error');
      emailError.classList.remove('show');
    }
  }

  // ---------- PHONE ----------
  const phoneField = document.getElementById('phone');
  const phoneError = phoneField.parentElement.querySelector('.error-message');
  const phoneRegex = /^\+?[0-9\s\-\(\)]{8,}$/;

  if (!phone && hasInteracted) {
    phoneField.classList.add('error');
    phoneError.textContent = 'Phone number is required';
    phoneError.classList.add('show');
    isValid = false;
  } else if (phone && !phoneRegex.test(phone) && hasInteracted) {
    phoneField.classList.add('error');
    phoneError.textContent = 'Please enter a valid phone number';
    phoneError.classList.add('show');
    isValid = false;
  } else {
    phoneField.classList.remove('error');
    phoneError.classList.remove('show');
  }

  // ---------- GENDER ----------
  const genderGroup = document.getElementById('genderGroup');
  const genderError = genderGroup.querySelector('.error-message');
  if (!gender && hasInteracted) {
    genderError.textContent = 'Please select a gender';
    genderError.classList.add('show');
    isValid = false;
  } else {
    genderError.classList.remove('show');
  }

  // ---------- PASSWORD ----------
  const passwordField = document.getElementById('password');
  const passwordError = passwordField.parentElement.querySelector('.error-message');
  if (!password && hasInteracted) {
    passwordField.classList.add('error');
    passwordError.textContent = 'Password is required';
    passwordError.classList.add('show');
    isValid = false;
  } else if (password && password.length < 8 && hasInteracted) {
    passwordField.classList.add('error');
    passwordError.textContent = 'Password must be at least 8 characters';
    passwordError.classList.add('show');
    isValid = false;
  } else {
    passwordField.classList.remove('error');
    passwordError.classList.remove('show');
  }

  // ---------- CONFIRM PASSWORD ----------
  const confirmPasswordField = document.getElementById('confirmPassword');
  const confirmPasswordError = confirmPasswordField.parentElement.querySelector('.error-message');
  if (!confirmPassword && hasInteracted) {
    confirmPasswordField.classList.add('error');
    confirmPasswordError.textContent = 'Please confirm your password';
    confirmPasswordError.classList.add('show');
    isValid = false;
  } else if (password !== confirmPassword && hasInteracted) {
    confirmPasswordField.classList.add('error');
    confirmPasswordError.textContent = 'Passwords do not match';
    confirmPasswordError.classList.add('show');
    isValid = false;
  } else {
    confirmPasswordField.classList.remove('error');
    confirmPasswordError.classList.remove('show');
  }

  // ---------- TERMS ----------
  const termsCheckbox = document.getElementById('termsCheckbox');
  const termsError = termsCheckbox.parentElement.querySelector('.error-message');
  if (!terms && hasInteracted) {
    termsError.textContent = 'You must accept the terms and conditions';
    termsError.classList.add('show');
    isValid = false;
  } else {
    termsError.classList.remove('show');
  }

  submitBtn.disabled = !isValid;
  return isValid;
}

// ---------------- SUBMIT ----------------
form.addEventListener('submit', function (e) {
  e.preventDefault();
  hasInteracted = true;

  if (validateForm()) {
    console.log('Form submitted successfully');
    form.style.display = 'none';
    document.getElementById('successContainer').style.display = 'block';
  }
});

// Initial call (no errors shown)
validateForm();
