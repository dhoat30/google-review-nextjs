
interface FormData {
    id: string;
    label: string;
    type: string;
    required: boolean;
    autoComplete?: string;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

let googleReviewFormData: FormData[] = [];

googleReviewFormData = [
    {
        id: 'firstname', label: 'First name', type: 'text', required: true, autoComplete: "given-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },
    {
        id: 'lastname', label: 'Last name', type: 'text', required: true, autoComplete: "family-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'Last name should be at least 3 characters long'
    },


    // 
]

export default googleReviewFormData;