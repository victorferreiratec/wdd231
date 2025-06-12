document.addEventListener('DOMContentLoaded', function () {
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || '';
    }
    document.getElementById('outFirstName').textContent = getQueryParam('firstName');
    document.getElementById('outLastName').textContent = getQueryParam('lastName');
    document.getElementById('outEmail').textContent = getQueryParam('email');
    document.getElementById('outMobile').textContent = getQueryParam('mobile');
    document.getElementById('outOrganization').textContent = getQueryParam('organization');
    document.getElementById('outTimestamp').textContent = getQueryParam('timestamp') ? new Date(getQueryParam('timestamp')).toLocaleString() : '';
});