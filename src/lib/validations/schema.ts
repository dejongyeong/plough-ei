import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Please enter your full name.'),
  email: yup.string().email().required('Please enter your email.'),
  job: yup
    .string()
    .required(
      'Please select either Third-Level Engineering Student or Professional.'
    ),
  isMember: yup.boolean().default(false),
  isInterested: yup.boolean().default(true),
  agree: yup.boolean().default(true),
});
