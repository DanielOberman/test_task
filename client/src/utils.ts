import dayjs from 'dayjs';
import type { ConfigType } from 'dayjs';

export const BASE_DATE_FORMAT = 'DD.MM.YYYY';
export const BASE_DATE_TIME_FORMAT = `${BASE_DATE_FORMAT} HH:mm`;

export const formatDate = (date?: ConfigType, format?: string) =>
    date ? dayjs(date).format(format || BASE_DATE_FORMAT) : null;

export const formatDataDate = (date?: ConfigType) =>
dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS')

export const getCurrentDataTime = () => dayjs().format(BASE_DATE_TIME_FORMAT);
