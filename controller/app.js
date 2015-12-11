var app = angular.module('app', []);

app.controller('loginController', ['$http', '$scope', '$rootScope', function ($http, $scope, $rootScope) {

var vm=this;

$scope.data=[
		{"FirstName": "Root","LastName":"More","Phone":"4454545454",
		 "data":[
		 {"FirstName": "Root","LastName":"More","Phone":"4454545454","data":[]},
		 {"FirstName": "Andy","LastName":"Murray","Phone":"121212121"},
		 {"FirstName": "Rafael","LastName":"Nadal","Phone":"6565656656","data":[
		 {"FirstName": "Root","LastName":"More","Phone":"4454545454","data":[]},
		 {"FirstName": "Andy","LastName":"Murray","Phone":"121212121"},
		 {"FirstName": "Rafael","LastName":"Nadal","Phone":"6565656656"},
		{"FirstName": "Ranjith","LastName":"Prabhu","Phone":"98989898989"}]},
		{"FirstName": "Ranjith","LastName":"Prabhu","Phone":"98989898989"}]},
		{"FirstName": "Andy","LastName":"Murray","Phone":"121212121"},
		{"FirstName": "Rafael","LastName":"Nadal","Phone":"6565656656"},
		{"FirstName": "Ranjith","LastName":"Prabhu","Phone":"98989898989"},
		];
$scope.openTable=function(){
	alert('1');
};

}]).directive('treeTable', function () {
    return {
        restrict: 'A',
        scope: {
            data: '=',
        },
        link: function (scope, element, attributes) {
		var data=scope.data;
        scope.table =  '';
			function openTable(){
				alert('1');
			};

			function buildTable(tableData){
				var row='<table class="table table-bordered">';
				for(i=0;i<tableData.length;i++){
					if(i==0){
						row+='<thead class="table-header">';
						for(x in tableData[i]){
						if(x!="data"){
							row+='<td><strong>'+ x +'</strong></td>';
						}
					}
					
					row+='</thead><tbody>';
					}
					if(i==0){
					row+='<tr data-ng-click="openTable();" data-ng-show="false">';
					for(x in tableData[i]){
						if(x!="data"){
							row+='<td>'+ tableData[i][x] +'</td>';
						}
					}
					row+='</tr>';
					}
					else{
						row+='<tr>';
					for(x in tableData[i]){
						if(x!="data"){
							row+='<td>'+ tableData[i][x] +'</td>';
						}
					}
					row+='</tr>';
					}
					scope.table+=row;
					row='';
					if(angular.isDefined(tableData[i].data) && tableData[i].data.length>0){
						var colspanValue=Object.keys(tableData[i]).length-1;
						scope.table+='<tr><td colspan='+colspanValue+'>';
						var temp=i;
						buildTable(tableData[i].data);
						scope.table+='</td></tr>';
						i=temp;
					}
				}
				scope.table+='</tbody></table>';
			};
				if(data.length>0){
					buildTable(data);
				}
			element.html(scope.table);
			console.log(element[0]);
        }
    }
});