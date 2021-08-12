const usersData = [
    {
        login: '123',
        password: '123',
        role: 'user',
        info: {
            name: 'Denis',
            lastName: 'Petrov',
        },
    },
    {
        login: 'admin',
        password: 'admin',
        role: 'admin',
        info: {
            name: 'Alexander',
            lastName: 'Filatov',
        },
    },
    {
        login: 'user',
        password: 'user',
        role: 'user',
        info: {
            name: 'Inga',
            lastName: 'Krug',
        },
    },
];

const htmlElements = {};

function getHTMLElement(selector) {
    const htmlElement = document.querySelector(selector);
    return htmlElement;
}

function initHTMLElements() {
    htmlElements.wrapper = getHTMLElement('.body-wrapper');
    htmlElements.loginButton = getHTMLElement('input.login-button');
    htmlElements.userLogin = getHTMLElement('input.enter-username');
    htmlElements.userPassword = getHTMLElement('input.enter-password');
    htmlElements.submitButton = getHTMLElement('input.submit-button');
    htmlElements.accountButton = getHTMLElement('button.account');
    htmlElements.closeButton = getHTMLElement('button.close');
    htmlElements.errorMessage = getHTMLElement('.error');
    htmlElements.validationForm = getHTMLElement('.validation');
    htmlElements.feedbackMenu = getHTMLElement('a.feedback');
}

initHTMLElements();

htmlElements.userLogin.value = localStorage.getItem('userLogin');
htmlElements.userPassword.value = localStorage.getItem('userPassword');

function checkLoadName() {
    if (localStorage.getItem('userName')) {
        htmlElements.accountButton.textContent = `Welcome ${localStorage.getItem('userName')}`;
    }
}

checkLoadName();

function initEvenHandles() {
    htmlElements.accountButton.addEventListener('click', () => {
        htmlElements.validationForm.style.visibility = 'visible';
        htmlElements.validationForm.style.height = '100%';
        htmlElements.wrapper.style.opacity = '0.5';
    });

    htmlElements.closeButton.addEventListener('click', () => {
        htmlElements.validationForm.style.visibility = 'hidden';
        htmlElements.validationForm.style.height = '0';
        htmlElements.wrapper.style.opacity = '1';
        htmlElements.errorMessage.style.visibility = 'hidden';
    });

    htmlElements.submitButton.addEventListener('click', () => {
        const enterLogin = htmlElements.userLogin.value;
        const enterPassword = htmlElements.userPassword.value;
        let loggedUserData;

        usersData.forEach((userData) => {
            if (enterLogin === userData.login
                && enterPassword === userData.password) {
                loggedUserData = userData.info;
                localStorage.setItem('userRole', userData.role);
                localStorage.setItem('userName', userData.info.name);
                localStorage.setItem('userLogin', enterLogin);
                localStorage.setItem('userPassword', enterPassword);
                if (userData.role === 'admin') {
                    htmlElements.feedbackMenu.style.visibility = 'visible';
                } else {
                    htmlElements.feedbackMenu.style.visibility = 'hidden';
                }
            }
        });
        if (loggedUserData) {
            htmlElements.accountButton.textContent = `Welcome ${loggedUserData.name}`;
            htmlElements.validationForm.style.visibility = 'hidden';
            htmlElements.wrapper.style.opacity = '1';
            htmlElements.errorMessage.style.visibility = 'hidden';
        } else {
            htmlElements.errorMessage.style.visibility = 'visible';
        }
    });
}

initEvenHandles();
