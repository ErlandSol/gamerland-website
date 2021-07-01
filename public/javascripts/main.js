const minWidthToTriggerMobile = 600;

function showContent() {
    //Get the screen height
    var h = document.documentElement.clientHeight;
    window.scrollTo({top: h, behavior: 'smooth'});
}

function toggleHeader() {
    var header = document.getElementById("header").querySelector(".right").getElementsByClassName("header-button");
    var top = document.getElementById("header");

    if(top.display == undefined) {
        top.display = false;
    }
    console.log(top.display);

    if(!top.display) {
        var x;
        for(x of header) {
            x.style.display = "none";
        }
        top.display = true;
    } else {
        var x;
        for(x of header) {
            x.style.display = "inline-block";
        }
        top.display = false;
    }
}

async function showLoginModal(element) {
    await sleep(10);
    var showConditions = {showMobile: false}
    
    //Get website size
    var width = document.documentElement.clientWidth || window.innerWidth;
    var height = document.documentElement.clientHeight || window.innerHeight;
    
    if(width < minWidthToTriggerMobile) {
        //Show mobile view instead
        showConditions.showMobile = true;
    } else {
        showConditions.showMobile = false;
    }

    var removeModal = function(event) {
        var modal = event.target;
        toggleHeader();
        modal.parentNode.removeChild(modal);

        //Hide the menu
        var menu = document.getElementsByClassName("login-box")[0] || document.getElementsByClassName("register-box")[0];
        if(menu) {
            menu.style.display = "none";
            menu.show = false;
        }
    }

    if(showConditions.showMobile) {
        toggleHeader();
        var modal = element.parentNode.querySelector(".login-box");
        modal.classList.add("mobile");

        var shade = document.createElement("div");
        shade.className = "fullpage-modal-shade";
        document.body.appendChild(shade);
        shade.addEventListener("click", removeModal);

    } else {
        var modal = element.parentNode.querySelector(".login-box");
        modal.classList.remove("mobile");
    }


    var modal = element.parentNode.querySelector(".login-box");
    if(modal.show == undefined) {
        modal.show = true;
        modal.style.display = "";
        return;
    }

    if(modal.show) {
        modal.style.display = "none";
        modal.show = false;
    } else {
        modal.style.display = "";
        modal.show = true;
    
    }
}

async function showRegisterModal(element) {
    await sleep(10);
    var showConditions = {showMobile: false}
    
    //Get website size
    var width = document.documentElement.clientWidth || window.innerWidth;
    var height = document.documentElement.clientHeight || window.innerHeight;

    if(width < minWidthToTriggerMobile) {
        //Show mobile view instead
        showConditions.showMobile = true;
    } else {
        showConditions.showMobile = false;
    }

    var removeModal = function(event) {
        var modal = event.target;
        toggleHeader();
        modal.parentNode.removeChild(modal);

        //Hide the menu
    var menu = document.getElementsByClassName("login-box")[0] || document.getElementsByClassName("register-box")[0];
        if(menu) {
            menu.style.display = "none";
            menu.show = false;
        }
    }

    if(showConditions.showMobile) {
        toggleHeader();
        var modal = element.parentNode.querySelector(".register-box");
        modal.classList.add("mobile");
        
        var shade = document.createElement("div");
        shade.className = "fullpage-modal-shade";
        document.body.appendChild(shade);
        shade.addEventListener("click", removeModal);

    } else {
        var modal = element.parentNode.querySelector(".register-box");
        modal.classList.remove("mobile");
    }


    var modal = element.parentNode.querySelector(".register-box");
    if(modal.show == undefined) {
        modal.show = true;
        modal.style.display = "block";
        return;
    }

    if(modal.show) {
        modal.style.display = "none";
        modal.show = false;
    } else {
        modal.style.display = "block";
        modal.show = true;
    
    }
}

function sleep(interval) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },interval)
    })
}





window.onload = function() {
    const FDButts = new FDButtons();
    //Get all input elements and enable them
    var inputs = document.getElementsByClassName("fd-text-input");
    var x;

    for(x of inputs) {
        FDButts.activateInput(x);
    }

    enableClickListener();


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/mc/server/status");
    xhr.send();

    xhr.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            updateServerStatus(res);



        } else if(this.status != 200 && this.readyState == 4) {
            console.log(this.responseText);
        }
    }
}


var hideArray = [".login-box:not(.mobile)", ".register-box"];
function enableClickListener() {
    document.addEventListener("click", function(e) {
        var target = e.target;

        
        //Hide the elements to hide
        var x;
        for(x of hideArray) {
            var el = document.querySelector(x);
            if(el instanceof HTMLElement) {   
                if(!el.contains(target)) {
                    el.style.display = "none";
                    el.show = false;
                }
            }

        }
    })
}


function signInClient(e) {
    e.preventDefault();
}

function registerUser(e) {
    e.preventDefault();
}


function updateServerStatus(data) {
    return;
    console.log(data)
    var online = data.onlinePlayers;
    var host = data.host;
    if(host) {
        var el = document.getElementsByClassName("server-online")[0];
        el.innerHTML = "Serveren er på";
    } else {
        var el = document.getElementsByClassName("server-online")[0];
        el.innerHTML = "Serveren er av";
    }

    if(online == null) {
        var el = document.getElementsByClassName("players-online")[0];
        el.innerHTML = "Kunne ikke laste inn"
    } else {
        
        var el = document.getElementsByClassName("players-online")[0];
        var player = "Spiller";
        if(online > 1 || online == 0) {
            player = "Spillere";
        } 
        el.innerHTML = online + " " + player + " online";
    }
}

function closeRegisterBox(el) {
    var sB = el.closest(".register-box");
    sB.style.display = "none";
    sB.show = false;
}