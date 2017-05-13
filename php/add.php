<?php
include "koneksi.php";
$data = json_decode(file_get_contents("php://input"));
$nama = $data->nama;
$tgl_lahir = $data->tgl_lahir;
$alamat = $data->alamat;
$nis = $data->nis;
$tgl = substr($tgl_lahir, 0, 10);
$query = "insert into siswa values('$nis', '$nama', '$tgl', '$alamat')";
if (mysqli_query($konek, $query)){
    echo "berhasil";
}
else{
    echo "gagal";
}
?>