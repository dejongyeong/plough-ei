import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Please input your full name.'),
  phone: yup
    .string()
    .required('Please input your phone number.')
    .matches(
      /^([0-9]{9,10})$/,
      'Phone number must be in the format of 83xxxxxxx or 083xxxxxxx'
    ),
});
