const UImodalArea = document.getElementById('js-modal-area');
const UImodals = document.querySelectorAll('.modal');
const UImodalTogglers = document.querySelectorAll('[data-role="modal"]');
const UImodalDialogs = document.querySelectorAll('.modal__dialog');

UImodals.forEach(val => {
    UImakeArea();
    document.getElementById('js-modal-area').appendChild(val);
});

UImodalTogglers.forEach(val => {
    val.addEventListener('click', UItoggleModal);
});

UImodalDialogs.forEach(ele => ele.addEventListener('click', UImodalDialog));

function UItoggleModal() {
    const modal = document.querySelector(this.dataset.target);
    modal.classList.toggle('modal_open');
}

function UImodalDialog(e) {
    e.stopPropagation();
}

function UImakeArea() {
    if (!UImodalArea) {
        const areaDiv = document.createElement('div');
        areaDiv.setAttribute('id', 'js-modal-area');
        areaDiv.style.zIndex = '100';
        areaDiv.style.position = 'relative';
        document.body.appendChild(areaDiv);
    }
}

function UImodalOpen() {
    const openCheck = document.querySelector('[data-role="modal-open"]');
    if (openCheck && openCheck.dataset.errors != '{}') {
        const modal = document.querySelector(openCheck.dataset.target);
        modal.classList.add('modal_open');
    }
}

window.onload = UImodalOpen;