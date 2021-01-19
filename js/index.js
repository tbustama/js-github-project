document.addEventListener("DOMContentLoaded", () => {
  addSubmit();
});

function addSubmit() {
  const nameForm = document.getElementById("github-form");
  nameForm.addEventListener("submit", getUsers);
}

function getUsers(event) {
  event.preventDefault();
  fetch(`https://api.github.com/search/users?q=${event.target.search.value}`)
    .then((resp) => resp.json())
    .then((object) => displayUsers(object.items));
}

function displayUsers(userData) {
  for (user of userData) {
    const userContainer = document.getElementById("user-list");
    const userDiv = document.createElement("div");
    const userName = document.createElement("h4");
    userName.innerText = `Username: ${user.login}`;
    userName.addEventListener("click", getRepos);
    userName.id = user.login;
    const userLink = document.createElement("a");
    userLink.href = user.html_url;
    userLink.innerText = "Link to User's Page";
    userDiv.appendChild(userName);
    userDiv.appendChild(userLink);
    userContainer.appendChild(userDiv);
  }
}

function getRepos(event) {
  fetch(`https://api.github.com/users/${event.target.id}/repos`)
    .then((resp) => resp.json())
    .then((object) => displayRepos(object));
}

function displayRepos(repos) {
  for (repo of repos) {
    const repoContainer = document.getElementById("repos-list");
    const repoDiv = document.createElement("div");
    repoDiv.id = repo.full_name;
    const repoName = document.createElement("h4");
    repoName.innerText = repo.name;
    const repoLink = document.createElement("a");
    repoLink.href = repo.html_url;
    repoLink.innerText = "Link to Repo";
    repoDiv.appendChild(repoName);
    repoDiv.appendChild(repoLink);
    repoContainer.appendChild(repoDiv);
  }
}
