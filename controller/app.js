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
		  $scope.makeClick=function(){
			alert('12');
		  };
}]);



app.directive('treeTable', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            data: '=',

        },
        link: function (scope, element, attributes) {
		var data=scope.data;
        scope.table =  '';
var n=1;

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
					row+='<tr  ng-click="makeClick()">';
					for(x in tableData[i]){
						if(x!="data"){
							row+='<td>'+ tableData[i][x] +'</td>';
						}
					}
					row+='</tr>';
					}
					else{
						row+='<tr ng-click="makeClick()">';
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
						console.log("before>>>",scope.table);
						scope.table = scope.table.slice(0,scope.table.length-10);
						console.log("after>>>",scope.table);
						scope.table+='<span class="fa fa-chevron-circle-down pull-right"></span></td></tr>';
						var colspanValue=Object.keys(tableData[i]).length;
						scope.table+='<tr id=row><td colspan='+colspanValue+'>';
						var temp=i;
						n++;
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
				        var elmnt = $compile(scope.table)( scope );
        
          element.append( elmnt );
		  scope.makeClick=function(){
			$('tr').on('click',function(event){
				console.log('1111');
				var nextNode = $(this).next();
				if(nextNode.length){
					var text=$(this).next().html();
					if(text.indexOf('colspan')> -1){
						$(this).next().toggle();
						$(this).children().children().toggleClass("fa-chevron-circle-down");
						$(this).children().children().toggleClass("fa-chevron-circle-up");
					}
				}
				//event.stopPropagation();
			});
		  };

        }
    }
});

