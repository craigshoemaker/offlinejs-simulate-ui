(function() {
  var load, _ref;

  if (typeof Offline === "undefined" || Offline === null) {
    throw new Error("Offline simulate UI brought in without Offline.js");
  }

  console.info("The offline.simulate.ui.js module is a development-only resource. Make sure to remove offline.simulate.ui.js in production.");

  Offline.options.reconnect = {
    initialDelay: 60
  };

  load = function() {
    var STYLE, TEMPLATE, container, styleElement;
    STYLE = "<style>\n  .offline-simulate-ui {\n    position: fixed;\n    z-index: 100000;\n    left: -4px;\n    top: 45%;\n    border: solid 1px rgba(0, 0, 0, 0.15);\n    -webkit-border-radius: 4px 4px 4px 4px;\n    -moz-border-radius: 4px 4px 4px 4px;\n    -ms-border-radius: 4px 4px 4px 4px;\n    -o-border-radius: 4px 4px 4px 4px;\n    border-radius: 4px 4px 4px 4px;\n    font-family: \"Lucida Grande\", sans-serif;\n    font-size: 12px;\n    padding: 2px;\n    padding-left: 6px;\n    width: 25px;\n    background: #f6f6f6;\n    color: #888888;\n  }\n</style>";
    styleElement = document.createElement("div");
    styleElement.innerHTML = STYLE;
    document.body.appendChild(styleElement);
    TEMPLATE = "<input type=\"checkbox\" id=\"offline-simulate-check\" title=\"Simulate online/offline states\">";
    container = document.createElement("div");
    container.className = "offline-simulate-ui";
    container.innerHTML = TEMPLATE;
    document.body.appendChild(container);
    return document.getElementById("offline-simulate-check").addEventListener("click", function() {
      var _base;
      if ((_base = Offline.options).checks == null) {
        _base.checks = {};
      }
      if (this.checked) {
        Offline.options.checks.active = 'down';
      } else {
        Offline.options.checks.active = 'up';
      }
      return Offline.check();
    });
  };

  if ((_ref = document.readyState) === 'interactive' || _ref === 'complete') {
    load();
  } else {
    document.addEventListener("DOMContentLoaded", load);
  }

}).call(this);
