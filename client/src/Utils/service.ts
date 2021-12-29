import moment from 'moment';

export const timestampToString = (time: string) => {
    return moment(time).format('DD/MM/YYYY, hh:mm:ss A');
};
