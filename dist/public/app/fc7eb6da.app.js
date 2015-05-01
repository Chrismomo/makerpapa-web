"use strict";angular.module("makerPaPaApp",["ngCookies","ngResource","ngSanitize","ngRoute","btford.socket-io","ui.bootstrap"]).config(["$routeProvider","$locationProvider",function(a,b){a.otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("makerPaPaApp").controller("ClassCtrl",["$scope","ClassService","$modal","$timeout","$log","$filter","socket",function(a,b,c,d,e,f,g){function h(){b.getAll().promise.then(function(b){a.data=b,e.debug(a.data)},function(a){alert("get portal app error")})}h()}]),angular.module("makerPaPaApp").controller("CommunityCtrl",["$scope","CommunityService","$modal","$timeout","$log","$filter","socket",function(a,b,c,d,e,f,g){function h(){b.getAll().promise.then(function(b){a.items=b,e.debug(a.items)},function(a){alert("get portal app error")})}h(),a.myInterval=5e3;var i=a.slides=[];a.addSlide=function(){var a=1200+i.length+1;i.push({image:"http://placekitten.com/"+a+"/300",text:["More","Extra","Lots of","Surplus"][i.length%4]+" "+["Cats","Kittys","Felines","Cutes"][i.length%4]})};for(var j=0;4>j;j++)a.addSlide()}]),angular.module("makerPaPaApp").controller("ActivityCtrl",["$scope","ActivityService","$modal","$timeout","$log","$filter","socket",function(a,b,c,d,e,f,g){function h(){b.getAll().promise.then(function(b){a.data=b,e.debug(a.data)},function(a){alert("get portal app error")})}h()}]),angular.module("makerPaPaApp").controller("LoginCtrl",["$scope","$modal","$timeout","$log","$filter","socket",function(a,b,c,d,e,f){function g(){}g()}]),angular.module("makerPaPaApp").controller("PortalCenterCtrl",["$scope","$modal","$timeout","$log","$filter","socket",function(a,b,c,d,e,f){}]),angular.module("makerPaPaApp").controller("MainCtrl",["$scope","$http","socket",function(a,b,c){a.awesomeThings=[],b.get("/api/things").success(function(b){a.awesomeThings=b,c.syncUpdates("thing",a.awesomeThings)}),a.addThing=function(){""!==a.newThing&&(b.post("/api/things",{name:a.newThing}),a.newThing="")},a.deleteThing=function(a){b["delete"]("/api/things/"+a._id)},a.$on("$destroy",function(){c.unsyncUpdates("thing")})}]),angular.module("makerPaPaApp").config(["$routeProvider",function(a){a.when("/class",{templateUrl:"app/views/1.class.html",controller:"ClassCtrl"}).when("/community",{templateUrl:"app/views/2.community.html",controller:"CommunityCtrl"}).when("/activity",{templateUrl:"app/views/3.activity.html",controller:"ActivityCtrl"}).when("/login",{templateUrl:"app/views/4.login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/class"})}]),angular.module("makerPaPaApp").service("ClassService",["ApiBaseService","$q",function(a,b){function c(a,b){b.resolve(a)}function d(a,b){b.reject(a)}var e="/api/papaclasss",f=a;this.getAll=function(){var a=b.defer();return this.get_X_Simple_No_Cache(e).promise.then(function(b){c(b,a)},function(b){d(b,a)}),a},this.get_X_Simple_No_Cache=function(a){var b=f.httpGet(a);return b}}]),angular.module("makerPaPaApp").service("CommunityService",["ApiBaseService","$q","$http","Apihostservice",function(a,b,c,d){function e(a,b){b.resolve(a)}function f(a,b){b.reject(a)}var g="/api/communitys",h=a;this.getAll=function(){var a=b.defer();return this.get_X_Simple_No_Cache(g).promise.then(function(b){e(b,a)},function(b){f(b,a)}),a},this.get_X_Simple_No_Cache=function(a){var b=h.httpGet(a);return b}}]),angular.module("makerPaPaApp").service("ActivityService",["ApiBaseService","$q","$http","Apihostservice",function(a,b,c,d){function e(a,b){b.resolve(a)}function f(a,b){b.reject(a)}var g="/api/activitys",h=a;this.getAll=function(){var a=b.defer();return this.get_X_Simple_No_Cache(g).promise.then(function(b){e(b,a)},function(b){f(b,a)}),a},this.get_X_Simple_No_Cache=function(a){var b=h.httpGet(a);return b}}]),angular.module("makerPaPaApp").service("ApiBaseService",["Apihostservice","$q","$http",function(a,b,c){function d(a,b){b.resolve(a)}function e(a,b){b.reject(a)}this.httpGet=function(f){var g=b.defer();return a.getHost(function(){c({method:"GET",url:a.getHost()+f}).success(function(a,b,c,e){d(a,g)}).error(function(a,b,c,d){e(a,g)})}),g}}]),angular.module("makerPaPaApp").service("Apihostservice",["$http",function(a){var b=null;this.getHost=function(c){return null==b?(a.get("/api/apihost").success(function(a,d,e,f){b=a,c()}).error(function(a,d,e,f){b=".",c()}),b):(null!=c&&c(),b)}}]),angular.module("makerPaPaApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("makerPaPaApp").controller("NavbarCtrl",["$scope","$location",function(a,b){a.menu=[{title:"课堂",link:"/class"},{title:"社区",link:"/community"},{title:"活动",link:"/activity"},{title:"登陆",link:"/login"}],a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("makerPaPaApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]),angular.module("makerPaPaApp").run(["$templateCache",function(a){a.put("app/main/main.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><header class=hero-unit id=banner><div class=container><h1>\'Allo, \'Allo!</h1><p class=lead>Kick-start your next web app with Angular Fullstack</p><img src=assets/images/d535427a.yeoman.png alt="I\'m Yeoman"></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Features:</h1><ul class="nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6" ng-repeat="thing in awesomeThings"><li><a href=# tooltip={{thing.info}}>{{thing.name}}<button type=button class=close ng-click=deleteThing(thing)>&times;</button></a></li></ul></div></div><form class=thing-form><label>Syncs in realtime across clients</label><p class=input-group><input class=form-control placeholder="Add a new thing here." ng-model=newThing> <span class=input-group-btn><button type=submit class="btn btn-primary" ng-click=addThing()>Add New</button></span></p></form></div><footer class=footer><div class=container><p>Angular Fullstack v2.0.13 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div></footer>'),a.put("app/views/1.class.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><header class="big-ban pictureBackground big-ban-transparent banner"><div class=container><h1>Maker Papa!</h1><p class=lead>If you feel high, you then follow me papa together!</p><img src=assets/images/e6e2c031.papa.gif alt=papa></div></header><div class="big-ban big-ban-1 banner"><div class=container><h1>\'Pa, \'Pa!</h1><p class=lead>papapapapapapapap......</p><img src=assets/images/d6f40dff.papa.jpeg alt=papa></div></div><div class="big-ban big-ban-2 banner"><div class=container><h1>\'Pa, \'Pa!</h1><p class=lead>papapapapapapapap......</p><img src=assets/images/c9605681.papa.jpg alt=papa></div></div><div class="big-ban pictureBackground big-ban-transparent banner"><div class=container><h1>\'Pa, \'Pa!</h1><p class=lead>papapapapapapapap......</p><img src=assets/images/0d1c68a4.papa1.jpg alt=papa></div></div><div class="big-ban big-ban-3 banner"><div class=container><h1>\'Pa, \'Pa!</h1><p class=lead>papapapapapapapap......</p></div></div><div class="big-ban big-ban-4 banner"><div class=container><h1>\'Pa, \'Pa!</h1><p class=lead>papapapapapapapap......</p></div></div><div class="big-ban big-ban-5 banner"><div class=container><h1>\'Pa, \'Pa!</h1><p class=lead>papapapapapapapap......</p></div></div><div class="big-ban big-ban-6 banner"><div class=container><h1>\'Pa, \'Pa!</h1><p class=lead>papapapapapapapap......</p></div></div><footer class=footer><p><span class="glyphicon glyphicon-heart"></span> Beijing maker papapa</p></footer><style>.pictureBackground {\n    display: table;\n    height: 70%;\n    width: 100%;\n    min-height: 70%;\n    position: relative;\n    background: url(../assets/images/b1750b2d.desk-long.jpg) no-repeat center center fixed;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n    z-index: 99999;\n    background-color: black;\n}</style>'),a.put("app/views/2.community.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container>社区<div style="height: 305px"><carousel interval=myInterval><slide ng-repeat="slide in slides" active=slide.active><img ng-src={{slide.image}} style=margin:auto><div class=carousel-caption><h4>Slide {{$index}}</h4><p>{{slide.text}}</p><a href=#action class="glyphicon glyphicon-chevron-down"><i class=icon-arrow-down></i></a></div></slide></carousel></div><div ng-repeat="item in items"><div class="container contenta"><div><blockquote><h2>{{item.title}}</h2></blockquote><hr></div><img src={{item.image}} height=100 width=100><div ng-bind-html=item.content.extended></div></div></div></div>'),a.put("app/views/3.activity.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container>活动</div>"),a.put("app/views/4.login.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container>登陆</div>"),a.put("app/views/PortalCenter.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div ng-repeat="app in data" class={{app.cssClass}}><h1>{{app.displayName}}</h1><ul><div ng-repeat="ch in app.channels"><form ng-submit="sendMessage(app, ch)" method=post><div class=row><div class=col-lg-2><div class=input-group><span class=input-group-btn><button class="btn btn-default btn-danger" type=button>{{ch.displayName}}</button></span></div></div><div class=col-lg-5><div class=input-group><span class=input-group-addon id=sizing-addon1>Alert:</span> <input ng-model=ch.alert class=form-control placeholder=alert aria-describedby=sizing-addon1></div></div><div class=col-lg-5><div class=input-group><span class=input-group-addon id=sizing-addon1>Message:</span> <input ng-model=ch.message class=form-control placeholder=message aria-describedby=sizing-addon1> <span class=input-group-btn><button class="btn btn-default btn-danger submit" type=submit>Send!</button></span></div></div></div></form><br></div></ul></div></div>'),a.put("app/views/temper.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div id=chartdiv_meter></div><div id=chartdiv_lines></div><button type=button class="btn btn-info btn-block" ng-click=switchFixzoomedFn()>{{fixzoomButtonLable}}</button></div>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>maker-pa-pa</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li></ul></div></div></div>')}]);