import { registerServiceWorker } from "./service-worker.js"

class Bookmark {
        url;
        name;

        constructor(url, name) {
                this.url = url;
                this.name = name;
        }
}

function init() {
        let newEntryDialog; 
        let newEntryButton;
        let discardButton;
        let saveButton;
        let nameInput;
        let urlInput;

        itemGetAll();
        newEntryDialog = globalThis.document.querySelector(".new-entry-dialog");
        newEntryButton = globalThis.document.querySelector(".toolbar button");
        discardButton = globalThis.document.querySelector(".discard-entry");
        saveButton = globalThis.document.querySelector(".save-entry");
        nameInput = globalThis.document.querySelector(".name-input");
        urlInput = globalThis.document.querySelector(".url-input");
        nameInput.value = urlInput.value = "";

        newEntryButton.addEventListener("click", function () {
                newEntryDialog.show();
        });
        discardButton.addEventListener("click", function () {
                newEntryDialog.close();
                nameInput.value = urlInput.value = "";
        });
        saveButton.addEventListener("click", function () {
                let bookmark;

                if (nameInput.value === "" || urlInput.value === "") {
                        globalThis.alert("The URL and name cannot be blank");
                        return; 
                }
                bookmark = new Bookmark(urlInput.value, nameInput.value);
                itemAdd(bookmark);
                newEntryDialog.close();
                nameInput.value = urlInput.value = "";
        });
}

function itemAdd(item) {
        let dbRequest, objectStore, transaction;

        dbRequest = globalThis.indexedDB.open("user");
        dbRequest.addEventListener("success", function (event) {
                objectStore = event.target.result.transaction(["bookmarks"], 
                        "readwrite").objectStore("bookmarks");
                transaction = objectStore.add(item);
                transaction.addEventListener("success", function (event) {
                        itemGetAll();
                });
        });
}
function itemModify(item) { }
function itemRemove(item) { }
function itemGetAll() {
        let dbRequest, objectStore, transaction;
        let itemBox;

        dbRequest = globalThis.indexedDB.open("user");
        dbRequest.addEventListener("upgradeneeded", function (event) {
                let database, objectStore;

                database = event.target.result;
                objectStore = database.createObjectStore("bookmarks", {
                        autoIncrement: true
                });
        });
        dbRequest.addEventListener("success", function (event) {
                objectStore = event.target.result.transaction(["bookmarks"])
                        .objectStore("bookmarks");
                transaction = objectStore.getAll();
                transaction.addEventListener("success", function (event) {
                        displayItems(event.target.result);
                });
        });
}

function displayItems(items) {
        let itemBox, itemListBox;

        itemListBox = globalThis.document.querySelector(".item-list"); 
        itemBox = globalThis.document.querySelector(".item").content;        
        itemListBox.replaceChildren();

        for (let item of items) {
                let newItemBox;

                newItemBox = itemBox.cloneNode(1);
                newItemBox.querySelector(".item-url").href = item.url;
                newItemBox.querySelector(".item-name").innerText = item.name;
                itemListBox.append(newItemBox);
        }
}

//registerServiceWorker();
init();
