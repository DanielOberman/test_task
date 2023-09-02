import type { FC, PropsWithChildren } from 'react';

import { css, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BRAND_THEME } from './const';

export const Theme: FC<PropsWithChildren> = ({ children }) => (
    <ThemeProvider theme={BRAND_THEME}>
        <CssBaseline />
        <GlobalStyles
            styles={css`
                html,
                body,
                #root {
                    margin: 0;
                    height: 100%;
                }

                * {
                    box-sizing: border-box;
                }
            `}
        />
        {children}
    </ThemeProvider>
);
