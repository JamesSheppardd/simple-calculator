import { BrowserWindow, remote } from "electron";

const { Menu, app } = require("electron");
const themes = require("./common/themes")
const isMac = process.platform === "darwin";
const Store = require("./store.js");

const store: any = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    appData: { theme: "default", checked: "default" }
  }
});

const determineChecked = (item: string) => {
  if(item === store.get().appData.checked){
    return true;
  }
  return false;
}

//let theme: string = store.get("appData").theme;
const template = [
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
    id: "file",
  },
  {
    label: "Options",
    submenu: [
      { type: "radio", label: "Default", checked: determineChecked("default"), click: () => {
        store.set("appData", { "theme": "default", "checked": "default" });
      } },
      { type: "radio", label: "Dark Red", checked: determineChecked("darkRed"), click: () => {
        store.set("appData", { "theme": "darkRed", "checked": "darkRed" });
      } },
      { type: "radio", label: "Dark Purple", checked: determineChecked("darkPurple"),click: () => {
        store.set("appData", { "theme": "darkPurple", "checked": "darkPurple" });
      }  },
      { type: "radio", label: "Warm", checked: determineChecked("warm"), click: () => {
        store.set("appData", { "theme": "warm", "checked": "warm" });
      }  },
      { type: "radio", label: "Pastel", checked: determineChecked("pastel"), click: () => {
        store.set("appData", { "theme": "pastel", "checked": "pastel" });
      }  },
      { type: "radio", label: "Gameboy", checked: determineChecked("gameboy"), click: () => {
        store.set("appData", { "theme": "gameboy", "checked": "gameboy" });
      }  },
      { type: "radio", label: "Light", checked: determineChecked("light"), click: () => {
        store.set("appData", { "theme": "light", "checked": "light" });
      }  },
    ],
    id: "options",
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = {
  menu,
};  
