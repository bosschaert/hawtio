module Osgi {
    export function ptc(e) {
        e.contentEditable = true;

        var saveBtn = document.getElementById("saveButton");
        saveBtn.disabled = false;
    };

    export function PidSave() {
        var table = document.getElementById("configValues");

        var els : any = table.getElementsByClassName("pid-value");
        var result = "";
        for (var i = 0; i < els.length; i++) {
            result += "\n " + els[i].previousElementSibling.textContent + " " + els[i].textContent;
        }

        notification("success", result);
    };

    export function PidController($scope, $filter:ng.IFilterService, workspace:Workspace, $routeParams) {
        $scope.pid = $routeParams.pid;

        updateTableContents();
/*        $("#pids tr td").bind("click", dataClick);


        function dataClick(e) {
    $(e.currentTarget).css({
        color:"red"
    });
        };
*/

        $scope.updateEntity = function(column, row) {
            alert("updateEntity: " + column + " " + row);
        }

        function populateTable(response) {
            $scope.row = response.value
            $scope.$apply();

            var cellEditableTemplate = "<input style=\"width: 90%\" step=\"any\" type=\"number\" ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-blur=\"updateEntity(col, row)\"/>";
            $scope.myData = [{name: "Moroni", age: 50},
                             {name: "Tiancum", age: 43},
                             {name: "Jacob", age: 27},
                             {name: "Nephi", age: 29},
                             {name: "Enos", age: 34}];
            $scope.pidData = {
                  data: 'myData',
                  enableCellSelection: true,
                  canSelectRows: false,
                  displaySelectionCheckbox: false,
                  columnDefs: [
                    {field: 'name', displayName: 'Name', enableCellEdit: true, editableCellTemplate: cellEditableTemplate},
                    {field:'age', displayName:'Age'}]
            };
        };

        function updateTableContents() {
            var mbean = getSelectionConfigAdminMBean(workspace);
            if (mbean) {
                var jolokia = workspace.jolokia;
                jolokia.request(
                    {type: 'exec', mbean: mbean, operation: 'getProperties', arguments: [$scope.pid]},
                    onSuccess(populateTable));
            }
        }
    };

}
