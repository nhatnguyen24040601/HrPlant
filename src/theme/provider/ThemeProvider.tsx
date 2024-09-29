import {ThemeProvider as SThemeProvider} from 'styled-components/native';
import React, {
  createContext,
  memo,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import {ColorsDarkTheme, ColorsLightTheme, IColors} from '../CommonColors';
import { useTheme } from 'modules/setting/src/selector';
import { ThemeName } from 'utils/enum';

interface IThemeContext {
  colors: IColors;
}

export const ThemeContext = createContext<IThemeContext>({
  colors: ColorsLightTheme,
});

export const useColors = () => useContext(ThemeContext).colors;

const _ThemeProvider = ({children}: {children: ReactNode}) => {
  const theme = useTheme();

  const colorTheme = useMemo(
    () => (theme === ThemeName.DARK ? ColorsDarkTheme : ColorsLightTheme),
    [theme],
  );

  return (
    <ThemeContext.Provider
      value={{
        colors: colorTheme,
      }}>
      <SThemeProvider theme={colorTheme}>{children}</SThemeProvider>
    </ThemeContext.Provider>
  );
};

const ThemeProvider = memo(_ThemeProvider);

export default ThemeProvider;