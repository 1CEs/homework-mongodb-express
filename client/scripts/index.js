let users;

const delay = async (ms) => {
    return new Promise((resolve, reject) => {
        setInterval(() => resolve(), ms)
    })
}

const checkEmpty = (users) => {
  const tableFooter = document.getElementById('table-footer');
  if (Array.isArray(users) && users.length > 0) {
    tableFooter.style.display = 'none';
  } else {
    tableFooter.style.display = '';
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  users = await userController.getUsers();
  await onStatusChangeHandler('Load successfully')
  loadTable(users.data);
  checkEmpty(users.data)
  onCreateHandler();
  onSearchHandler();
});

const onSearchHandler = () => {
  const searchInput = document.getElementById('search')
  searchInput.oninput = async (e) => {
    users = await userController.getUsers(e.target.value);
    await onStatusChangeHandler('Load successfully')
    clearTableBody();
    loadTable(users.data);
    checkEmpty(users.data)
  }
}

const onStatusChangeHandler = async (message) => {
    const status = document.getElementById('status')
    const msgEl = document.createElement('span')

    status.innerHTML = ''

    msgEl.classList.add('svg-spinners--pulse-2')

    status.appendChild(msgEl)

    await delay(1500)

    status.innerHTML = message
}

const onCreateHandler = async () => {
  const submitButton = document.getElementById("form-submit");
  const formName = document.getElementById("form-name");
  const formBirth = document.getElementById("form-birth");

  submitButton.addEventListener("click", async () => {
    const name = formName.value;
    const birth = formBirth.value;
    console.log(name, birth);
    const payload = {
      name,
      birth,
    };
    const data = await userController.addUser(payload);
    users = await userController.getUsers();
    await onStatusChangeHandler(data.info.message)
    clearTableBody();
    loadTable(users.data);
    checkEmpty(users.data)
  });
};

const onDeleteHandler = async (id) => {
  const data = await userController.deleteUser(id);
  users = await userController.getUsers();
  await onStatusChangeHandler(data.info.message)
  clearTableBody();
  loadTable(users.data);
  checkEmpty(users.data)
};

const onUpdateHandler = (idx, id) => {
  console.log(id);
  const nameInput = document.createElement("input");
  const birthInput = document.createElement("input");
  const submitButton = document.createElement("button");

  nameInput.id = `update-name-${idx}`;
  nameInput.name = "name";
  nameInput.type = "text";
  nameInput.required = true;

  birthInput.id = `update-birth-${idx}`;
  birthInput.name = "birth";
  birthInput.type = "date";

  submitButton.innerText = "Update";

  submitButton.classList.add("update-button");
  nameInput.classList.add("update-input");

  const row = document.getElementById(`row-${idx}`);
  const children = row.children;

  children[1].innerHTML = "";
  children[2].innerHTML = "";
  children[1].appendChild(nameInput);
  children[2].appendChild(birthInput);
  children[3].appendChild(submitButton);

  submitButton.addEventListener("click", async () => {
    try {
      const name = nameInput.value;
      const birth = birthInput.value;
      const payload = {
        id,
        name,
        birth,
      };
      const data = await userController.updateUser(payload);
      users = await userController.getUsers();
      await onStatusChangeHandler(data.info.message)
      clearTableBody();
      loadTable(users.data);
      checkEmpty(users.data)
    } catch (error) {
      alert("Err: ", error);
    }
  });
};

const clearTableBody = () => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
};

const createActionCell = (idx, id) => {
  const cell = document.createElement("td");
  const editIcon = document.createElement("span");
  const deleteIcon = document.createElement("span");

  editIcon.addEventListener("click", () => onUpdateHandler(idx, id));
  deleteIcon.addEventListener("click", () => onDeleteHandler(id));

  editIcon.classList.add("ri--edit-fill");
  deleteIcon.classList.add("ant-design--delete-filled");
  cell.classList.add("action-cell");

  cell.appendChild(editIcon);
  cell.appendChild(deleteIcon);

  return cell;
};

const loadTable = (data) => {
  const tableBody = document.getElementById("table-body");

  // Loop through data to create row element.
  for (let i = 0; i < data.length; i++) {
    const birth = data[i].birth.split("T")[0];

    // Create elements.
    const tableRow = document.createElement("tr");
    const idCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const birthCell = document.createElement("td");
    const actionCell = createActionCell(i, data[i].id);

    tableRow.id = `row-${i}`;

    // Assign values to element.
    idCell.innerText = data[i].id;
    nameCell.innerText = data[i].name;
    birthCell.innerText = birth;

    // Styling
    tableRow.classList.add(i % 2 != 0 ? "odd-row" : null);

    // Append to parent elements.
    tableRow.appendChild(idCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(birthCell);
    tableRow.appendChild(actionCell);
    tableBody.appendChild(tableRow);
  }
};
