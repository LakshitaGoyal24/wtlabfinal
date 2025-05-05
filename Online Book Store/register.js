function validtePassword(e){
    e.preventDefault();
    let pwd=document.getElementById("Password").value;
    let cnfPwd=document.getElementById("confirmPassword").value;
    if(pwd!==cnfPwd){
        alert("Confirm passwords should match password")
        return false;
    }
    window.location.href="login.html"
}

