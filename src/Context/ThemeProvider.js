import { useContext } from "react"
import { DARK_MODE } from "./DarkMode"
import { DarkTheme, LightTheme } from "../Constants/MyColors"

const useDarkTheme = () => {
    const { darkMode } = useContext(DARK_MODE);

    return darkMode ? DarkTheme : LightTheme;
}

export { useDarkTheme }