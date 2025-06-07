let d = new Date();
document.getElementById("currentYear").innerHTML = `${d.getFullYear()}`;
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;