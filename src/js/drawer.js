const UIdrawers = document.querySelectorAll('.drawer');
const UIdrawerDialogs = document.querySelectorAll('.drawer__dialog');
const UIdrawerTogglers = document.querySelectorAll('[data-role="drawer"]');

UIdrawerTogglers.forEach(ele => ele.addEventListener('click', UItoggleDrawer));
UIdrawers.forEach(ele => ele.addEventListener('click', UItoggleDrawer));
UIdrawerDialogs.forEach(ele => ele.addEventListener('click', (e) => { e.stopPropagation() }))

function UItoggleDrawer() {
    UIdrawers.forEach(ele => ele.classList.toggle('drawer_show'));
    UIdrawerTogglers.forEach(ele => ele.classList.toggle('toggler_show'));
}