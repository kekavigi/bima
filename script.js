// ======================== Definisi Variabel =====================================

//daftarDesc

daftarProses = [
  { bagian: "Cutting", proses: ["Pon", "Circle"] },
  {
    bagian: "Produksi",
    proses: [
      "Drawing",
      "Trimming",
      "Curling",
      "Dreuk",
      "Dreuk Bottom",
      "Roll Pinggang",
    ],
  },
  { bagian: "Polishing", proses: ["Mirror", "Satin"] },
  { bagian: "???", proses: ["Assy", "Package"] },
  { bagian: "Gudang", proses: ["Gudang", "Kirim"] },
];

daftarMesin = [
  "H 150",
  "H 200",
  "H 300",
  "H 400",
  "Mesin Pon",
  "Mesin Potong",
  "Mesin Roll",
  "Press 100T",
  "Press 200T",
  "Press 300T",
  "Roll Sendok",
];

daftarOrang = ["Agus", "Budi", "Cecep", "Doni", "Elang", "Franz"];

//dataMaster = [art, order]

//dataKerja = [art, order, date, proses, mesin, orang, hasil, reject, ket]

// ===========================================================================================

// mencari baris data barang berdasarkan art di on
//   id jika barang ada, -1 jika tidak
function getRowBarang(art, on) {
  id = -1;

  // pencarian di?
  if (on === "master") {
    iter_ = dataMaster;
  } else if (on === "desc") {
    iter_ = daftarDesc;
  }

  // searching
  for (var i = 0; i < iter_.length; i++) {
    if (art === iter_[i].art) {
      id = i;
      break;
    }
  }

  return id;
}

// mencari deskripsi barang dari art
function getDescBarang(art) {
  return daftarDesc[getRowBarang(art, "desc")].desc;
}

// mendapatkan daftar proses di bagian X
function getDaftarProsesDi(bagian) {
  for (var i = 0; i < daftarProses.length; i++) {
    if (daftarProses[i].bagian == bagian) {
      return daftarProses[i].proses;
    }
  }
}

// ===========================================================================================

// menampilkan dropdown datalist barang yang tersedia
//   jika how===minimal: daftar barang yang sedang dikerjakan
//   jika how===all: daftar barang di kamus
function displayOptionBarang(on) {
  result = "";

  // pencarian di?
  if (on === "master") {
    iter = dataMaster;
  } else if (on === "desc") {
    iter = daftarDesc;
  }

  // displaying...
  for (var i = 0; i < iter.length; i++) {
    result += "<option value='" + iter[i].art + "'>";
    result += getDescBarang(iter[i].art) + "</option>";
  }

  document.getElementById("dropdownBarang").innerHTML = result;
}

// menampilkan dropdown proses yang sedang tersedia
function displayOptionProses() {
  result = "<option value=''>...</option>";

  for (var i = 0; i < daftarProses.length; i++) {
    // optgroup bagian
    result += "<optgroup label='" + daftarProses[i].bagian + "'>";

    // option proses
    tmp = daftarProses[i].proses;
    for (var j = 0; j < tmp.length; j++) {
      result += "<option value='" + tmp[j] + "'>" + tmp[j] + "</option>";
    }
    result += "</optgroup>";
  }
  document.getElementById("dropdownProses").innerHTML = result;
}

// menampilkan dropdown bagian proses yang sedang tersedia
function displayOptionBagian() {
  result = "<option value=''>...</option>";

  for (var i = 0; i < daftarProses.length; i++) {
    result += "<option value='" + daftarProses[i].bagian + "'>";
    result += daftarProses[i].bagian + "</option>";
  }
  document.getElementById("dropdownBagian").innerHTML = result;
}

// menampilkan dropdown proses yang sedang tersedia
function displayOptionMesin() {
  result = "<option value=''>...</option>";

  for (var i = 0; i < daftarMesin.length; i++) {
    result += "<option value='" + daftarMesin[i] + "'>";
    result += daftarMesin[i] + "</option>";
  }
  document.getElementById("dropdownMesin").innerHTML = result;
}

function displayOptionOrang() {
  result = "<option value=''>...</option>";

  for (var i = 0; i < daftarOrang.length; i++) {
    result += "<option value='" + daftarOrang[i] + "'>";
    result += daftarOrang[i] + "</option>";
  }
  document.getElementById("dropdownOrang").innerHTML = result;
}

// menampilkan kotak pencarian sesuai radio button yang dipilih
function displaySearchOption(on) {
  if (on === "bagian") {
    document.getElementById("searchOption").innerHTML =
      "<select required='' class='custom-select' id='dropdownBagian'></select>" +
      "<br><br><button type='button' class='btn btn-primary' onclick='displaySearchResult(true, false)'>Cari</button>";
    displayOptionBagian();
  } else if (on === "barang") {
    document.getElementById("searchOption").innerHTML =
      "<input type='text' class='text-center form-control' " +
      "list='dropdownBarang' id='textboxBarang' onchange='displayStatusBarang(\"master\")' " +
      "placeholder='Tulis nomor artikel atau deskripsi barang'/>" +
      "<datalist id='dropdownBarang'></datalist>" +
      "<div class='container'><p class='text-center' id='descBarang'></p>" +
      "<p class='text-center text-danger' id='errDescBarang'></p></div>" +
      "<button type='button' class='btn btn-primary' onclick='displaySearchResult(false, true)'>Cari</button>";
    displayOptionBarang("master");
  }
}

// ===========================================================================================

// menampilkan deskripsi jika barang di hasil pencarian
// tersedia, menampilkan status error jika tidak
function displayStatusBarang(on) {
  art = document.getElementById("textboxBarang").value;
  id = getRowBarang(art, on);

  if (id > -1) {
    desc = getDescBarang(art);
    err = "";
  } else {
    desc = "";
    if (on === "master") {
      err = "Barang tidak dibuat.";
    } else if (on === "desc") {
      err = "Kode barang salah.";
    }
  }
  document.getElementById("descBarang").innerHTML = desc;
  document.getElementById("errDescBarang").innerHTML = err;
}

// menampilkan info jika barang di hasil pencarian tersedia
function displayInfoBarang() {
  art = document.getElementById("textboxBarang").value;
  id = getRowBarang(art, "master");

  if (id > -1) {
    document.getElementById("order").innerHTML = dataMaster[id].order;
    document.getElementById("totprod").innerHTML = "!!!!";
  } else {
    document.getElementById("order").innerHTML = "";
    document.getElementById("totprod").innerHTML = "";
  }
}

//
function displaySearchResult(bagian, barang) {
  var tanggal = document.getElementById("textboxTanggal").value;

  if (!tanggal) {
    return false;
  }
  var result = "";

  if (bagian) {
    var bagian = document.getElementById("dropdownBagian").value;
    if (!bagian) {
      return false;
    }

    var daftarProses_ = getDaftarProsesDi(bagian);

    for (var i = 0; i < dataKerja.length; i++) {
      var row = dataKerja[i];
      if (row.date == tanggal && daftarProses_.includes(row.proses)) {
        result += "<tr>";
        result += "<td>" + row.art + "</td>";
        result += "<td>" + row.proses + "</td>";
        result += "<td>" + row.mesin + "</td>";
        result += "<td>" + row.orang + "</td>";
        result += "<td>" + row.hasil + "</td>";
        result += "<td>" + row.reject + "</td>";
        result += "<td>" + row.ket + "</td>";
        result += "</tr>";
      }
    }
  } else if (barang) {
    var barang = document.getElementById("textboxBarang").value;
    if (!barang) {
      return false;
    }
    for (var i = 0; i < dataKerja.length; i++) {
      var row = dataKerja[i];
      if (row.date == tanggal && row.art == barang) {
        result += "<tr>";
        result += "<td>" + row.art + "</td>";
        result += "<td>" + row.proses + "</td>";
        result += "<td>" + row.mesin + "</td>";
        result += "<td>" + row.orang + "</td>";
        result += "<td>" + row.hasil + "</td>";
        result += "<td>" + row.reject + "</td>";
        result += "<td>" + row.ket + "</td>";
        result += "</tr>";
      }
    }
  }

  document.getElementById("tableResult").innerHTML = result;
}

function initPageUpdateHTML() {
  displayOptionBarang("master");
  displayOptionProses();
  displayOptionMesin();
  displayOptionOrang();
}
