import * as React from 'react';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface IProps {
  label: string;
  value?: Dayjs | null;
  onChange: (date:  Dayjs | null) =>  void
}


export const DatePickerValue:React.FC<IProps> =({label, value, onChange}) => {
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={label}
            slotProps={{ textField: { size: 'small' } }}
            value={value || null}
            onChange={onChange}
          />
      </LocalizationProvider>
    );
  }