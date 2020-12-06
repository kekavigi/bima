

// Mendapatkan baris JSON data barang yang tertulis di textbox  =========================================================================================
// -1 jika barang ngga ada di data, id otherwise
function getRowDataBarang() {
  text = document.getElementById("cari").value;
  id = -1;
  for (var i = 0; i < data.length; i++) {
    if (text == data[i].art) {
      id = i;
      break;
    }
  }
  return id;
}


// Mendapatkan daftar baris JSON operator yang bersesuaian ==============================================================================================
// dengan stamp yang terletak di data[].loper
function getRowsJSONOperator(list) {
  listmp = list.slice();
  listId = [];
  for (var i = 0; listmp.length > 0 && i < operator.length; i++) {
    var index = listmp.indexOf(operator[i].stamp);
    if (index > -1) {
      // op.stamp is in data[].loper
      // hapus op.stamp dari list -- mempersingkat pencarian
      // tambahkan indeks op.stamp
      listmp.splice(index, 1);
      listId.push(i);
    }
  }
  return listId;
}


//  ====================================================================================================================================================
function getRowDescBarang() {
  text = document.getElementById("cari").value;
  id = -1;
  for (var i = 0; i < desc.length; i++) {
    if (text == desc[i].art) {
      id = i;
      break;
    }
  }
  return id;
}



function displayReadTable() {
  id = getRowDataBarang();
  if (id == -1) {
    document.getElementById("tableres").innerHTML = "";
  } else {
    result = "";
    iterator = getRowsJSONOperator(data[id].loper);
    iterator.forEach(
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
  id = getRowDataBarang();
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

function initUpdatePage() {
  getDaftarBarang();
  getDaftarProses();
  getDaftarMesin();
}
