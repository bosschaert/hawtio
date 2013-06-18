module Osgi {
    export function ptc(e) {
        e.contentEditable = true;

        var saveBtn = document.getElementById("saveButton");
        saveBtn.disabled = false;
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

            var props = 
                {
                   "a":  { "Key": "a", "Value": "abc", "Type": "String" } // ,
                   // "felix.fileinstall.filename":  { "Key": "felix.fileinstall.filename", "Value": "file:/Users/david/clones/bosschaert_fuse_270213/fabric/fuse-fabric/target/fuse-fabric-99-master-SNAPSHOT/etc/foo.bar.cfg", "Type": "String" }
                };
            var args : any[] = ["foo.bar", props]; //JSON.stringify(props)];


            var mbean = getSelectionConfigAdminMBean(workspace);
            if (mbean) {
                var jolokia = workspace.jolokia;
            jolokia.request({
                "type": "exec",
                "mbean": mbean,
                //"operation": "update(java.lang.String,javax.management.openmbean.TabularData)",
                "operation": "update",
                "arguments": args

            }, {
                method: "post", 
                error: function(response) {
                    notification("error", response.error);
                },
                success: function(response) {
                    notification("success", response);
                }
            });
/*
                    jolokia.request(
                        {type: 'exec', mbean: mbean, operation: 'update', 
                            arguments: [
                            "org.ops4j.pax.url.mvn", props]},
                        {success: populateTable,
                        error: jmxError});
*/
                        // onSuccess(populateTable), onError(jmxError));
            }

            // notification("success", result);
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
