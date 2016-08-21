'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the minovateApp
 */
app
  .factory('TrackingData', function($http, $q) {

    return {
        get_tracking_data: function() {
          return $http.post($scope.main.settings.apiUrl+'/api-token-refresh/', token).success(function (data) {
            if (data.token) {
              $http({
                method: 'POST',
                url: $scope.main.settings.apiUrl+'/get_custom_ranged_tracking_source_data/',
                data: {"tracking_source_id": $scope.source.show.source},
                headers: {"Content-Type": "application/json"}  // set the headers so angular passing info as form data (not request payload)
              }).success(function (data) {
                return data;
              });
            }
          });
        }
      }

  })
  .controller('DashboardCtrl', function($scope, $http, $window, $state, $timeout, oauth, analytics){
    $scope.page = {
      title: 'Dashboard',
      subtitle: 'Place subtitle here...'
    };

    $scope.getUsers = function(){
      $scope.data=[];
      var url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=3&callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data){
          $scope.data=data;
      });
    };

    $scope.getUsers();

    var user_data = JSON.parse($window.localStorage.getItem('userdata'));
    $scope.username = user_data['username'];
    console.log($scope.username);

    //if($event && $event.target && $event.target.href) {
    //  $event.target.click();
    //  $event.preventDefault();
    //  $event.stopPropagation();
    //  return;
    //}

    $scope.abcdefg = function() {
        console.log("Hello MR Chitrank");
    };

    $scope.logoutUser = function() {
      console.log("Inside");
      var authData = $scope.user;
      user.logout($scope.main.settings.apiUrl+'/api/v1/auth/logout/', authData, token).success(function(data){
        $state.go("core.login");
      }).error(function(data){

      });
    };


    var user_local_data = JSON.parse($window.localStorage.getItem('userdata'));
    var token_data = JSON.parse($window.localStorage.getItem('tokendata'));
    var refresh_token = token_data['refresh_token'];
    var token = token_data['token'];
    console.log(token);

    //$http.post($scope.main.settings.apiUrl+'/api-token-refresh/', token ).success(function(data) {
    //  if (data.token) {
    //    $http({
    //      method: 'GET',
    //      url: $scope.main.settings.apiUrl+'/api/v1/tracking_source/',
    //      headers: {"Content-Type": "application/json", "Authorization": "JWT " + data.token}  // set the headers so angular passing info as form data (not request payload)
    //    }).success(function (data) {
    //      $scope.source_list = data;
    //      console.log($scope.source_list);
    //    });
    //  }
    //});



    analytics.list_tracking_sources($scope.main.settings.apiUrl+'/api/v1/tracking_source/', token).success(function(response){
      $scope.source_list = response.data;
      console.log($scope.source_list);
    }).error(function(data){
      console.log(data);
      var refreshTokenData = {
        grant_type: 'refresh_token',
        client_id: $scope.main.settings.client_id,
        client_secret: $scope.main.settings.client_secret,
        refresh_token: refresh_token
      };
      oauth.create_or_refresh_token($scope.main.settings.apiUrl+'/o/token/', refreshTokenData).success(function(data){
        token = data.access_token;
        refresh_token = data.refresh_token;
        var tokendata = {"token": token , "refresh_token": data.refresh_token};
        console.log(data);
        $window.localStorage.setItem('tokendata', JSON.stringify(tokendata));
        analytics.list_tracking_sources($scope.main.settings.apiUrl+'/api/v1/tracking_source/', token).success(function(response){
          $scope.source_list = response.data;
        }).error(function(data){

        });
      })
    });




    $scope.filterBySource = function(tracking_id) {
      var tracking_source_data = {'tracking_source_id': tracking_id};
      console.log($scope.source.show.source);
      var refreshTokenData = {
        grant_type: 'refresh_token',
        client_id: $scope.main.settings.client_id,
        client_secret: $scope.main.settings.client_secret,
        refresh_token: refresh_token
      };
      oauth.create_or_refresh_token($scope.main.settings.apiUrl+'/o/token/', refreshTokenData).success(function(data){
        var token = data.access_token;
        var tokendata = {"token": token , "refresh_token": data.refresh_token};
        $window.localStorage.setItem('tokendata', JSON.stringify(tokendata));
        analytics.search_tracking_source($scope.main.settings.apiUrl+'/api/v1/tracking_data/?tracking_source_id='+$scope.source.show.source, token).success(function(response){
          $scope.tracking_data = response.data;
          console.log($scope.tracking_data);
          var chrome = 0;
          var firefox = 0;
          console.log($scope.tracking_data);
          $scope.source.views = $scope.tracking_data.page_views;
          var element;
          for (element in $scope.tracking_data.web_browser) {
            console.log(element, $scope.tracking_data.web_browser);
            if ($scope.tracking_data.web_browser[element] === "1"){
              chrome = chrome + 1;
            }
            else if ($scope.tracking_data.web_browser[element] === "2")
            {
              firefox = firefox + 1;
            }
          }
          console.log(chrome, firefox);
          $scope.donutData = [
            {label: 'Chrome', value: chrome, color: '#00a3d8'},
            {label: 'Safari', value: 0, color: '#2fbbe8'},
            {label: 'Firefox', value: firefox, color: '#72cae7'},
            {label: 'Opera', value: 0, color: '#d9544f'},
            {label: 'Internet Explorer', value: 0, color: '#ffc100'},
            {label: 'Other', value: 0, color: '#1693A5'}
          ];

          $scope.oneAtATime = true;

          $scope.status = {
            isFirstOpen: true,
            tab1: {
              open: true
            },
            tab2: {
              open: false
            },
            tab3: {
              open: false
            }
          };
        }).error(function(data){

        });

      }).error(function(data){

      });

      //$http.post($scope.main.settings.apiUrl+'/api-token-refresh/', token ).success(function(data) {
      //  if (data.token) {
      //    $http({
      //      method: 'GET',
      //      url: $scope.main.settings.apiUrl+'/api/v1/tracking_data/?tracking_source_id='+$scope.source.show.source,
      //      headers: {"Content-Type": "application/json", "Authorization": "JWT "+data.token}  // set the headers so angular passing info as form data (not request payload)
      //    }).success(function (data) {
      //      $scope.tracking_data = data;
      //      console.log($scope.tracking_data);
      //      var chrome = 0;
      //      var firefox = 0;
      //      console.log($scope.tracking_data);
      //      $scope.source.views = $scope.tracking_data.page_views;
      //      var element;
      //      for (element in $scope.tracking_data.web_browser) {
      //        console.log(element, $scope.tracking_data.web_browser);
      //        if ($scope.tracking_data.web_browser[element] === "1"){
      //          chrome = chrome + 1;
      //        }
      //        else if ($scope.tracking_data.web_browser[element] === "2")
      //        {
      //          firefox = firefox + 1;
      //        }
      //      }
      //      console.log(chrome, firefox);
      //      $scope.donutData = [
      //        {label: 'Chrome', value: chrome, color: '#00a3d8'},
      //        {label: 'Safari', value: 0, color: '#2fbbe8'},
      //        {label: 'Firefox', value: firefox, color: '#72cae7'},
      //        {label: 'Opera', value: 0, color: '#d9544f'},
      //        {label: 'Internet Explorer', value: 0, color: '#ffc100'},
      //        {label: 'Other', value: 0, color: '#1693A5'}
      //      ];
      //
      //      $scope.oneAtATime = true;
      //
      //      $scope.status = {
      //        isFirstOpen: true,
      //        tab1: {
      //          open: true
      //        },
      //        tab2: {
      //          open: false
      //        },
      //        tab3: {
      //          open: false
      //        }
      //      };
      //    });
      //  }
      //});

    };
  })


  .controller('StatisticsChartCtrl', function ($scope) {

    $scope.dataset = [{
      data: [[1,15],[2,40],[3,35],[4,39],[5,42],[6,50],[7,46],[8,49],[9,59],[10,60],[11,58],[12,74]],
      label: 'Unique Visits',
      points: {
        show: true,
        radius: 4
      },
      splines: {
        show: true,
        tension: 0.45,
        lineWidth: 4,
        fill: 0
      }
    }, {
      data: [[1,50],[2,80],[3,90],[4,85],[5,99],[6,125],[7,114],[8,96],[9,130],[10,145],[11,139],[12,160]],
      label: 'Page Views',
      bars: {
        show: true,
        barWidth: 0.6,
        lineWidth: 0,
        fillColor: { colors: [{ opacity: 0.3 }, { opacity: 0.8}] }
      }
    }];

    $scope.options = {
      colors: ['#e05d6f','#61c8b8'],
      series: {
        shadowSize: 0
      },
      legend: {
        backgroundOpacity: 0,
        margin: -7,
        position: 'ne',
        noColumns: 2
      },
      xaxis: {
        tickLength: 0,
        font: {
          color: '#fff'
        },
        position: 'bottom',
        ticks: [
          [ 1, 'JAN' ], [ 2, 'FEB' ], [ 3, 'MAR' ], [ 4, 'APR' ], [ 5, 'MAY' ], [ 6, 'JUN' ], [ 7, 'JUL' ], [ 8, 'AUG' ], [ 9, 'SEP' ], [ 10, 'OCT' ], [ 11, 'NOV' ], [ 12, 'DEC' ]
        ]
      },
      yaxis: {
        tickLength: 0,
        font: {
          color: '#fff'
        }
      },
      grid: {
        borderWidth: {
          top: 0,
          right: 0,
          bottom: 1,
          left: 1
        },
        borderColor: 'rgba(255,255,255,.3)',
        margin:0,
        minBorderMargin:0,
        labelMargin:20,
        hoverable: true,
        clickable: true,
        mouseActiveRadius:6
      },
      tooltip: true,
      tooltipOpts: {
        content: '%s: %y',
        defaultTheme: false,
        shifts: {
          x: 0,
          y: 20
        }
      }
    };
  })

  .controller('ActualStatisticsCtrl',function($scope){
    $scope.easypiechart = {
      percent: 100,
      options: {
        animate: {
          duration: 3000,
          enabled: true
        },
        barColor: '#418bca',
        scaleColor: false,
        lineCap: 'round',
        size: 140,
        lineWidth: 4
      }
    };
    $scope.easypiechart2 = {
      percent: 75,
      options: {
        animate: {
          duration: 3000,
          enabled: true
        },
        barColor: '#e05d6f',
        scaleColor: false,
        lineCap: 'round',
        size: 140,
        lineWidth: 4
      }
    };
    $scope.easypiechart3 = {
      percent: 46,
      options: {
        animate: {
          duration: 3000,
          enabled: true
        },
        barColor: '#16a085',
        scaleColor: false,
        lineCap: 'round',
        size: 140,
        lineWidth: 4
      }
    };
  })

  .controller('BrowseUsageCtrl', function ($scope, TrackingData) {

    $scope.donutData = [
      {label: 'Chrome', value: 0, color: '#00a3d8'},
      {label: 'Safari', value: 20, color: '#2fbbe8'},
      {label: 'Firefox', value: 0, color: '#72cae7'},
      {label: 'Opera', value: 5, color: '#d9544f'},
      {label: 'Internet Explorer', value: 10, color: '#ffc100'},
      {label: 'Other', value: 25, color: '#1693A5'}
    ];

    $scope.oneAtATime = true;

    $scope.status = {
      isFirstOpen: true,
      tab1: {
        open: true
      },
      tab2: {
        open: false
      },
      tab3: {
        open: false
      }
    };

    //if ($scope.source.show.source !== none) {
    //  TrackingData.get_tracking_data($scope.source.show.source).then(function(data) {
    //    $scope.browser.chrome = 0;
    //    $scope.browser.firefox = 0;
    //    console.log(data);
    //    //var element;
    //    //for (element in $scope.tracking_data.web_browser) {
    //    //  if (element === 1){
    //    //    $scope.browser.chrome = $scope.browser.chrome + element;
    //    //  }
    //    //  else if (element === 2)
    //    //  {
    //    //    $scope.browser.firefox = $scope.browser.firefox + element;
    //    //  }
    //    //}
    //    $scope.donutData = [
    //      {label: 'Chrome', value: 0, color: '#00a3d8'},
    //      {label: 'Safari', value: 20, color: '#2fbbe8'},
    //      {label: 'Firefox', value: 0, color: '#72cae7'},
    //      {label: 'Opera', value: 5, color: '#d9544f'},
    //      {label: 'Internet Explorer', value: 10, color: '#ffc100'},
    //      {label: 'Other', value: 25, color: '#1693A5'}
    //    ];
    //
    //    $scope.oneAtATime = true;
    //
    //    $scope.status = {
    //      isFirstOpen: true,
    //      tab1: {
    //        open: true
    //      },
    //      tab2: {
    //        open: false
    //      },
    //      tab3: {
    //        open: false
    //      }
    //    };
    //
    //  });
    //}



  })

  .controller('RealtimeLoadCtrl', function($scope, $interval){

    $scope.options1 = {
      renderer: 'area',
      height: 133
    };

    $scope.seriesData = [ [], []];
    var random = new Rickshaw.Fixtures.RandomData(50);

    for (var i = 0; i < 50; i++) {
      random.addData($scope.seriesData);
    }

    var updateInterval = 800;

    $interval(function() {
      random.removeData($scope.seriesData);
      random.addData($scope.seriesData);
    }, updateInterval);

    $scope.series1 = [{
      name: 'Series 1',
      color: 'steelblue',
      data: $scope.seriesData[0]
    }, {
      name: 'Series 2',
      color: 'lightblue',
      data: $scope.seriesData[1]
    }];

    $scope.features1 = {
      hover: {
        xFormatter: function(x) {
          return new Date(x * 1000).toUTCString();
        },
        yFormatter: function(y) {
          return Math.floor(y) + '%';
        }
      }
    };
  })

  .controller('ProjectProgressCtrl', function($scope, DTOptionsBuilder, DTColumnDefBuilder){
    $scope.projects = [{
      title: 'Graphic layout for client',
      priority: {
        value: 1,
        title: 'High Priority'
      },
      status: 42,
      chart: {
        data: [1,3,2,3,5,6,8,5,9,8],
        color: '#cd97eb'
      }
    },{
      title: 'Make website responsive',
      priority: {
        value: 3,
        title: 'Low Priority'
      },
      status: 89,
      chart: {
        data: [2,5,3,4,6,5,1,8,9,10],
        color: '#a2d200'
      }
    },{
      title: 'Clean html/css/js code',
      priority: {
        value: 1,
        title: 'High Priority'
      },
      status: 23,
      chart: {
        data: [5,6,8,2,1,6,8,4,3,5],
        color: '#ffc100'
      }
    },{
      title: 'Database optimization',
      priority: {
        value: 2,
        title: 'Normal Priority'
      },
      status: 56,
      chart: {
        data: [2,9,8,7,5,9,2,3,4,2],
        color: '#16a085'
      }
    },{
      title: 'Database migration',
      priority: {
        value: 3,
        title: 'Low Priority'
      },
      status: 48,
      chart: {
        data: [3,5,6,2,8,9,5,4,3,2],
        color: '#1693A5'
      }
    },{
      title: 'Email server backup',
      priority: {
        value: 2,
        title: 'Normal Priority'
      },
      status: 10,
      chart: {
        data: [7,8,6,4,3,5,8,9,10,7],
        color: '#3f4e62'
      }
    }];

    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap();
    $scope.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3),
      DTColumnDefBuilder.newColumnDef(4).notSortable()
    ];
  });

