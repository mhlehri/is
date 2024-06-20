// console.log("Hello World");
//? types
type DataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

//? get elements
const container = document.getElementById("container");
const message = document.getElementById("message");

//? create elements
const msg = document.createElement("span");

let data: DataType[];
let skip = 0;
let page = 0;
let isLoading = false;

async function fetchDataAndDisplay() {
  if (isLoading) {
    return;
  }

  isLoading = true;
  msg.innerText = "Loading...";

  message?.appendChild(msg);

  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${skip}&_limit=20`
    );

    const fetchedData = await response.json();

    if (!fetchedData.length) {
      msg.innerText = "No more posts to load.";
      return;
    }

    data = data ? [...data, ...fetchedData] : fetchedData;

    displayPosts(fetchedData);
  } catch (err) {
    msg.innerHTML = `<h1>Something went wrong</h1>
    <button onclick="location.reload()">try again</button>`;
    // console.error(err);
  } finally {
    isLoading = false;
  }
}

function displayPosts(postData: DataType[]) {
  msg.remove();
  for (const post of postData) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h2>${post.title}</h2>
                      <p>${post.body}</p>`;
    container?.appendChild(card);
  }
}

fetchDataAndDisplay();

window.addEventListener("scroll", async () => {
  const closeToBottom =
    window.innerHeight + document.documentElement.scrollTop >=
    document.documentElement.offsetHeight - 20;

  if (data && data.length > skip && closeToBottom && !isLoading) {
    skip += 20;
    await fetchDataAndDisplay();
  }
});
