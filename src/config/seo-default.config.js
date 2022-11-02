/**
 * @file seo-default.config.js
 */
const url = 'https://www.fomolol.com';

export default {
  // titleTemplate="%s - Lorem"
  title: 'FOMOLOL // 2022',
  description: '',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url,
    title: 'FOMOLOL // 2022',
    site_name: 'FOMOLOL // 2022',
    description: '',
    // images: [
    //   {
    //     url: `${url}/img/jpg/share-card.jpg`,
    //     width: 800,
    //     height: 400,
    //     alt: 'Og Image Alt',
    //   },
    // ],
  },
  facebook: {
    appId: '',
  },
  twitter: {
    site: '@',
    cardType: '',
  },
  canonical: url,
  // mobileAlternate={{
  //   media: 'only screen and (max-width: 640px)',
  //   href: 'https://m.canonical.ie',
  // }},
  // languageAlternates={[{
  //   hrefLang: 'de-AT',
  //   href: 'https://www.canonical.ie/de',
  // }]}
};
