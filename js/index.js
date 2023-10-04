document.addEventListener("DOMContentLoaded", function () {
  submitForm();

  function submitForm() {
    const githubForm = document.getElementById("github-form");
    const search = document.getElementById("search");

    githubForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValue = search.value;

      fetch(`https://api.github.com/search/users?q=${inputValue}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          displayInformation(data);
        })
        .catch((error) => console.log(error.message));
    });
  }

  function displayInformation(data) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";

    if (data && data.items) {
      data.items.forEach((item) => {
        const listItems = document.createElement("li");
        listItems.innerHTML = `
            <div>
            <img src="${item.avatar_url}" style="height: 200px; width: 200px; border-radius: 10px"/>
                <div>
                <a href="${item.html_url}">Link to profile</a>
                </div>
            </div>
            `;
        userList.appendChild(listItems);

        listItems.addEventListener("click", function (e) {
          fetch(`https://api.github.com/users/${item.login}/repos`, {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              reposInfo(data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      });
    }
  }
});
