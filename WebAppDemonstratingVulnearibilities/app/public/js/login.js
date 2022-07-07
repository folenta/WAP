var url = window.location.href;

var newAction = url.split("html")[1];

const afterLogin = `
    <div class="loggedAs">
        Ste prihlaseny ako <b>${localStorage.getItem("name")}</b>
        <form action="/login.html">
            <div class="submitButton">    
                <input type="submit" value="Odhlásiť sa"/>
            </div>
        </form>
    </div>
    <div class="changePassword">   
        <h3>Zmena hesla</h3> 
        <form id="change_password_form">
            <div class="form-control">
                <label for="newPassword">Nové heslo</label>
                <input type="text" class="newPassword" id="newPassword" name="newPassword" />
            </div>
            <div class="submitButton">
                <input type="submit" value="Uložiť"/>
            </div>
        </form>
    </div>
    <br><br><hr>
    <div>
        <p>Získajte skvelé odmeny, stačí kliknúť na tento <b><a href="http://www.stud.fit.vutbr.cz/~xfolen00/WAP/evilPage2.html">odkaz</a></b>.</p>
    </div>
    `;

const wrongPassword = `<p class="wrong">Nesprávne meno alebo heslo</p>`

if (newAction !== '') {
    var actionType = newAction.split('=')[0].substring(1);
    if (actionType === "name") {
        const userName = newAction.split("name=")[1].split("&")[0];
        const password = newAction.split("&")[1].split("=")[1];

        if (userName === localStorage.getItem("name") && password === localStorage.getItem("password")) {
            document.getElementById("CSRF_form").style.display = "none";
            document.querySelector("#login_form").innerHTML = afterLogin;
            localStorage.setItem("logged", "in");
        }

        else{
            document.querySelector("#login_form").innerHTML = wrongPassword;
        }
    }

    else if (actionType === "newPassword" && localStorage.getItem("logged") === "in") {
        const newPassword = newAction.split("=")[1];
        localStorage.setItem("password", newPassword);
        document.getElementById("CSRF_form").style.display = "none";
        document.querySelector("#login_form").innerHTML = afterLogin;
    }

    else {
        localStorage.setItem("logged", "out");
    }
}


else {
    if (localStorage.getItem("logged") === "in") {
        document.getElementById("CSRF_form").style.display = "none";
        document.querySelector("#login_form").innerHTML = afterLogin;
    }
}
