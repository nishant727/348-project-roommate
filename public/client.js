// client-side js

//ITEM List Form
const usersForm = document.forms[0];
const titleInput = usersForm.elements["title"];
const descInput = usersForm.elements["description"];
const contactInput = usersForm.elements["contact"];
const categoryInput = usersForm.elements["category"];
const category2Input = usersForm.elements["category2"];
const itemList = document.getElementById("item");

//updates the user table on the page
const appendNewTutor = tutor => {
  const newTrTutor = document.createElement("tr");
  const titleTdTutor = document.createElement("td");
  titleTdTutor.innerHTML = tutor.title;
  const descTdTutor = document.createElement("td");
  descTdTutor.innerHTML = tutor.description;
  const categoryTdTutor = document.createElement("td");
  categoryTdTutor.innerHTML = tutor.category;
  const category2TdTutor = document.createElement("td");
  category2TdTutor.innerHTML = tutor.category2;
  const contactTdTutor = document.createElement("td");
  contactTdTutor.innerHTML = tutor.contact;
  const dateTdTutor = document.createElement("td");
  dateTdTutor.innerHTML = tutor.date;
  const idTdTutor = document.createElement("td");
  idTdTutor.innerHTML = tutor.id;

  newTrTutor.appendChild(idTdTutor);
  newTrTutor.appendChild(titleTdTutor);
  newTrTutor.appendChild(descTdTutor);
  newTrTutor.appendChild(categoryTdTutor);
  newTrTutor.appendChild(category2TdTutor);
  newTrTutor.appendChild(contactTdTutor);
  newTrTutor.appendChild(dateTdTutor);

  const tbTutor = document.getElementById("roommate_table");
  tbTutor.appendChild(newTrTutor);
};

//add a new user to the list when submitted
usersForm.onsubmit = event => {
  //stop the form submission from refreshing the page
  event.preventDefault();
  const date = new Date().toLocaleDateString();
  const data = {
    title: titleInput.value,
    description: descInput.value,
    contact: contactInput.value,
    //maybe
    category: categoryInput.value,
    category2: category2Input.value,
    date: date
  };

  fetch("/addRoommate", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });

  fetch("/getRoommates", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        appendNewTutor({
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          category2: row.category2,
          contact: row.contact,
          date: row.datejoined
        });
      });
    });

  //reset form
  titleInput.value = "";
  titleInput.focus();
  descInput.value = "";
  contactInput.value = "";
  categoryInput.value = 0;
  category2Input.value = 0;

};
