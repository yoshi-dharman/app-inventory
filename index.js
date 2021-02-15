let displayListInventory = document.querySelector("#inventory");
console.log(displayListInventory);

const getData = async () => {
  const url = "https://6023acfe6bf3e6001766b5db.mockapi.io/inventory";
  let response = await fetch(url);
  let result = await response.json();
  console.log(result);

  console.log("sebelum", displayListInventory);
  displayListInventory.innerHTML = "";
  console.log("sesudah", displayListInventory);
  result.map((item) => {
    // document.write(`${item.name} <br/>`);
    let cardDisplay = document.createElement("div");
    cardDisplay.innerHTML = `<p>${item.name}</p>`;
    displayListInventory.appendChild(cardDisplay);

    // button delete
    let cardDelete = document.createElement("button");
    cardDelete.setAttribute("onclick","deleteData("+ item.id +")");
    let cardDeleteText = document.createTextNode("Deletee");
    cardDelete.appendChild(cardDeleteText);
    displayListInventory.appendChild(cardDelete);

    // button update
    let cardUpdate = document.createElement("button");
    cardUpdate.setAttribute("onclick","updateData("+ item.id +")");
    let cardUpdateText = document.createTextNode("Updatee");
    cardUpdate.appendChild(cardUpdateText);
    displayListInventory.appendChild(cardUpdate);
  });
};
getData();

let addInventorySubmit = document.querySelector("#add-inventory-btn");
console.log(addInventorySubmit);

const addData = async (event) => {
  console.log("ke klik button submit");

  // supaya web browser tidak refresh halaman
  event.preventDefault();

  // Mengambil data dari form
  let dataForm = document.querySelector("#inventory-form").value;
  console.log("value dari form", dataForm);

  // Merubah data dari form yang string menjadi object
  let dataObj = {
    name: dataForm,
  };
  console.log("value form menjadi obj", dataObj);

  // Merubah data objek menjadi JSON supaya bisa dikirim lewat post
  let dataJSON = JSON.stringify(dataObj);
  console.log("obj menjadi json", dataJSON);

  // mengepost data ke mock api
  const url = "https://6023acfe6bf3e6001766b5db.mockapi.io/inventory";
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataJSON,
  };
  console.log("options", options);

  // proses post data dengan error handling
  try {
    // mengirimkan post data
    const fetchResponse = await fetch(url, options);
    console.log("fetchResponse", fetchResponse);

    // mendapatkan hasil response dari server setelah mengirim data
    const dataResponse = await fetchResponse.json();
    console.log("dataReponse", dataResponse);

    // ambil data yang paling baru dari server setelah di add
    getData();

    // kosongkan form setelah submit berhasil
    document.querySelector("#inventory-form").value = "";
    return dataResponse;
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};
addInventorySubmit.addEventListener("click", addData);

const deleteData = async (id) => {
  const api = "https://6023acfe6bf3e6001766b5db.mockapi.io/inventory";
  let response = await fetch(api+"/"+id,{
    method: "DELETE",
    headers: {'Content-Type': 'application/json'},
    // body: JSON.stringify(data),
    });
    let result = await response.json();
    getData();
};

const updateData = async (id) => {
  const api = "https://6023acfe6bf3e6001766b5db.mockapi.io/inventory";
  let dataUpdate = prompt("Please insert new value : ");
  let dataObj = {
    name : dataUpdate
  }
  // console.log(dataObj);

  let response = await fetch(api+"/"+id,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObj),
    });
    let result = await response.json();
    getData();
    // console.log(result);
};
