text = document.getElementById("text");
button = document.getElementById("button");

button.onclick = () => {
        content1 = "Hit you";
        content2 = "Quit you";
        if (text.getHTML() === content1) text.innerHTML = content2;
        else text.innerHTML = content1;
}

async function registerServiceWorker() {
        try {
                registration = await navigator.serviceWorker
                        .register("./sw.js", {
                        scope: "./"
                });
                console.log(registration);
                
                if (registration.installing) {
                        console.log("Service worker installing");
                }
                else if (registration.waiting) {
                        console.log("Service worker waiting");
                }
                else if (registration.active) {
                        console.log("Service worker active");
                }
        } catch (error) {
                console.error(`Registration failed with ${error}`);
        }
}

registerServiceWorker();

