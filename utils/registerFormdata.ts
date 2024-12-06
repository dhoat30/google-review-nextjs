
interface FormData {
    id: string;
    label: string;
    type: string;
    required: boolean;
    autoComplete?: string;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

let registerFormdata: FormData[] = [];

  registerFormdata = [

    {
        id: 'firstName', label: 'First name', type: 'text', required: true, autoComplete: "given-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },
    {
        id: 'lastName', label: 'Last name', type: 'text', required: true, autoComplete: "family-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },
    {
        id: 'email', label: 'Email address', type: 'email', required: true, autoComplete: "email", validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },
    {
        id: 'password', label: 'Password', type: 'password', required: true, autoComplete: "password", validation: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
        errorMessage: 'Password must have at least 8 characters, including a number',
    },


    // 
]

export default registerFormdata;