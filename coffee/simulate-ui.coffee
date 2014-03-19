throw new Error("Offline simulate UI brought in without Offline.js") unless Offline?

console.info "The offline.simulate.ui.js module is a development-only resource. Make sure to remove offline.simulate.ui.js in production."

Offline.options.reconnect = 
    initialDelay: 60

load = ->
  # I wouldn't normally add style rules
  # in a script file, but this saves devs
  # from having to add any extra stylesheets
  # or polluting the main Offline stylesheets.
  STYLE = """
          <style>
            .offline-simulate-ui {
              position: fixed;
              z-index: 100000;
              left: -4px;
              top: 45%;
              border: solid 1px rgba(0, 0, 0, 0.15);
              -webkit-border-radius: 4px 4px 4px 4px;
              -moz-border-radius: 4px 4px 4px 4px;
              -ms-border-radius: 4px 4px 4px 4px;
              -o-border-radius: 4px 4px 4px 4px;
              border-radius: 4px 4px 4px 4px;
              font-family: \"Lucida Grande\", sans-serif;
              font-size: 12px;
              padding: 2px;
              padding-left: 6px;
              width: 25px;
              background: #f6f6f6;
              color: #888888;
            }
          </style>
  """

  styleElement = document.createElement("div")
  styleElement.innerHTML = STYLE
  document.body.appendChild styleElement

  TEMPLATE = "<input type=\"checkbox\" id=\"offline-simulate-check\" title=\"Simulate online/offline states\">"

  container = document.createElement("div")
  container.className = "offline-simulate-ui"
  container.innerHTML = TEMPLATE
  document.body.appendChild container

  document.getElementById("offline-simulate-check").addEventListener "click", ->
    Offline.options.checks ?= {}
    
    if @checked
      Offline.options.checks.active = 'down'
    else
      Offline.options.checks.active = 'up'

    Offline.check()

if document.readyState in ['interactive', 'complete']
  load()
else
  document.addEventListener "DOMContentLoaded", load
