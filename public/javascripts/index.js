const loginButton = document.getElementById("Login");
const SignUpButton = document.getElementById("SignUp");

loginButton.addEventListener("click",()=>{
    window.location.href = "/users/login";
});

SignUpButton.addEventListener("click",()=>{
    window.location.href = "/users/register";
})
