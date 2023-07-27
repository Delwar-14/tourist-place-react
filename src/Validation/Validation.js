import { object, string, number, } from 'yup';

export const userSchema = object({
    name: string().required('Name is required'),
    address: string().required('Address is required'),
    rating: number().required().min(1).max(5),
    type: string().required('Type is required'),
    image: string().required('Image is required'),
});
