// Project class used to get the informations from the JSON
class Project {
  constructor(
    URL,
    title,
    keywords,
    companyName,
    companyPic,
    summary,
    description,
    descriptionPic,
    presentationPic
  ) {
    this.URL = URL;
    this.title = title;
    this.keywords = keywords;
    this.companyName = companyName;
    this.companyPic = companyPic;
    this.summary = summary;
    this.description = description;
    this.descriptionPic = descriptionPic;
    this.presentationPic = presentationPic;
  }
}

// Executed function on load of a web page
document.addEventListener("DOMContentLoaded", function () {
  fetch("projects.json") // get informations from the JSON
    .then((res) => res.json())
    .then((data) => {
      const projects = data.map(
        // Create a new Project
        (proj) =>
          new Project(
            proj.URL,
            proj.title,
            proj.keywords,
            proj.companyName,
            proj.companyPic,
            proj.summary,
            proj.description,
            proj.descriptionPic,
            proj.presentationPic
          )
      );
      // Navigation bar is present on all pages so this function is called everytime
      displayNavbar(projects);

      // if the loaded page is the project page
      if (window.location.pathname.includes("project.html")) {
        displayProjectDetails(projects); //display the project details
      } else {
        displayProjects(projects); // Display the different projects on the main page
      }
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
});

function displayNavbar(projects) {
  const navbarContainer = document.getElementById("navbar");
  projects.forEach((project) => {
    //create a link element for each project containing the title and linked to the corresponding project's URL
    const projectTitle = document.createElement("a");
    projectTitle.href = project.URL;
    projectTitle.textContent = project.title;

    navbarContainer.appendChild(projectTitle); // Add every link to the navigation bar
  });
}

function displayProjects(projects) {
  const projectListContainer = document.getElementById("project-list");
  projects.forEach((project) => {
    //create a link element for each project linked to the corresponding project's URL
    const projectItem = document.createElement("div");
    projectItem.className = "image";

    const projectTitle = document.createElement("div");
    projectTitle.className = "centered";
    projectTitle.textContent = project.title;

    const projectLink = document.createElement("a");
    projectLink.href = project.URL;

    const projectImg = document.createElement("img");
    projectImg.src = project.presentationPic;
    projectImg.alt = project.title;
    projectImg.className = "project";

    // Append all elements to the projectItem element used for the CSS
    projectLink.appendChild(projectImg);
    projectItem.appendChild(projectTitle);
    projectItem.appendChild(projectLink);
    // Append the projectItem to the project list
    projectListContainer.append(projectItem);
  });
}

function displayProjectDetails(projects) {
  // On load get the title in the URL in order to load the correct project
  const params = new URLSearchParams(window.location.search);
  const projectTitle = params.get("title");

  const project = projects.find((proj) => proj.title === projectTitle);

  if (project) {
    // Create elements containing all informations about the project
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("company-name").textContent =
      "Company: " + project.companyName;
    document.getElementById("keywords").textContent =
      "Keywords: " + project.keywords;
    document.getElementById("company-pic").src = project.companyPic;
    document.getElementById("project-summary").textContent = project.summary;
    document.getElementById("project-description").innerHTML =
      project.description;
    document.getElementById("description-pic").src = project.descriptionPic;
    document.getElementById("description-pic").alt = project.title;
  } else {
    console.error("Project not found");
  }
}
