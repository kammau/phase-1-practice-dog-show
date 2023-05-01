document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

const tableBody = document.getElementById("table-body");
const dogForm = document.getElementById("dog-form");

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
    .then((res) => res.json())
    .then((dogData) => renderDogs(dogData))
}

function renderDogs(dogData) {
    dogData.forEach(dog => {
        //Row:
        const dogsRow = document.createElement("tr");
        dogsRow.setAttribute("id", `${dog.id}`);
        tableBody.appendChild(dogsRow);
        //Name:
        const dogName = document.createElement("td");
        dogName.textContent = `${dog.name}`;
        dogsRow.appendChild(dogName);
        //Breed:
        const dogBreed = document.createElement("td");
        dogBreed.textContent = `${dog.breed}`;
        dogsRow.appendChild(dogBreed);
        //Sex:
        const dogSex = document.createElement("td");
        dogSex.textContent = `${dog.sex}`;
        dogsRow.appendChild(dogSex);
        //EditBtn:
        const editBtnContainer = document.createElement("td");
        editBtnContainer.setAttribute("id", "editDogContainer");
        dogsRow.appendChild(editBtnContainer);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtnContainer.appendChild(editBtn);
        editBtn.addEventListener("click", () => editDog(dog))
    });
}

function editDog(dogInfo) {
    const inputs = document.querySelectorAll("input");
    //Name:
    const nameInput = inputs[0];
    nameInput.value = `${dogInfo.name}`;
    //Breed:
    const breedInput = inputs[1];
    breedInput.value = `${dogInfo.breed}`;
    //Sex:
    const sexInput = inputs[2];
    sexInput.value = `${dogInfo.sex}`;
    //Edit Dog:
    const submitBtn = inputs[3];
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/dogs/${dogInfo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                breed: breedInput.value,
                sex: sexInput.value
            })
        })
        .then((res) => res.json())
        .then(() => {
            const dogsData = document.getElementById(`${dogInfo.id}`)
            dogsData.innerHTML = `
            <td>${nameInput.value}</td>
            <td>${breedInput.value}</td>
            <td>${sexInput.value}</td
            <td id="editDogContainer"><button>Edit</button></td>
            `
        })
    })
}