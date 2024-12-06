/** @type {import('next-sitemap').IConfig} */

const isProd = process.env.NODE_ENV === 'production';

const getData = async (endpoint, urlPrefix) => {
    try {
        const fetchData = await fetch(endpoint);
        const data = await fetchData.json();
        return data.map(post => `/${urlPrefix}/${post.slug}`);
    } catch (error) {
        console.error(`Failed to fetch data from ${endpoint}:`, error);
        return [];
    }
};

const getBlogsData = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/posts?acf_format=standard&per_page=100', "blogs");
const getResidentialServices = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/residential-cleaning?acf_format=standard&per_page=100', "residential-cleaning");
const getCommercialServices = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100', "commercial-cleaning");
const getIndustrialServices = () => getData('https://cms.epiccleaning.co.nz/wp-json/wp/v2/industrial-cleaning?acf_format=standard&per_page=100', "industrial-cleaning");

module.exports = {
    siteUrl: isProd ? 'https://epiccleaning.co.nz' : 'http://localhost:3000',
    generateRobotsTxt: true,
    sitemapSize: 1000,
    exclude: ['/our-work', '/thank-you', '/order-received', '/checkout', '/form-submitted/thank-you'],
    additionalPaths: async (config) => {
        const blogUrls = await getBlogsData();
        const residentialCleaning = await getResidentialServices();
        const commercialCleaning = await getCommercialServices();
        const industrialCleaning = await getIndustrialServices();

        // Return all generated URLs for sitemap
        return [
            ...await Promise.all(blogUrls.map(url => config.transform(config, url))),
            ...await Promise.all(residentialCleaning.map(url => config.transform(config, url))),
            ...await Promise.all(commercialCleaning.map(url => config.transform(config, url))),
            ...await Promise.all(industrialCleaning.map(url => config.transform(config, url))),
        ];
    },
};
