import { constants } from '../Constants/constants';
import { IUpdateFormData } from '../Interfaces/updateFormData.interface';

export const getData = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response = null;

    try {
        const baseResponse = await fetch(`${constants.serverUrl}/api/form`, requestOptions);
        response = await baseResponse.json();
    } catch (error) {
        console.error(error);
    }

    return response;
};

export const updateData = async (data: IUpdateFormData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    let response = null;

    try {
        const baseResponse = await fetch(`${constants.serverUrl}/api/form/update`, requestOptions);
        response = await baseResponse.json();
    } catch (error) {
        console.error(error);
    }

    return response;
};
