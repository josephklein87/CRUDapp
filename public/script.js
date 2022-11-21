const viewPassword= () => {
    {
        let passwordInput = document.querySelector('.password-field');
        let passStatus = document.querySelector('.pass-status');
    
    if (passwordInput.type == 'password'){
        passwordInput.type='text';
        passStatus.className='fa-eye-slash';
        
    }
    else{
            passwordInput.type='password';
            passStatus.className='fa-eye';
    }
    }
}

document.querySelector("fa-eye").on("click", viewPassword)
