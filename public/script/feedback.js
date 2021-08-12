const htmlElements = {};
let feedbacks = JSON.parse(localStorage.getItem('feedbacks'));

function getHTMLElement(selector) {
    const htmlElement = document.querySelector(selector);
    return htmlElement;
}

function initHTMLElements() {
    htmlElements.feedbackMenu = getHTMLElement('a.feedback');
    htmlElements.feedbackFirstName = getHTMLElement('input.feedback-first-name');
    htmlElements.feedbackLastName = getHTMLElement('input.feedback-last-name');
    htmlElements.feedbackMail = getHTMLElement('input.feedback-mail');
    htmlElements.feedbackMessage = getHTMLElement('textarea.feedback-message');
    htmlElements.feedbackSendButton = getHTMLElement('button.send-button');
    htmlElements.feedbackError = getHTMLElement('p.feedback-error');
    htmlElements.firstNameError = getHTMLElement('p.error-first-name');
    htmlElements.lastNameError = getHTMLElement('p.error-last-name');
    htmlElements.emailError = getHTMLElement('p.error-mail');
    htmlElements.messageError = getHTMLElement('p.error-message');
    htmlElements.feedbackThanks = getHTMLElement('div.feedback-thanks');
    htmlElements.okButton = getHTMLElement('button.ok-button');
}

initHTMLElements();

function checkRole() {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
        htmlElements.feedbackMenu.style.visibility = 'hidden';
    }
}

checkRole();

const addFeedbackBlockOnPage = function(el) {
    if (!document.querySelector('.mainfeedbackBlock')) {
        const mainBlockCreated = document.createElement('div');
        mainBlockCreated.classList.add('mainfeedbackBlock');
        document.querySelector('main > .feedback').appendChild(mainBlockCreated);
    }

    const blockCreated = document.createElement('div');
    blockCreated.classList.add('feedbackBlock');

    const fullNameCreated = document.createElement('div');
    fullNameCreated.textContent = `${el.firstName} ${el.lastName}`;
    fullNameCreated.classList.add('fullName');

    const emailCreated = document.createElement('div');
    emailCreated.textContent = el.email;
    emailCreated.classList.add('email');

    const messageCreated = document.createElement('div');
    messageCreated.textContent = el.message;
    messageCreated.classList.add('message');

    blockCreated.appendChild(fullNameCreated);
    blockCreated.appendChild(emailCreated);
    blockCreated.appendChild(messageCreated);

    document.querySelector('.mainfeedbackBlock').appendChild(blockCreated);
};

function initEvenHandles() {
    document.addEventListener('DOMContentLoaded', () => {
        if (feedbacks) {
            feedbacks.map(addFeedbackBlockOnPage);
        }
    });

    htmlElements.feedbackSendButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        const firstName = htmlElements.feedbackFirstName.value;
        const lastName = htmlElements.feedbackLastName.value;
        const mail = htmlElements.feedbackMail.value;
        const message = htmlElements.feedbackMessage.value;

        const addFeedbackToLocalStorage = () => {
            if (feedbacks == null) {
                feedbacks = [];
            }
            const feedback = {
                firstName: `${firstName}`,
                lastName: `${lastName}`,
                email: `${mail}`,
                message: `${message}`,
            };
            feedbacks.push(feedback);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        };

        if (firstName === '') {
            htmlElements.firstNameError.style.visibility = 'visible';
            htmlElements.feedbackFirstName.addEventListener('keydown', () => {
                htmlElements.firstNameError.style.visibility = 'hidden';
            });
        }
        if (lastName === '') {
            htmlElements.lastNameError.style.visibility = 'visible';
            htmlElements.feedbackLastName.addEventListener('keydown', () => {
                htmlElements.lastNameError.style.visibility = 'hidden';
            });
        }
        if (mail === '') {
            htmlElements.emailError.style.visibility = 'visible';
            htmlElements.feedbackMail.addEventListener('keydown', () => {
                htmlElements.emailError.style.visibility = 'hidden';
            });
        }
        if (message === '') {
            htmlElements.messageError.style.visibility = 'visible';
            htmlElements.feedbackMessage.addEventListener('keydown', () => {
                htmlElements.messageError.style.visibility = 'hidden';
            });
        }
        if (firstName && lastName && mail && message !== '') {
            htmlElements.feedbackThanks.style.visibility = 'visible';
            htmlElements.feedbackThanks.addEventListener('click', (event) => {
                if (event.target.className === 'ok-button') {
                    htmlElements.feedbackThanks.style.visibility = 'hidden';
                }
            });
            addFeedbackToLocalStorage();
            addFeedbackBlockOnPage(feedbacks[feedbacks.length - 1]);
        }
    });
}

initEvenHandles();
