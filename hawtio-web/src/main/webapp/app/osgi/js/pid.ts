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

/*
            var mbean = getSelectionConfigAdminMBean($scope.workspace);
            if (mbean) {
                var jolokia = $scope.workspace.jolokia;
                jolokia.request(
                    {type: 'exec', mbean: mbean, operation: 'update', arguments: [$scope.pid, $scope.row]},
                    onSuccess(populateTable));
            }
*/

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

        $scope.pidSave = function() {
            var table = document.getElementById("configValues");

            var els : any = table.getElementsByClassName("pid-value");
            var result = "";
            for (var i = 0; i < els.length; i++) {
                result += "\n " + els[i].previousElementSibling.textContent + " " + els[i].textContent;
            }

                var props = "todo fixme";
                    //{
                    //foox : "bar"
                        // {"Key": "foo", "Type": "String", "Value": "fooval"}
                    //};


                var mbean = getSelectionConfigAdminMBean(workspace);
                if (mbean) {
                    var jolokia = workspace.jolokia;
                    jolokia.request(
                        {type: 'exec', mbean: mbean, operation: 'update', 
                            arguments: [
                            /* $scope.pid */ "org.ops4j.pax.url.mvn", props]},
                        {success: populateTable,
                        error: jmxError});
                        // onSuccess(populateTable), onError(jmxError));
                }

            notification("success", result);
        }

        $scope.updateEntity = function(column, row) {
            alert("updateEntity: " + column + " " + row);
        }

        function jmxError(response) {
            notification("error", "Oops: " + response);
        }

        function populateTable(response) {
            $scope.row = response.value
            $scope.$apply();
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
