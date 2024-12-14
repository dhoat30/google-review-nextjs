// types/GoogleReview.ts
export interface GoogleReview {
  id: number;
  name: string;
  reviewId: string;
  placeId: string;
  reviewerPhotoUrl: string;
  review: string;
  rating: number;
  totalScore: number;
  reviewOrigin: string;
  reviewerUrl: string;
  publishAt: string;
  publishedAtDate: string;
  BusinessID: number;
}

export interface GoogleReviewsState {
  reviewsByBusinessId: {
    [businessId: number]: GoogleReview[];
  };
  loading: boolean;
  error: string | null;
}