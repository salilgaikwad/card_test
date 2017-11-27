'use strict';

angular.module( 'myApp' ).factory('Cards', ['$resource',function($resource){
  return $resource('/cards.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

angular.module( 'myApp' ).factory('Card', ['$resource', function($resource){
  return $resource('/cards/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

angular.module( 'myApp' ).factory('Users', ['$resource',function($resource){
  return $resource('/users.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

angular.module( 'myApp' ).factory('Statuses', ['$resource',function($resource){
  return $resource('/statuses.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

angular.module( 'myApp' ).factory('Priorities', ['$resource',function($resource){
  return $resource('/priorities.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

//Controller
angular.module( 'myApp' ).controller("CardListCtr", ['$scope', '$http', '$resource', 'Cards', 'Card', '$location', function($scope, $http, $resource, Cards, Card, $location) {

  $scope.cards = Cards.query();
  console.log($scope.cards);

  $scope.deleteCard = function (cardId) {
    if (confirm("Are you sure you want to delete this card?")){
      Card.delete({ id: cardId }, function(){
        $scope.cards = Cards.query();
        $location.path('/cards');
      });
    }
  };
}]);

angular.module( 'myApp' ).controller("CardUpdateCtr", ['$scope', '$resource', 'Card', 'Users', 'Statuses', 'Priorities', '$location', '$routeParams', function($scope, $resource, Card, Users, Statuses, Priorities, $location, $routeParams) {
  $scope.card = Card.get({id: $routeParams.id})
  $scope.users = Users.query();
  $scope.statuses = Statuses.query();
  $scope.priorities = Priorities.query();

  console.log($scope.priorities);

  $scope.update = function(){
    if ($scope.cardForm.$valid){
      Card.update({id: $scope.card.id},{card: $scope.card},function(){
        $location.path('/cards');
      }, function(error) {
        console.log(error)
      });
    }
  };

}]);

angular.module( 'myApp' ).controller("CardAddCtr", ['$scope', '$resource', 'Cards', 'Users', 'Statuses', 'Priorities', '$location', function($scope, $resource, Cards, Users, Statuses, Priorities, $location) {
  $scope.card = {}
  $scope.users = Users.query();
  $scope.statuses = Statuses.query();
  $scope.priorities = Priorities.query();
  console.log($scope.priorities);
  $scope.save = function () {
    if ($scope.cardForm.$valid){
      Cards.create({card: $scope.card}, function(){
        $location.path('/cards');
      }, function(error){
        console.log(error)
      });
    }
  }

}]);

angular.module( 'myApp' ).controller("CardDashboardCtr", ['$scope', '$http', '$resource', 'Cards', 'Card', '$location', '$timeout',
  function($scope, $http, $resource, Cards, Card, $location, $timeout) {

  $scope.cards = Cards.query();

  
  $timeout(function(){
    console.log($scope.cards.length);
    console.log(_.filter($scope.cards, { 'status_id': 1} ));
    $scope.backlog = _.filter($scope.cards, { 'status_id': 1} );
    $scope.in_progress = _.filter($scope.cards, { 'status_id': 2} );
    $scope.done = _.filter($scope.cards, { 'status_id': 4} );
    $scope.closed = _.filter($scope.cards, { 'status_id': 5} );
  }, 100)


  $scope.updateCard = function (cardId, status) {
    console.log('drag me');
    Card.update({id: cardId},{card: {status_id: status}}, function(){
        alert('Hi ')
        $location.path('/cards');
    }, function(error) {
        console.log(error)
    });
  };

$scope.handleDrop = function(){
  console.log('drop here data');
}

}]);

angular.module( 'myApp' ).directive('draggable', function() {
  return function(scope, element,attrs) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        console.log(attrs);
        console.log(e.target)
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

angular.module( 'myApp' ).directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element, attrs) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          console.log(attrs)
          console.log(e.target)
          var handleDrop = scope.drop()
          handleDrop()
          // // Stops some browsers from redirecting.
          // if (e.stopPropagation) e.stopPropagation();
          
          // this.classList.remove('over');
          
          // var binId = this.id;
          // var item = document.getElementById(e.dataTransfer.getData('Text'));
          // this.appendChild(item);
          // // call the passed drop function
          // scope.$apply(function(scope) {
          //   var fn = scope.drop();
          //   if ('undefined' !== typeof fn) {            
          //     fn(item.id, binId);
          //   }
          // });
          
          // return false;
        },
        false
      );
    }
  }
});