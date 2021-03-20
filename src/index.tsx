import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {remote, ipcRenderer} from "electron";

function getCurrentWindow() {
    return remote.getCurrentWindow();
  }
  function openMenu(x: any, y: any) {
    ipcRenderer.send(`display-app-menu`, { x, y });
  }

  function closeWindow(browserWindow = getCurrentWindow()) {
    console.log("close");
    browserWindow.close();
  }
window.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const closeButton = document.getElementById("close-btn");
  
    menuButton?.addEventListener("click", e => {
      // Opens menu at (x,y) coordinates of mouse click on the hamburger icon.
      openMenu(e.x, e.y);
    });   
  
    closeButton?.addEventListener("click", e => {
      closeWindow();
      console.log("close")
    });
  });
  

render(<App />, document.getElementById('root'));
