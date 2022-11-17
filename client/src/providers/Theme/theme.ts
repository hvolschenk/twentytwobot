import { grey, red } from '@mui/material/colors';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

const useTheme = (): Theme => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const themeDefault: ThemeOptions = {};
  const themeDark: ThemeOptions = {};
  const themeLight: ThemeOptions = {
    palette: {
      background: { default: grey['200'] },
      primary: { main: red.A700 },
      secondary: { main: red['500'] },
    },
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        ...themeDefault,
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          ...(prefersDarkMode ? themeDark.palette : themeLight.palette),
        },
      }),
    [prefersDarkMode]
  );

  return theme;
};

export default useTheme;
