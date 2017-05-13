<?php
include "koneksi.php";
$query = "select * from siswa";
$sql = mysqli_query($konek, $query);
while($row = mysqli_fetch_assoc($sql)){
    $out[] = $row;
}
echo json_encode($out);
?>