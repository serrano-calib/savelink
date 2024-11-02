export async function registerServiceWorker() {
        let registration;
        try {
                registration = await globalThis.navigator.serviceWorker
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

