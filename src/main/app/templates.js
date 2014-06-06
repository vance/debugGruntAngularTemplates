angular.module('SomePublicApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/main/app/components/nav/navigation.html',
    "<div class=\"header-container\" ng-controller=\"NavController as navCtrl\" ng-hide=\"navCtrl.hide\">\r" +
    "\n" +
    "    <nav class=\"cf\">\r" +
    "\n" +
    "        <div class=\"fl\">\r" +
    "\n" +
    "            <ul>\r" +
    "\n" +
    "                <li class=\"nav-button nav-dashboard fl{{navCtrl.navClass('product-search')}}\">\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"navCtrl.goToSearch()\">Dashboard</a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "                <li class=\"nav-button nav-error-page fl{{navCtrl.navClass('error')}}\">\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"navCtrl.goToError()\">Error Page</a>\r" +
    "\n" +
    "                </li>          \r" +
    "\n" +
    "                <li class=\"nav-button nav-hide-nav fl\">\r" +
    "\n" +
    "                    <a href=\"javascript:void(0);\" ng-click=\"navCtrl.hideNav()\">Kill Nav Header</a>\r" +
    "\n" +
    "                </li>                       \r" +
    "\n" +
    "                <li class=\"nav-button last-divide fl\">\r" +
    "\n" +
    "                    <!-- used for last divider -->\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </nav>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/main/app/components/simpleProductList/simple-product-list.html',
    "<div ng-show=\"products.length\">\r" +
    "\n" +
    "    <ul ng-repeat=\"product in prodocts\">\r" +
    "\n" +
    "        <li></li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/main/app/components/widgetView/WidgetList.tpl.html',
    "<div ng-controller=\"WidgetController as widgetCtrl\" >\r" +
    "\n" +
    "    <h3><i>The Widget List on {{widgetCtrl.controllerInstanceName}}:</i></h3>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <ao-show-all-widgets></ao-show-all-widgets>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-show=\"widgetCtrl._widgets.length\">\r" +
    "\n" +
    "        <ul ng-repeat=\"widget in widgetCtrl._widgets\">\r" +
    "\n" +
    "            <li><a href=\"\" ng-click=\"widgetCtrl.getWidgetById(widget.id)\">{{ widget.name}}</li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/main/app/modals/debugger-modal/debugger.html',
    "<div class=\"debugger\" ng-controller=\"DebuggerController as DebugCtrl\">\r" +
    "\n" +
    "  <div class=\"overlay-header\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <h2>DEBUGGER</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"debugger-nav\">\r" +
    "\n" +
    "      <a class=\"nav-tracings active\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.showTracingPane()\">TRACING</a>\r" +
    "\n" +
    "      <a class=\"nav-timings\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.showTimingsPane()\">TIMINGS</a>\r" +
    "\n" +
    "      <a class=\"nav-graphs\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.showGraphsPane()\">GRAPHS</a>\r" +
    "\n" +
    "      <a class=\"nav-data\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.showDataPane()\">DATA</a>\r" +
    "\n" +
    "      <a class=\"nav-tools\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.showToolsPane()\">TOOLS</a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"tracings pane\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-repeat=\"trace in DebugCtrl.tracings\">\r" +
    "\n" +
    "          <strong>{{ $index+1 }} &nbsp; {{ trace.source }}</strong>: {{ trace.action }}\r" +
    "\n" +
    "          <span class=\"data\" ng-show=\"trace.data && trace.data.length\">\r" +
    "\n" +
    "            &lt;{{ trace.data }}&gt;\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"timings pane hidden\">\r" +
    "\n" +
    "    <table>\r" +
    "\n" +
    "      <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "          <td>Action</td>\r" +
    "\n" +
    "          <td>Last Duration</td>\r" +
    "\n" +
    "          <td>Highest</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "      </thead>\r" +
    "\n" +
    "      <tbody>\r" +
    "\n" +
    "          <tr ng-repeat=\"timing in DebugCtrl.timings\">\r" +
    "\n" +
    "            <td class=\"id\">{{ timing.id }}</td>\r" +
    "\n" +
    "            <td class=\"diff {{ timing.lastTimeDiff > 1000 ? 'flag' : '' }}\">\r" +
    "\n" +
    "              {{ timing.lastTimeDiff }}ms\r" +
    "\n" +
    "            </td>\r" +
    "\n" +
    "            <td class=\"max {{ timing.lastTimeDiff > 1000 ? 'flag' : '' }}\">\r" +
    "\n" +
    "              {{ timing.highest }}ms\r" +
    "\n" +
    "            </td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "      </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"graphs pane hidden\">\r" +
    "\n" +
    "    <h3>Page Performance Breakdown</h3>\r" +
    "\n" +
    "    <br/>\r" +
    "\n" +
    "    <div class=\"page-breakdown-graph\">\r" +
    "\n" +
    "      \r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"data pane hidden\">\r" +
    "\n" +
    "    <h3><b>Selected Workspace</b></h3>\r" +
    "\n" +
    "    <div class=\"selected-workspace pretty-json\"></div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"tools pane hidden\">\r" +
    "\n" +
    "    <p>\r" +
    "\n" +
    "      <a class=\"enable-timings\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.enableTiming()\">Enable Debug Timing</a>\r" +
    "\n" +
    "      <br/>\r" +
    "\n" +
    "      <a class=\"clear-timings\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.clearTimings()\">Clear Timings</a>\r" +
    "\n" +
    "      <br/>\r" +
    "\n" +
    "      <a class=\"clear-tracings\" href=\"javascript:void(0);\" ng-click=\"DebugCtrl.clearTracings()\">Clear Tracings</a>\r" +
    "\n" +
    "    </p>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/main/app/pages/error.html',
    "<p>Page does not exist... or does it?</p>"
  );


  $templateCache.put('src/main/app/pages/product-search/product-search-page.html',
    "<h1>You are on the landing page.</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<section>\r" +
    "\n" +
    "    <widget-list></widget-list>\r" +
    "\n" +
    "</section>\r" +
    "\n"
  );

}]);
