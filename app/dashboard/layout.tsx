import ReduxProvider from  '../../redux/ReduxProvider'
import {getBusinessData, getBusinessGoogleReviews} from '../../utils/fetchData/fetchData'
import { authOptions } from '../../lib/auth';
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import { Business } from '../../redux/types/Business';
import { GoogleReview } from '../../redux/types/GoogleReview';
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }

    const businessData: Business[] = await getBusinessData(session.user.token);
    const googleReviewsData: GoogleReview[] = await getBusinessGoogleReviews(session.user.token);

// Create the initial Redux state with the business and reviews data
const preloadedState = {
  business: businessData,
  googleReviews: {
    reviewsByBusinessId: googleReviewsData, // Nested object structure
    loading: false, // Initial loading state
    error: null, // Initial error state
  },
};
    

    return <ReduxProvider preloadedState={preloadedState}>{children}</ReduxProvider>;
} 