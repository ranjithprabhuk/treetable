var app = angular.module('app', []);

app.controller('loginController', ['$http', '$scope', '$rootScope', function ($http, $scope, $rootScope) {

var vm=this;

$scope.data=[
		{"First_Name": "Root","Last_Name":"More","Phone":4454545454,
		 "data":[
		 {"First_Name": "Root","Last_Name":"More","Phone":4454545454,"data":[]},
		 {"First_Name": "Andy","Last_Name":"Murray","Phone":121212121},
		 {"First_Name": "Rafael","Last_Name":"Nadal","Phone":6565656656,"data":[
		 {"First_Name": "Root","Last_Name":"More","Phone":4454545454,"data":[]},
		 {"First_Name": "Andy","Last_Name":"Murray","Phone":121212121},
		 {"First_Name": "Rafael","Last_Name":"Nadal","Phone":6565656656},
		{"First_Name": "Ranjith","Last_Name":"Prabhu","Phone":98989898989}]},
		{"First_Name": "Ranjith","Last_Name":"Prabhu","Phone":98989898989}]},
		{"First_Name": "Andy","Last_Name":"Murray","Phone":121212121},
		{"First_Name": "Rafael","Last_Name":"Nadal","Phone":6565656656},
		{"First_Name": "Ranjith","Last_Name":"Prabhu","Phone":98989898989},
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
							console.log(x,x.indexOf('_'));
						if(x!="data" && x.indexOf('_') == -1){
							row+='<td><strong>'+ x +'</strong></td>';
						}
						else if(x!="data" && x.indexOf('_') >-1){
							var header=x.split('_'),
								j=0;
							row+='<td><strong>';
							for(j=0;j<header.length;j++){
								row+= header[j] +' ';
							}
							row+='</strong></td>';
						}
					}
					
					row+='</thead><tbody>';
					}
						row+='<tr ng-Mouseover="makeClick()">';
						for(x in tableData[i]){
							if(x!="data"){
								console.log(typeof tableData[i][x]);
								if(typeof tableData[i][x]=='number')
									row+='<td cell-highlighter value='+tableData[i][x]+'>';
								else
									row+='<td>';
								row+=tableData[i][x] +'</td>';
							}
					}
					row+='</tr>';

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
		  scope.makeClick=function(value){
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


app.directive('cellHighlighter', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            value: '=',
        },
        link: function (scope, element, attributes) {
			if(scope.value>4454545454){
				element.addClass('bg-danger');
			}
    }
	}
});

