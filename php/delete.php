<?php
include "koneksi.php";
$data = json_decode(file_get_contents("php://input"));
$nis = $data->nis;
$query = "delete from siswa where nis='$nis'";
if (mysqli_query($konek, $query)){
    echo $nis;
}
else{
    echo "tidak ada";
}
?>