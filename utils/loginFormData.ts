
interface FormData {
    id: string;
    label: string;
    type: string;
    required: boolean;
    autoComplete?: string;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

let loginFormData: FormData[] = [];

loginFormData = [
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

export default loginFormData;