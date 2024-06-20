"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//? get elements
const container = document.getElementById("container");
const message = document.getElementById("message");
//? create elements
const msg = document.createElement("span");
let data;
let skip = 0;
let page = 0;
let isLoading = false;
function fetchDataAndDisplay() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isLoading) {
            return;
        }
        isLoading = true;
        msg.innerText = "Loading...";
        message === null || message === void 0 ? void 0 : message.appendChild(msg);
        try {
            let response = yield fetch(`https://jsonplaceholder.typicode.com/posts?_start=${skip}&_limit=20`);
            const fetchedData = yield response.json();
            if (!fetchedData.length) {
                msg.innerText = "No more posts to load.";
                return;
            }
            data = data ? [...data, ...fetchedData] : fetchedData;
            displayPosts(fetchedData);
        }
        catch (err) {
            msg.innerHTML = `<h1>Something went wrong</h1>
    <button onclick="location.reload()">try again</button>`;
            // console.error(err);
        }
        finally {
            isLoading = false;
        }
    });
}
function displayPosts(postData) {
    msg.remove();
    for (const post of postData) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h2>${post.title}</h2>
                      <p>${post.body}</p>`;
        container === null || container === void 0 ? void 0 : container.appendChild(card);
    }
}
fetchDataAndDisplay();
window.addEventListener("scroll", () => __awaiter(void 0, void 0, void 0, function* () {
    const closeToBottom = window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 20;
    if (data && data.length > skip && closeToBottom && !isLoading) {
        skip += 20;
        yield fetchDataAndDisplay();
    }
}));
