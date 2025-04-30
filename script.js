const data = [
  {
    name: 'first-name',
    value: '',
    type: 'text',
    isValid: false
  },
  {
    name: 'last-name',
    value: '',
    type: 'text',
    isValid: false
  },
  {
    name: 'email',
    value: '',
    type: 'text',
    isValid: false
  },
  {
    name: 'query-type',
    value: '',
    type: 'radio',
    isValid: false
  },
  {
    name: 'message',
    value: '',
    type: 'textarea',
    isValid: false
  },
  {
    name: 'contact-consent',
    value: '',
    type: 'checkbox',
    isValid: false
  }
];

const emailRegex = /^\S+@\S+\.\S+$/;

const form = document.getElementById('contact-form');

const successScreen = document.getElementById('modal-screen');

const areAllInputsValid = (dataArray) => {
  return dataArray.every(input => input.isValid);
};

const displayErrorState = (input) => {
  const inputField = document.getElementById(`${input.name}`);

  const errorMessage = document.getElementById(`${input.name}-error`);

  // console.log(errorMessage);

  if (input.type === 'text' || input.type === 'textarea'){
     inputField.style.borderColor = 'red';
  }

  errorMessage.classList.remove('hidden');
};

const validateData = () => {
  if (areAllInputsValid(data)) {
    successScreen.style.display = 'block';
    console.log('success');
    clearInputs(data);
  } 
  else{
    const inValidInputs = data.filter((input) => input.isValid === false);

    inValidInputs.forEach(errorInput => displayErrorState(errorInput));
  }
};

const clearInputs = (dataArray) => {
  const errorMessages = Array.from(document.querySelectorAll('.error-message'));
  errorMessages.forEach((message) => {
    message.classList.add('hidden');
  });

  dataArray.forEach((input) => {
    const inputField = input.type === 'radio' ? document.getElementById(`${input.value}`) : document.getElementById(`${input.name}`);

    inputField.style.borderColor = '';

    const originalBorderColor = getComputedStyle(inputField).borderColor;

    switch (input.type) {
      case 'text':
      case 'textarea':
        inputField.value = '';
        
        inputField.style.borderColor = `${originalBorderColor}`;
        break;
      case 'checkbox':
        inputField.checked = false;
        break;
      case 'radio':
        inputField.checked = false;
    }
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  data.forEach((input) => {
    const value = formData.get(input.name);
    input.value = value;

    switch (input.name){
      case 'first-name':
      case 'last-name':
      case 'message':
        input.value = value !=='' ? value.trim() : '';
        input.isValid = value !=='' ? true : false;
        break;
      case 'query-type':
        input.value = formData.get('query-type') !== null ? formData.get('query-type') : '';
        input.isValid = formData.get('query-type') !== null ? true : false;
        break;
      case 'email':
        input.value = value !=='' ? value.trim() : '';
        input.isValid = emailRegex.test(input.value);
        break;
      case 'contact-consent':
        input.value = formData.get('contact-consent') === 'on';
        input.isValid = formData.get('contact-consent') === 'on';
        break;
      default:
        input.isValid = false;
    }
  });

  // console.log(data);
  validateData();
});
