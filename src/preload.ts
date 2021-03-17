const { remote, app } = require("electron");
const {
    getCurrenWindow,
    openMenu,
    minimizeWindow,
    closeWindow
} = require("./menu-functions.js");

app.addEventListener("DOMContentLoaded", () => {
    app.getCurrentWindow = getCurrenWindow;
    app.openMenu = openMenu;
    app.minimizeWindow = minimizeWindow;
    app.closeWindow = closeWindow;
});