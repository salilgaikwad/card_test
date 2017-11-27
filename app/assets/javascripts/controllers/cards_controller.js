var myApp = angular.module( 'myApp' );

myApp.factory('Cards', ['$resource',function($resource){
  return $resource('/cards.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Card', ['$resource', function($resource){
  return $resource('/cards/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

//Controller
myApp.controller("CardListCtr", ['$scope', '$http', '$resource', 'Cards', 'Card', '$location', function($scope, $http, $resource, Cards, Card, $location) {

  $scope.cards = Cards.query();

  $scope.deleteCard = function (cardId) {
    if (confirm("Are you sure you want to delete this card?")){
      Card.delete({ id: cardId }, function(){
        $scope.cards = Cards.query();
        $location.path('/');
      });
    }
  };
}]);

myApp.controller("CardUpdateCtr", ['$scope', '$resource', 'Card', '$location', '$routeParams', function($scope, $resource, Card, $location, $routeParams) {
  $scope.card = Card.get({id: $routeParams.id})
  $scope.update = function(){
    if ($scope.cardForm.$valid){
      Card.update({id: $scope.card.id},{card: $scope.card},function(){
        $location.path('/');
      }, function(error) {
        console.log(error)
      });
    }
  };

}]);

myApp.controller("CardAddCtr", ['$scope', '$resource', 'Cards', '$location', function($scope, $resource, Cards, $location) {
  $scope.card = {addresses: [{street1: '', street2: '', city: '', state: '', country: '', zipcode: '' }]}
  $scope.save = function () {
    if ($scope.cardForm.$valid){
      Cards.create({card: $scope.card}, function(){
        $location.path('/');
      }, function(error){
        console.log(error)
      });
    }
  }

}]);

