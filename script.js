proses = ["Produksi", "Cutting", "Drawing", "Trimming", "Curling", "Dreuk", "Roll Pinggang", "Dreuk Bottom"];
mesin = ["H 400", "H 350", "H 200", "H 80", "Tat Ming"];

// Mendapatkan daftar barang yang sedang diproses (JSON)
// dan menampilkannya dalam bentuk datalist
function getDaftarBarang() {
  result = "";
  for (var i = 0; i < data.length; i++) {
    result +=
      "<option value='" + data[i].art + "'>" + data[i].desc + "</option>";
  }
  document.getElementById("daftarbarang").innerHTML = result;
}

// Mendapatkan semua daftar barang yang ada (JSON)
// dan menampilkannya dalam bentuk datalist
function getAllDaftarBarang() {
  result = "";
  for (var i = 0; i < desc.length; i++) {
    result +=
      "<option value='" + desc[i].art + "'>" + desc[i].desc + "</option>";
  }
  document.getElementById("daftarbarang").innerHTML = result;
}

// Mendapatkan daftar proses yang sedang tersedia
// dan menampilkannya dalam bentuk option
function getDaftarProses() {
  result = "<option value=''>Pilih tahap</option>";
  for (var i = 0; i < proses.length; i++) {
    result +=
      "<option value='" + proses[i] + "'>" + proses[i] + "</option>";
  }
  document.getElementById("proses").innerHTML = result;
}

// Mendapatkan daftar mesin yang sedang tersedia
// dan menampilkannya dalam bentuk option
function getDaftarMesin() {
  result = "<option value=''>Pilih mesin</option>";
  for (var i = 0; i < mesin.length; i++) {
    result +=
      "<option value='" + mesin[i] + "'>" + mesin[i] + "</option>";
  }
  document.getElementById("mesin").innerHTML = result;
}

// Mendapatkan baris JSON data barang yang tertulis di textbox
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

// Mendapatkan daftar baris JSON operator yang bersesuaian
// dengan stamp yang terletak di data[].loper
function getRowsJSONOperator(list) {
  listmp = list.slice()
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

function displayDesc() {
  id = getRowDescBarang();
  if (id > -1) {
    document.getElementById("deskripsi").innerHTML = desc[id].desc;
    document.getElementById("errdeskripsi").innerHTML = "";
  } else {
    document.getElementById("deskripsi").innerHTML = "";
    document.getElementById("errdeskripsi").innerHTML = "Barang tidak ditemukan";
  }
}

function displayInfo() {
  id = getRowDataBarang();
  if (id > -1) {
    document.getElementById("order").innerHTML = data[id].order;
    document.getElementById("totprod").innerHTML = "!!!!";
  } else {
    document.getElementById("order").innerHTML = "";
    document.getElementById("totprod").innerHTML = "";
  }
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

function initUpdatePage(){
  getDaftarBarang();
  getDaftarProses();
  getDaftarMesin();
}
