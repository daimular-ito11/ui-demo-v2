const passwordInputs = document.querySelectorAll('.password__toggler');

passwordInputs.forEach(ele => ele.addEventListener('click', togglePassword));

function togglePassword() {
    const input = document.querySelector(this.dataset.target);
    input.type = input.type === 'password' ? 'text' : 'password';
}