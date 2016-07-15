// Topic
deleteTopicConfirm = function(data) {
  var id = $(data).data("id");
  $("#deleteTopicButton").data("id", id);
  $("#deleteTopicConfirm").modal('show');
};

deleteTopic = function(data) {
  var id = $(data).data("id");
  angular.element(data).scope().$apply();
  angular.element(data).scope().deleteTopic(id);
  $("#deleteTopicConfirm").modal('hide');
};

// Category
deleteCategoryConfirm = function(data) {
  var id = $(data).data("id");
  $("#deleteCategoryButton").data("id", id);
  $("#deleteCategoryConfirm").modal('show');
};

deleteCategory = function(data) {
  var id = $(data).data("id");
  angular.element(data).scope().$apply();
  angular.element(data).scope().deleteCategory(id);
  $("#deleteCategoryConfirm").modal('hide');
};
