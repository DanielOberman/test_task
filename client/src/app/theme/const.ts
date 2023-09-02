/* "блок аугументации темы дата грид" */
/* раскомментировать один из тех дата гридов, который установлен */
import type {} from '@mui/x-data-grid/themeAugmentation';
// import type {} from '@mui/x-data-grid-pro/themeAugmentation';
// import type {} from '@mui/x-data-grid-premium/themeAugmentation';
/* конец "блок аугументации темы дата грид" */
/* "блок аугументации темы дата пикеров" */
// import type {} from '@mui/x-date-pickers/themeAugmentation';
/* конец "блок аугументации темы дата пикеров" */

import { alpha, createTheme } from '@mui/material';
import { ruRU as coreRU } from '@mui/material/locale';
import type * as MaterialTheme from '@mui/material/styles';
import { ruRU as dataGridRU } from '@mui/x-data-grid';

import { brandPrimary } from './colors/brand-primary';
import { brandSecondary } from './colors/brand-secondary';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ICustomPalette {}

interface ICustomPaletteOptions extends Partial<ICustomPalette> {}

interface ICustomTheme {
    minScreenSize: string;
}

interface ICustomThemeOptions extends Partial<ICustomTheme> {}

declare module '@mui/material/styles' {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Palette extends ICustomPalette {}

    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface PaletteOptions extends ICustomPaletteOptions {}

    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface ThemeOptions extends ICustomThemeOptions {}

    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Theme extends ICustomTheme {}
}

declare module '@emotion/react' {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Theme extends MaterialTheme.Theme {}
}

const brandThemeOptions: MaterialTheme.ThemeOptions = {
    palette: {
        primary: {
            light: brandPrimary[300],
            main: brandPrimary[400],
            dark: brandPrimary[500],
        },
        secondary: {
            light: brandSecondary[300],
            main: brandSecondary[500],
            dark: brandSecondary[700],
        },
        action: {
            selected: alpha(brandSecondary[500], 0.08),
            selectedOpacity: 0.08,
        },
        success: {
            main: '#2e7d32',
            light: '#4CAF50',
            dark: '#1E4620',
        },
        error: {
            main: '#D32F2F',
            light: '#FDEDED',
            dark: '#5F2120',
        },
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    // border: 0,
                    // '.MuiDataGrid-columnHeaders:hover .MuiDataGrid-columnSeparator': { visibility: 'hidden' },
                    // '.MuiDataGrid-columnHeaders': {display: 'none'}
                },
                cell: ({ theme }) => ({
                    padding: theme.spacing(1, 1),
                    height: '57px',

                    '&:focus': {
                        borderColor: 'transparent',
                        outline: 'none',
                    },
                }),
                columnHeader: ({ theme }) => ({
                    padding: theme.spacing(1,1),

                    '&:focus-within': {
                        borderColor: 'transparent',
                        outline: 'none',
                    },
                }),
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    background: alpha(brandSecondary[600], 0.9),
                    fontWeight: 500,
                    lineHeight: '14px',
                    fontSize: '10px',
                },
                arrow: {
                    color: alpha(brandSecondary[600], 0.9),
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                sizeSmall: {
                    letterSpacing: '0.2px',
                    lineHeight: '18px',
                },
                sizeMedium: {
                    letterSpacing: '0.2px',
                    lineHeight: '20px',
                },
                sizeLarge: ({ theme }) => ({
                    letterSpacing: '0.2px',
                    lineHeight: '22px',
                    padding: `${theme.spacing(2)} calc(${theme.spacing(2)} + 5px)`,
                }),
                containedPrimary: {
                    backgroundColor: brandPrimary[400],
                    ':hover': {
                        backgroundColor: brandPrimary[600],
                    },
                },
                startIcon: {
                    '&>*:nth-of-type(1)': {
                        fontSize: 'inherit',
                    },
                },
                //TODO: Добавить цвета под разные color="" кнопки
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: {
                    letterSpacing: 0,
                    fontWeight: '400',
                },
                h5: {
                    fontWeight: '500',
                },
                caption: {
                    letterSpacing: '0.1px',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                colorPrimary: {
                    color: brandPrimary[400],
                },
                colorSecondary: {
                    color: brandSecondary[700],
                },
                colorAction: {
                    color: brandSecondary[800],
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                colorPrimary: {
                    color: brandPrimary[400],
                },
                colorSecondary: {
                    color: brandSecondary[700],
                    ':hover': {
                        backgroundColor: brandSecondary[100],
                    },
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: theme.spacing(6),
                    position: 'relative',
                }),
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: theme.spacing(6),
                }),
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: theme.spacing(6),
                }),
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    marginTop: theme.spacing(1),
                }),
            },
        },
        MuiAutocomplete: {
            defaultProps: {
                noOptionsText: 'Не найдено',
                loadingText: 'Загрузка...',
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: `0 ${theme.spacing(4)}`,
                    '&.Mui-expanded': {
                        minHeight: '48px',
                    },
                }),
                content: {
                    '&.Mui-expanded': {
                        margin: 0,
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: `0 ${theme.spacing(4)} ${theme.spacing(4)}`,
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    marginTop: 0,
                },
            },
        },
    },
};

export const BRAND_THEME = createTheme(brandThemeOptions, coreRU, dataGridRU);
