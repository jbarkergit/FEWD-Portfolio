import useLocalStorage from '../../shared/hooks/useLocalStorage';

const [theme, setTheme] = useLocalStorage('theme', '' ? 'neumorphicDark' : 'neumorphicLight');

export function useThemeToggle() {
  const newTheme = theme === 'neumorphicLight' ? 'neumorphicDark' : 'neumorphicLight';
  setTheme(newTheme);
}
