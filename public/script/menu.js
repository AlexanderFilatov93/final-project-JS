const pages = ['home', 'themes', 'feedback'];
let pageName = 'home';

if (window.location.hash) {
    pageName = window.location.href.split('#')[1].split('=')[1];
}

const hideContentElements = () => {
    pages.forEach((element) => {
        document.querySelector(`div.${element}`).style.display = 'none';
    });
};

const showContentElements = (className) => {
    hideContentElements();
    document.querySelector(`div.${className}`).style.display = 'block';
};

const changeUrl = (className) => {
    window.location.href = `#page=${className}`;
};

window.addEventListener('DOMContentLoaded', () => {
    window.location.href = '#page=home';
    const role = localStorage.getItem('userRole');
    if (role !== 'admin' && pageName === 'feedback') {
        showContentElements('home');
        changeUrl('home');
    } else if (pageName !== 'home') {
        showContentElements(pageName);
        changeUrl(pageName);
    }
});

const onMenulinkClick = (evt) => {
    evt.preventDefault();
    changeUrl(evt.currentTarget.className);
    showContentElements(evt.currentTarget.className);
};

pages.forEach((element) => {
    document.querySelector(`.${element}`).addEventListener('click', onMenulinkClick);
});
