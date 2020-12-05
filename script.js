function getDaftarBarang() {
  result = "";

  for (var i = 0; i < data.length; i++) {
    result +=
      "<option value='" + data[i].art + "'>" + data[i].desc + "</option>";
  }

  document.getElementById("daftarbarang").innerHTML = result;
}

// -1 jika barang ngga ada di data
// id data jika ada
function getRowJSONBarang() {
  text = document.getElementById("cari").value;
  id = -1;
  for (var i = 0; i < data.length; i++) {
    if (data[i].art == text) {
      id = i;
      break;
    }
  }
  return id;
}

// -1 jika barang ngga ada di data
// id data jika ada
function getRowsJSONOperator(list) {
  listId = [];
  for (var i = 0; list.length > 0 && i < operator.length; i++) {
    var index = list.indexOf(operator[i].stamp);
    if (index > -1) {
      list.splice(index, 1);
      listId.push(i);
    }
  }
  return listId;
}

function displayInfo() {
  id = getRowJSONBarang();
  if (id > -1) {
    document.getElementById("artno").innerHTML = data[id].art;
    document.getElementById("deskripsi").innerHTML = data[id].desc;
    document.getElementById("order").innerHTML = data[id].order;
    document.getElementById("totprod").innerHTML = "!!!!";
  }
}

function displayReadTable() {
  id = getRowJSONBarang();
  if (id == -1) {
    document.getElementById("tableres").innerHTML = "";
  } else {
    result = "";
    getRowsJSONOperator(data[id].loper).forEach(
      (i) =>
        (result +=
          "<tr>" +
          "<td>" +
          operator[i].tanggal +
          "</td>" +
          "<td>" +
          operator[i].proses +
          "</td>" +
          "<td>" +
          operator[i].mesin +
          "</td>" +
          "<td>" +
          operator[i].operator +
          "</td>" +
          "<td>" +
          operator[i].hasil +
          "</td>" +
          "<td>" +
          operator[i].reject +
          "</td>" +
          "<td>" +
          operator[i].keterangan +
          "</td></tr>")
    );
    document.getElementById("tableres").innerHTML = result;
  }
}

function displayDeleteTable() {
  id = getRowJSONBarang();
  if (id == -1) {
    document.getElementById("tableres").innerHTML = "";
  } else {
    result = "";
    getRowsJSONOperator(data[id].loper).forEach(
      (i) =>
        (result +=
          "<tr>" +
          "<td>" +
          operator[i].tanggal +
          "</td>" +
          "<td>" +
          operator[i].proses +
          "</td>" +
          "<td>" +
          operator[i].mesin +
          "</td>" +
          "<td>" +
          operator[i].operator +
          "</td>" +
          "<td>" +
          operator[i].hasil +
          "</td>" +
          "<td>" +
          operator[i].reject +
          "</td>" +
          "<td>" +
          operator[i].keterangan +
          "</td>" +
          "<td> <button type='button' class='btn btn-warning' value='" +
          operator[i].stamp +
          "'>Edit</button> " +
          "<button type='button' class='btn btn-danger' value='" +
          operator[i].stamp +
          "'>Hapus</button></td></tr>")
    );
    document.getElementById("tableres").innerHTML = result;
  }
}
