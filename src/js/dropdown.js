const UIdropdownBtns = document.querySelectorAll('[data-role="drop-down"]');
const UIdropdowns = document.querySelectorAll('.drop-down');

UIdropdownBtns.forEach(ele => ele.addEventListener('click', UItoggleDropdown));

function UItoggleDropdown() {
    const dropdown = document.querySelector(this.dataset.target);
    UIdropdowns.forEach(ele => {
        if (ele.id === dropdown.id) {
            return;
        }
        ele.classList.remove('drop-down_open');
    })
    dropdown.classList.toggle('drop-down_open');
}