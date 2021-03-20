const { remote, app } = require("electron");
const {
    getCurrenWindow,
    openMenu,
    minimizeWindow,
    closeWindow
} = require("./menu-functions.js");
const Store = require("./store.js");
const path = require("path");
const fs = require("fs");

console.log("data: " + JSON.parse(fs.readFileSync(path.join(remote.app.getPath("userData"), "user-preferences" + ".json"))))

if(JSON.parse(fs.readFileSync(path.join(remote.app.getPath("userData"), "user-preferences" + ".json"))) === ""){
    console.log("New config file")
    new Store({
        // We'll call our data file 'user-preferences'
        configName: 'user-preferences',
        defaults: {
          appData: { theme: "default", checked: "default" }
        }
      });
}

app.addEventListener("DOMContentLoaded", () => {
    app.getCurrentWindow = getCurrenWindow;
    app.openMenu = openMenu;
    app.minimizeWindow = minimizeWindow;
    app.closeWindow = closeWindow;
});