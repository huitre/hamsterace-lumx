angular.module('Hamsterace.Directives').directive(
'embedVideo', [
function (element, attrs) {
    
    return {
        link: function (scope, element, attrs) {
            element.innerHTML = '<video src="' + element.innerText + '"/>';
        }
    }
}]);