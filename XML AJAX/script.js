// Get text
const getText = document.getElementById("getText");
getText.addEventListener("click", getTextFile);

function getTextFile() {
  // Create XHR Object
  const xml = new XMLHttpRequest();

  // Open → type, url/file, asynk
  xml.open("GET", "./sample.txt", true);
  //  Generate error
  //   xml.open("GET", "./sample2.txt", true);

  console.log("READYSTATE:", xml.readyState); // READYSTATE: 1

  //  Optional - used for loaders
  xml.onprogress = function () {
    console.log("READYSTATE:", xml.readyState); // READYSTATE: 3
  };

  xml.onload = function () {
    console.log("READYSTATE:", xml.readyState); // READYSTATE: 4
    const textContent = document.querySelector(".responseText");
    if (textContent.classList.contains("d-none")) {
      textContent.classList.remove("d-none");
    }
    if (this.status === 200) {
      //   console.log(this.responseText);
      textContent.innerHTML = `<hr class="mb-4">
      <div class="bg-light position-relative p-3"><h2>Simple text</h2><button type="button" id="btn-close" class="btn-close position-absolute top-0 end-0 mt-2 me-2" aria-label="Close"></button>
      <p>${this.responseText}</p></div>`;

      const btnClose = document.getElementById("btn-close");
      btnClose.addEventListener("click", closeBtn);
    } else if (this.status === 404) {
      textContent.innerHTML = `<hr class="mb-4">
      <div class="bg-light position-relative p-3"><h2 class=" text-danger ">File not found!</h2><button type="button" id="btn-close"  class="btn-close position-absolute top-0 end-0 mt-2 me-2" aria-label="Close"></button>
      <p>${this.responseText}</p></div>`;

      const btnClose = document.getElementById("btn-close");
      btnClose.addEventListener("click", closeBtn);
    }

    function closeBtn() {
      document.querySelector(".responseText").classList.add("d-none");
    }
  };

  xml.onerror = function () {
    console.log("Request Error ...");
  };

  // xml.onreadystatechange = function () {   // the same thing as onload
  //     console.log('READYSTATE:', xml.readyState) // READYSTATE:2/n READYSTATE: 3/n READYSTATE: 4
  //     if(this.readyState === 4 && this.status === 200){
  //         // console.log(this.responseText)
  //     }
  // }
  // Sends request
  xml.send();
}
// location.reload();

// readyState Values
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 3: request finished and response is ready

// HTTP Status
// 200: "OK"
// 403: "Forbidden"
// 404: "Not Found"

// Get local JSON file

const getJsonUser = document.getElementById("getJsonUser");
const output = document.createElement("div");
getJsonUser.addEventListener("click", readLocalJson);

function readLocalJson() {
  const xml = new XMLHttpRequest();

  output.setAttribute("class", "bla-bla-bla");
  const container = document.querySelector(".container");
  container.appendChild(output);

  xml.open("GET", "./user.json", true);
  console.log("READYSTATEuser:", xml.readyState); // READYSTATE: 1
  xml.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      // console.log(response); // Object { id: 1, name: "John", email: "john@gmail.com" }

      output.innerHTML = `
              <div class="card mt-4" style="width: 18rem;">
          <h2 class="card-header">
            Read JSON
          </h2>
          <button type="button" id="btn-close-user" class="btn-close position-absolute top-0 end-0 mt-2 me-2" aria-label="Close"></button>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${response.id}</li>
            <li class="list-group-item">NAME: ${response.name}</li>
            <li class="list-group-item">EMAIL: ${response.email}</li>
          </ul>
        </div>
              `;

      const btnClose = document.getElementById("btn-close-user");
      btnClose.addEventListener("click", closeBtn);
    }

    function closeBtn() {
      document.querySelector(".bla-bla-bla").remove();
      // document.querySelector(".bla-bla-bla").classList.add("d-none");
    }
  };

  xml.send();
}
