MateriaCreator.controller('creatorCtrl', [
  '$scope', function($scope) {
    var _buildSaveData;
    $scope.widget = {
      engineName: '',
      title: ''
    };
    $scope.state = {
      isEditingExistingWidget: false
    };
    $scope.initNewWidget = function(widget) {
      return $scope.$apply(function() {
        return $scope.widget.engineName = $scope.widget.title = widget.name;
      });
    };
    $scope.initExistingWidget = function(title, widget) {
      $scope.state.isEditingExistingWidget = true;
      return $scope.$apply(function() {
        $scope.widget.engineName = widget.name;
        return $scope.widget.title = title;
      });
    };
    $scope.onSaveClicked = function() {
      if ($scope.widget.title) {
        return Materia.CreatorCore.save($scope.widget.title, _buildSaveData());
      } else {
        return Materia.CreatorCore.cancelSave('This widget has no title!');
      }
    };
    _buildSaveData = function() {
      return {
        name: '',
        items: []
      };
    };
    return Materia.CreatorCore.start($scope);
  }
]);