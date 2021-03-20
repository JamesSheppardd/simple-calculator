const {
  openMenu,
  minimizeWindow,
  closeWindow,
} = require("./menu-functions.js")


window.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const closeButton = document.getElementById("close-btn");
  
    menuButton.addEventListener("click", e => {
      // Opens menu at (x,y) coordinates of mouse click on the hamburger icon.
      openMenu(e.x, e.y);
    });   
  
    closeButton.addEventListener("click", e => {
      closeWindow();
      console.log("close")
    });
  });
  