import Domov from "./views/Domov.js";
import Clickjacking from "./views/Clickjacking.js";
import XSS from "./views/XSS.js";
import CSRF from "./views/CSRF.js";

// Initial information about user is stored to local storage
localStorage.setItem("name", "User");
localStorage.setItem("password", "password");
localStorage.setItem("logged", "out");

// navigateTo handles history of routes
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

// router handles routing in application
const router = async () => {

    const routes = [
        { path: "/", view: Domov},
        { path: "/clickjacking", view: Clickjacking},
        { path: "/xss", view: XSS},
        { path: "/csrf", view: CSRF}
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    const match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.drawHtml();


    // -------------------- Accordion handling -------------------------
    const accordion = document.getElementsByClassName("accordion");
            
    for (var i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    // --------------------- XSS attack --------------------------------
    const userMessageForm = document.querySelector('#XSS_form');    
    
    function submitForm(event) {
        event.preventDefault();

        const formName = event.target.querySelector('#form_name');
        const formImage = event.target.querySelector('#form_image');
        const name = formName.value;
        const image = formImage.value;
    
        const message = `
            <div class="message-image">
                <img src="${image}" alt="${name}" width="100px">
            </div>
            <p><b>${name}</b></p>
        `;
    
        // Defence against XSS attack
        /*if (image.indexOf("onerror") === -1) {
            document.querySelector('#form_output').innerHTML = message;
        }*/

        document.querySelector('#form_output').innerHTML = message;  
    }

    if (userMessageForm) {
        userMessageForm.addEventListener('submit', submitForm);
    }
    
};

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[spa]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
})