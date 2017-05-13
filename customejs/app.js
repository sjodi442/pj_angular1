var test = angular.module('testapp', ['ngRoute', 'ngAnimate']);

//factory
test.factory('factory1', function($http){
    var factory1 = {};
    //getdata
    factory1.getdaftar = function(){
        return $http.get('http://localhost/projectangular1/php/getdata.php');
    };
    //postdata
    factory1.postdaftar = function(dataadd){
        return $http.post('http://localhost/projectangular1/php/add.php', dataadd);
    };
    //deletedata
    factory1.delete = function(datadel){
        return $http.post('http://localhost/projectangular1/php/delete.php', datadel);
    };
    //updatedata
    factory1.update = function(dataed){
        return $http.post('http://localhost/projectangular1/php/update.php', dataed);  
    };
    return factory1;
});

//directive template
test.directive('header', function(){
   return{
       restrict: 'A',
       templateUrl: 'http://localhost/projectangular1/template/header.html'
   } 
});
test.directive('navigation', function(){
   return{
     restrict: 'A',
       templateUrl: 'http://localhost/projectangular1/template/navigation.html'
   } 
});

//route
test.config(function($routeProvider){
    $routeProvider
    .when('/view',{
        templateUrl: 'http://localhost/projectangular1/ng-view/view.html',
        controller: 'data',
    })
    .when('/input',{
        templateUrl: 'http://localhost/projectangular1/ng-view/input.html',
        controller: 'data',
    })
    .otherwise({redirectTo: '/'});
});

//controller
test.controller('data', function($scope, $http, factory1){
    //data ambil dari database
    factory1.getdaftar().then(function(hasil){
        $scope.data = hasil;
    });
    //function inputdata()
    $scope.inputdata = function(){
        factory1.postdaftar({'nama': $scope.databaru.nama, 'alamat': $scope.databaru.alamat, tgl_lahir: $scope.databaru.tgl_lahir, 'nis': $scope.databaru.nis}).then(function(hasil){
            //ambil data ter-uptodate
            factory1.getdaftar().then(function(hasil){
                $scope.data = hasil;
            });
            window.alert(hasil.data);
            //kembalikan form seperti semula
            document.getElementById("nama").value = "";
            document.getElementById("alamat").value = "";
            document.getElementById("nis").value = "";
        }); 
    };
    //function delete()
    $scope.delete = function(datad){
        factory1.delete({'nis': datad}).then(function(hasildel){
            //jika berhasil ambil data yg ter-uptodate setelah dihapus
            factory1.getdaftar().then(function(hasil){
               $scope.data = hasil; 
            });
            window.alert("data "+hasildel.data+" berhasil dihapus");
        });
    };
    //function edit()
    $scope.edit = function(nis, nama, alamat, tgl_lahir){
        document.getElementById("nama").value = nama;
        document.getElementById("alamat").value = alamat;
        document.getElementById("nis").value = nis;
        document.getElementById("nis").disabled = true;
        document.getElementById("tgl_lahir").value = tgl_lahir;
        document.getElementById("input").disabled = true;
        document.getElementById("reset").disabled = true;
        document.getElementById("update").style.display = "block";
    };
    //function update()
    $scope.update = function(){
        //ambil data yang di update
        var nama = document.getElementById("nama").value;
        var alamat = document.getElementById("alamat").value;
        var nis = document.getElementById("nis").value;
        var tgl_lahir = document.getElementById("tgl_lahir").value;
        //jalankan factory update
        factory1.update({'nama': nama, 'alamat': alamat, tgl_lahir: tgl_lahir, 'nis': nis}).then(function(hasilup){
            //ambil data ter-uptodate
            factory1.getdaftar().then(function(hasil){
               $scope.data = hasil; 
            });
            window.alert("data "+hasilup.data+" berhasil diedit");
            //kembalikan form seperti semula
            document.getElementById("nis").disabled = false;
            document.getElementById("input").disabled = false;
            document.getElementById("reset").disabled = false;
            document.getElementById("update").style.display = "none";
            document.getElementById("nama").value = "";
            document.getElementById("alamat").value = "";
            document.getElementById("nis").value = "";
        });
    };
});