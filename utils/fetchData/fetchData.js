
// business apis ------------------------------------------------------------------------------------------------------------------------------------
export const getBusinessData = async (sessionToken) => {

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/business/get-business`, {
        cache: 'no-store', // Force fresh fetch
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    // Check if the response is successful
    if (!response.ok) {
      console.error(`Failed to fetch business data: ${response.statusText}`);
      return null; // Handle error gracefully
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching business data:', error);
    return null; // Return null or handle error appropriately
  }
};


// google reviews apis ------------------------------------------------------------------------------------------------------------------------------------
export const getBusinessGoogleReviews = async (sessionToken, businessID) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/reviews/fetch-google-reviews`,  {
        cache: 'no-store', // Force fresh fetch
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    // Check if the response is successful
    if (!response.ok) {
      console.error(`Failed to fetch google reviews: ${response.statusText}`);
      return null; // Handle error gracefully
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching google reviews:', error);
    return null; // Return null or handle error appropriately
  }
}
//get projects 
// export const getProjects = async () => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?acf_format=standard&per_page=100`, {
//         next: { revalidate: 60 },
//     });
//     let data = await fetchData.json();
//     return data
// }

//fetch work categories 
// export const getProjectCategories = async () => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work-category`, {
//         next: { revalidate: 60 },
//     });
//     let data = await fetchData.json();
//     return data
// }

// fetch single project 
// export const getSingleProject = async (slug) => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?slug=${slug}&acf_format=standard`, {
//         next: { revalidate: 60 },
//     });
//     let data = await fetchData.json();
//     return data
// }



//get service packages  
export const getCommercialServices = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

export const getSingleCommercialService = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}
// get single service package 

// get all blogs  
export const getBlogsData = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}
// get single blog data 
export const getSingleBlog = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

