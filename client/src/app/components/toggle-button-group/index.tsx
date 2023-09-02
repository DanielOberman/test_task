import React from 'react';

import { Box, ToggleButton, ToggleButtonGroup as MuiToggleButtonGroup, Stack, Typography } from '@mui/material';
import type { ToggleButtonGroupProps } from '@mui/material';

type TValueType = string | boolean;

export type TAuToggleButtonProps<T> = Omit<ToggleButtonGroupProps, 'onChange' | 'title'> & {
    items: {
        label: string;
        value: T;
        disabled?: boolean;
    }[];
    onChange: (key: T) => void;
    title?: React.ReactNode;
};

export const ToggleButtonGroup = <T extends TValueType>(props: TAuToggleButtonProps<T>) => {
    const { items, title, onChange, classes, ...restProps } = props;

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
                {title && typeof title === 'object' ? title : <Typography variant="subtitle2">{title}</Typography>}
            </Stack>
            <MuiToggleButtonGroup
                exclusive
                onChange={(_, key: T) => {
                    if (key !== null) {
                        onChange(key);
                    }
                }}
                {...restProps}
            >
                {items.map((item, idx) => (
                    <ToggleButton
                        key={idx}
                        disabled={item?.disabled}
                        value={item?.value}

                    >
                        <Typography variant="body2" fontWeight="500" lineHeight="20px">
                            {item?.label}
                        </Typography>
                    </ToggleButton>
                ))}
            </MuiToggleButtonGroup>
        </Box>
    );
};
