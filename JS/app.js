const projectsContainer = document.querySelector(".projects-container");
const modalHeader = document.querySelector(".modal-header");
const modalBody = document.querySelector(".modal-body");
const searchbar = document.getElementById('project-search');

// ------------------------------------------
//  FUNCTIONS
// ------------------------------------------

//populates projects container
function showProjects(projects) {
    const projectCards = projects.map(project => `
        <div class="card project-card">
            <div class="card-body">
                <img  src="${project.icon}" alt="play-btn" width="70px">
                <h5 class="card-title">${project.name}</h5>
                <hr class="project-card-divider">
                <p class="card-text">${project.description}</p>
                <button type="button" class="btn card-link" data-toggle="modal" data-target="#projectModal">
                    LEARN MORE
                </button>
            </div>
        </div>
    `).join("");
    projectsContainer.innerHTML = projectCards;
}

showProjects(projects);


function fillModalContent(project) {
    const heading = modalHeader.querySelector("H5");
    const subHeading = modalHeader.querySelector("P");
    const skillsRequired = modalBody.getElementsByTagName("P")[0];
    const grade = modalBody.getElementsByTagName("P")[1];
    const reviewerComment = modalBody.getElementsByTagName("P")[2];
    const liveDemo = document.querySelector("#demo-btn");
    
    console.log(liveDemo);
    heading.textContent = `${project.name}`;
    subHeading.textContent = `${project.description}`;
    skillsRequired.textContent = `${project.skillsRequired}`;
    grade.textContent = `${project.grade}`;
    reviewerComment.textContent = `${project.reviewersComment}`;
    liveDemo.setAttribute('href', `${project.demoLink}`)
}

// ------------------------------------------
//  EVENT LISTENERS 
// ------------------------------------------

projectsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        const projectBtn = e.target;
        const projectName = projectBtn.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        console.log(projectName);

        const projectInfo = projects.filter(function(project) {
            return project.name == projectName;
        });

        fillModalContent(projectInfo[0])
    } 
});

searchbar.addEventListener('keyup', () => {
    let search = searchbar.value.toLowerCase();
    let results = projects.filter(project => project.name.toLowerCase().startsWith(search))
    showProjects(results);
})
