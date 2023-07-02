//index
const ContactRegisterForm = document.querySelector(".contact-container");
const btnContactEnviar = document.querySelector(".btnContact-Enviar");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const textarea = document.querySelector(".textarea");
const smallMsj = document.querySelector(".Smallmsj");

//login
const formContainerLogin = document.querySelector(".form-container-login");
console.log(formContainerLogin);
const btnIngresar = document.querySelector(".login-btnIngresar");
//vailida si esta vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
};

//msj error
const msjError = (input, message) => {
  input.classList.remove("inputValidarSucces");
  input.classList.add("inputValidarError");
  const formField = input.parentElement;
  const error = formField.querySelector(".Smallmsj");
  error.style.display = "flex";
  error.classList.add("MsjError");
  error.textContent = message;
};

//msj Success
const msjSuccess = (input) => {
  input.classList.remove("inputValidarError");
  input.classList.add("inputValidarSucces");
  const formField = input.parentElement;
  const error = formField.querySelector(".Smallmsj");
  error.style.display = "none";
  error.classList.add("MsjSuccess");
  error.textContent = "";
};

//minimo y maximo caracteres
const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

//validacion inputs
const checkTextInput = (input) => {
  let valid = false;
  const minCharacters = 3;
  const maxCharacters = 16;

  if (isEmpty(input)) {
    msjError(input, "Este campo es obligatorio");
    return;
  }

  if (!isBetween(input, minCharacters, maxCharacters)) {
    msjError(
      input,
      `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
    );
    return;
  }
  msjSuccess(input);
  valid = true;
  return valid;
};
//expresion regular email
const isEmailValid = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};

//validacion email
const checkEmail = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    msjError(input, "El email es obligatorio");
    return;
  }
  //Si es un mail
  if (!isEmailValid(input)) {
    msjError(input, "El mail no es válido");
    return;
  }

  msjSuccess(input);
  valid = true;
  return valid;
};

//validacion inputs
const checkTexTarea = (input) => {
  let valid = false;
  const minCharacters = 10;
  const maxCharacters = 100;

  if (isEmpty(input)) {
    msjError(input, "Este campo es obligatorio");
    return;
  }

  if (!isBetween(input, minCharacters, maxCharacters)) {
    msjError(
      input,
      `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
    );
    return;
  }
  msjSuccess(input);
  valid = true;
  return valid;
};
//evento submit page index
const submitContact = (e) => {
  try {
    debugger;
    e.preventDefault();

    let isNameValid = checkTextInput(nameInput);
    let isLastNameValid = checkTextInput(lastNameInput);
    let isEmailValid = checkEmail(emailInput);
    let istextareaValid = checkTexTarea(textarea);

    let isValidForm =
      isNameValid && isLastNameValid && isEmailValid && istextareaValid;

    if (isValidForm) {
      showSuccessModal("Su consulta se envio Correctamente!", 0);
      ContactRegisterForm.reset();
    }
  } catch (error) {
    showSuccessModal(error, -1);
  }
};

//validacion inputs login
const checkTextInputLogin = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    msjError(input, "Este campo es obligatorio");
    return;
  }

  msjSuccess(input);
  valid = true;
  return valid;
};
//evento submit page login
const submitLogin = (e) => {
  try {
    debugger;
    e.preventDefault();

    let isUserValid = checkTextInputLogin(isUserValid);
    let isPasswordValid = checkTextInput(isPasswordValid);

    let isValidForm = isUserValid && isPasswordValid;

    if (isValidForm) {
      showSuccessModal(`Bienvenido ${isUserValid} a Ramen Autos!`, 0);
      formContainerLogin.reset();
    }
  } catch (error) {
    showSuccessModal(error, -1);
  }
};

const initValidaciones = () => {
  ContactRegisterForm.addEventListener("submit", submitContact);
  nameInput.addEventListener("input", () => checkTextInput(nameInput));
  lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  textarea.addEventListener("input", () => checkTexTarea(textarea));

  //login
  formContainerLogin.addEventListener("submit", submitLogin);
};

initValidaciones();
