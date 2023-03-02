const emailLink = document.querySelector('.email-address');
const copyButton = document.querySelector('.copy-button');

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(emailLink.textContent);
});