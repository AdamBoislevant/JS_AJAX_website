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

document.addEventListener("DOMContentLoaded", function () {
  fetch("projects.json")
    .then((res) => res.json())
    .then((data) => {
      const projects = data.map(
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
      //   Navigation bar is present on this page
      displayNavbar(projects);
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
});

// Generates navigation bar with the existing projects
function displayNavbar(projects) {
  const navbarContainer = document.getElementById("navbar");
  projects.forEach((project) => {
    const projectTitle = document.createElement("a");
    projectTitle.href = project.URL;
    projectTitle.textContent = project.title;

    navbarContainer.appendChild(projectTitle);
  });
}

//generates the preview elements with the informations sent in the form
function previewChanges() {
  document.getElementById("preview-company-name").textContent =
    "Company: " + document.getElementById("company-name").value;
  document.getElementById("preview-company-pic").src =
    document.getElementById("company-pic").value;
  document.getElementById("preview-keywords").textContent =
    "Keywords: " + document.getElementById("keywords").value;
  document.getElementById("preview-summary").textContent =
    document.getElementById("summary").value;
  document.getElementById("preview-description").textContent =
    document.getElementById("description").value;
  document.getElementById("preview-description-pic").src =
    document.getElementById("description-pic").value;
}
