angular.module('secretlib', [])
  .controller('mainCtrl', function($scope, $http) {

    $scope.limit = 8;
    $scope.selectedItem = {};
    $scope.tags = ["javascript", "java", "programming", "management",
      "finance", "perl", "ruby", "architecture", "microservice",
      "design", "web", "frontend", "c", "c++", "database",
      "sql", "nosql", "object oriented", "training", "development"
    ];

    $scope.languanges = ["english", "chinese"];
    $scope.items = [];
    
    $http.get('/getHistoricalOrder').then(function(success){
        $scope.items = success.data;
    })

    $scope.randomize = function(language) {

      if (language == "english") {
        $scope.base = ["Soup", "Dry", "Stir Fried", "Special"];
      } else {
        $scope.base = ["汤", "干", "炒", "特"];
      }

      var noodle = {price:0,sauce:"",noodle:""};
      noodle.base = getRandomItem($scope.base);

      switch (noodle.base) {
        case "Soup":
          $scope.toppings = ["Pork Chop", "Wanton", "Beef Flank", "Satay Beef",
            "Sliced Fish Roll", "Luncheon Meat w/Egg",
            "Shredded Pork w/ Preserved Veg", "Beef Shin"
          ];
          $scope.noodles = ["Egg Noodle", "Udon", "Vermicelli",
            "Rice Stick", "Instant Noodle",
            "Thick Vermicelli"
          ];
          noodle.price = 5.0;
          break;

        case "汤":
          $scope.toppings = ["猪扒", "云吞", "牛腩", "沙爹牛肉", "榨菜肉丝",
            "餐肉蛋", "鱼片", "牛腱"
          ];
          $scope.noodles = ["面", "米粉", "河粉", "公仔面", "米线", "乌冬"];
          noodle.price = 5.0;
          break;

        case "Dry":
          $scope.toppings = ["Pork Chop", "Wanton", "Beef Flank", "Satay Beef",
            "Sliced Fish Roll", "Luncheon Meat w/Egg",
            "Shredded Pork w/ Preserved Veg", "Beef Shin"
          ];
          $scope.noodles = ["Egg Noodle", "Udon", "Vermicelli",
            "Rice Stick", "Instant Noodle",
            "Thick Vermicelli"
          ];
           noodle.price = 5.8;
          break;
        case "干":
          $scope.toppings = ["猪扒", "云吞", "牛腩", "沙爹牛肉", "榨菜肉丝",
            "餐肉蛋", "鱼片", "牛腱"
          ];
          $scope.noodles = ["面", "米粉", "河粉", "公仔面", "米线"];
          noodle.price = 5.8;
          break;

        case "Stir Fried":
          $scope.toppings = ["Pork Chop", "King Prawn", "Beef Flank", "Sliced Beef",
            "Sliced Fish Roll", "Shredded Pork w/ Preserved Veg"
          ];
          $scope.noodles = ["Udon", "Vermicelli",
            "Rice Stick", "Instant Noodle",
            "Thick Vermicelli"
          ];
          noodle.price = 6.9;
          $scope.sauce = ["Black Pepper", "Satay"];
          break;

        case "炒":
          $scope.toppings = ["大虾", "牛肉", "牛腩", "榨菜肉丝", "鱼片", "猪扒"];
          $scope.noodles = ["乌冬", "米粉", "河粉", "公仔面", "米线"];
          noodle.price = 6.9;
          $scope.sauce = ["沙爹", "黑椒"];
          break;

        case "Special":
          $scope.choice = [{
            noodle: "Shredded Pork Stir Fried Udon",
            price: 6.1
          }, {
            noodle: "Beef Stir Fried Rice Stick",
            price: 6.9
          }, {
            noodle: "King Prawn Stir Fried Vermicelli",
            price: 6.9
          }, {
            noodle: "Pork Chop Stir Fried Udon",
            price: 6.9
          }, {
            noodle: "Hwa Dan hor",
            price: 6.9
          }];

          $scope.items.push(getRandomItem($scope.choice));
          break;

        case "特":
          $scope.choice = [
              {noodle:"上海粗炒",price:6.1}, 
              {noodle:"干炒牛河",price:6.9},
              {noodle: "猪扒粗炒",price:6.9}, 
              {noodle:"大虾炒米粉",price:6.9}, 
              {noodle:"滑蛋河",price:6.9}];
              
          $scope.items.push(getRandomItem($scope.choice));
          break;
      }

      if (noodle.base != "Special" && noodle.base != "特") {
        noodle.topping = getRandomItem($scope.toppings);
          
        if (noodle.base == "Dry" || noodle.base == "干"){
             noodle.noodle　= noodle.sauce + " ";
          }else{
             noodle.noodle = "";
          }
          
        noodle.noodle += noodle.topping + " " + noodle.base + " " + 
          getRandomItem($scope.noodles);
          
          console.log(language);
          if(language != "english"){
              console.log(noodle.noodle);
              noodle.noodle = noodle.noodle.replace(/ /gi,'');
              console.log(noodle.noodle);
              console.log(noodle)
          }
          
        $scope.items.push(noodle);
          
          $http.post('saveOrder',noodle).then(function(success){
              
          })
      }
      console.log($scope.items);
    }

    var goLarge = function(noodle) {
        if(noodle.base != "Stir Fried" && noodle.base != "炒"){
          noodle.price += 1;
          noodle.size = large;
        }else{
          noodle.price += 1.2;
          noodle.size = large;
        }
    }

    var checkIfDry = function(noodle) {
      if (noodle.size != "large" && (noodle.base == "Dry" || noodle.base == "干"))
          noodle.price += 0.8;
    }

    var getRandomItem = function(item) {
      var itemLength = item.length;
      var randomPosition = Math.ceil(Math.random() * itemLength) - 1;
      return item[randomPosition];
    }

    var limitStep = 8;
    $scope.incrementLimit = function() {
      $scope.limit += limitStep;
    };

    angular.element('.cards.infinite')
      .visibility({
        once: false,
        // update size when new content loads
        observeChanges: true,
        // load content on bottom edge visible
        onBottomVisible: function() {
          // loads a max of 5 times
          $('.loader').show();
          setTimeout(function() {
            $('.loader').hide();
            $scope.incrementLimit();
            $scope.$digest();

            //reinitialise semantic UI for newly added components
            $('.ui.rating')
              .rating({
                initialRating: 0,
                maxRating: 5
              });
            $('.cards .image').dimmer({
              on: 'hover'
            })

          }, 500)
        }
      });

  });
