import { ref } from "vue";
export function useTheme() {
  const availableThemes = ["light", "dark"];
  const currentTheme = ref("light");

  const loadedTheme = localStorage.getItem("theme");
  if (loadedTheme && availableThemes.includes(loadedTheme)) {
    currentTheme.value = loadedTheme;
  }

  const setTheme = (theme) => {
    if (!availableThemes.includes(theme)) {
      return;
    }
    document.documentElement.className = theme;
    currentTheme.value = theme;
    localStorage.setItem("theme", theme);
  };

  const calculateTheme = () => {
    const dateTime = new Date();
    const hour = dateTime.getHours();
    if (hour >= 6 && hour <= 18) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return { setTheme, calculateTheme, currentTheme };
}
