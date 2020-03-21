// This will execute at the beginning
import { App } from "../utils"

if (process.client) {
    App.deviceWidth = window.innerWidth;
    App.navigatorLanguage = window.navigator.language;

    window.addEventListener("resize", () => {
        App.deviceWidth = window.innerWidth;
    });
}