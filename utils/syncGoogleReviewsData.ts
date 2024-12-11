
interface FormData {
    id: string;
    label: string;
    type: string;
    required: boolean;
    autoComplete?: string;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

let syncGoogleReviewsData: FormData[] = [];

syncGoogleReviewsData = [
    {
        id: 'mapURL', label: 'Enter Location Map URL', type: 'url', required: true, autoComplete: "url", validation: value => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value),
        errorMessage: 'Enter a valid email address'
    },
 


    // 
]

export default syncGoogleReviewsData;