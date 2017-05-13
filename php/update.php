<?php
include "koneksi.php";
$data = json_decode(file_get_contents("php://input"));
$nama = $data->nama;
$tgl_lahir = $data->tgl_lahir;
$alamat = $data->alamat;
$nis = $data->nis;
$query = "update siswa set nama = '$nama', alamat = '$alamat', tgl_lahir = '$tgl_lahir' where nis = '$nis'";
if(mysqli_query($konek, $query)){
    echo $nis;
}
else{
    echo "tidak ada";
}
?>