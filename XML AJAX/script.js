// Get text
const getText = document.getElementById("getText");
getText.addEventListener("click", getTextFile);

function getTextFile() {
  // Create XHR Object
  const xml = new XMLHttpRequest();

  // Open → type, url/file, asynk
  xml.open("GET", "./sample.txt", true);

  console.log("READYSTATE:", xml.readyState); // READYSTATE: 1

  //  Optional - used for loaders
  xml.onprogress = function () {
    console.log("READYSTATE:", xml.readyState); // READYSTATE: 3
  };

  xml.onload = function () {
    console.log("READYSTATE:", xml.readyState); // READYSTATE: 4
    if (this.status === 200) {
      //   console.log(this.responseText);
      const textContent = document.querySelector(".responseText");
      if (textContent.classList.contains("d-none")) {
        textContent.classList.remove("d-none");
      }
      textContent.innerHTML = `<hr class="mb-4">
      <div class="bg-light position-relative"><h2>Simple text</h2><button type="button" id="btn-close" style="cursor: pointer;" class="btn-close position-absolute top-0 end-0 mt-2 me-2" aria-label="Close"></button>
      <p>${this.responseText}</p></div>`;

      const btnClose = document.getElementById("btn-close");
      btnClose.addEventListener("click", closeBtn);
    } else if (this.status === 404) {
      const output = document.createElement("div");
      const body = document.body;
      body.appendChild(output);
      output.innerText = "File not found";
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
