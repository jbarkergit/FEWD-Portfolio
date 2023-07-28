type FormInput = {
  id: number;
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
};

export type FormInputsType = FormInput[];

const FormInputs: FormInput[] = [
  {
    id: 1,
    name: 'userFirstName',
    placeholder: 'First name',
    type: 'text',
    required: true,
  },
  {
    id: 2,
    name: 'userLastName',
    placeholder: 'Last name',
    type: 'text',
    required: true,
  },
  {
    id: 3,
    name: 'userEmailAddress',
    placeholder: 'Email address',
    type: 'text',
    required: true,
  },
  {
    id: 4,
    name: 'userPhoneNumber',
    placeholder: 'Phone number (optional)',
    type: 'text',
  },
  {
    id: 5,
    name: 'userCompany',
    placeholder: 'Company (optional)',
    type: 'text',
  },
  {
    id: 6,
    name: 'userMessage',
    placeholder: 'Type your message..',
    type: 'text',
    required: true,
  },
];

export default FormInputs;
