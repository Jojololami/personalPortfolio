var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
var menuIcon = document.getElementById("menu-icon");
var closeIcon = document.getElementById("close-icon");

function openmenu() {
   sidemenu.style.right = "0";
  menuIcon.style.display = "none";       // hide hamburger icon
  closeIcon.style.display = "block";     // show close icon
}
function closemenu() {
    sidemenu.style.right = "-200px";
  menuIcon.style.display = "block";      // show hamburger icon
  closeIcon.style.display = "none";      // hide close icon
}

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyOugxYnFAghg2bvJJqsRV2h3i0YGOAtnD2xcKemfQtuc8S9Rqd51UcJJf_Q2tABIk2/exec'
  const form = document.forms['submit-to-google-sheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {msg.innerHTML = "Message sent successfully!"
        setTimeout (function() {
            msg.innerHTML = ""
        }, 1000)
        form.reset()

      })
      .catch(error => console.error('Error!', error.message))
  })
