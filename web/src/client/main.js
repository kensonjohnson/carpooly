const signUpButton = document.getElementById("signup");
const logInButton = document.getElementById("login");

signUpButton.onclick = () => {
  location.href = "/users/register";
};

logInButton.onclick = () => {
  location.href = "/users/login";
};
