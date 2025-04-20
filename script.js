alert("maybe some link not work now , Because now some link is inactive for personal res");
const nav_page = document.querySelector(".nav-page");
    const nav_btn = document.querySelector("#nav-btn")
    nav_btn.addEventListener("click", () => {
      if (nav_btn.classList.contains("nav-btn-active")) {
        nav_btn.classList.remove("nav-btn-active");
        nav_page.style.width = "0%";
        document.body.classList.remove("no-scroll");
      } else {
        nav_btn.classList.add("nav-btn-active");
        document.body.classList.add("no-scroll");
        nav_page.style.width = "100%";
      }
    });
    Array.from(nav_page.getElementsByTagName("a")).forEach(e => {
      e.addEventListener("click", () => {
        nav_page.style.width = "0%";
        document.body.classList.remove("no-scroll");
        nav_btn.classList.remove("nav-btn-active");
      });
    });

    document.getElementById("form").addEventListener("submit", function (e) {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const btnImg = document.querySelector(".contact-form button img");


      btnImg.src = "./IMAGE/loading.png";
      btnImg.classList.add("rot");

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      // console.log(formData);
      fetch("https://script.google.com/macros/s/AKfycbyX3-EZrYxdnHyHKiYdN98n1PgDYWT-9JM-59QJBGqPudJX6Hdd6-RFOb1tDrNWAv4b4Q/exec", { // 4. Send the data to Google Apps Script
        method: "POST", // Send the data via POST method
        body: formData // Send the form data in the body
      })
        .then(response => response.text()) // 5. Handle the response
        .then(result => {
          document.getElementById("status").textContent = result; // 6. Show success message
          form.reset(); // 7. Clear the form after submission
          btnImg.classList.remove("rot");
          btnImg.src = "./IMAGE/arrow.png";
        })
        .catch(error => {
          console.error("Error!", error.message); // 8. Log any errors
          document.getElementById("status").textContent = "Failed to send message."; // 9. Show error message
        });
    });
