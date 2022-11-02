/**
 * CookieBanner.jsx
 */
 import * as React from 'react';

 // Component(s)
 import CookieBanner from './CookieBanner';

 export default {
   title: 'CookieBanner',
   component: CookieBanner,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <CookieBanner />;

 Default.storyName = 'default';
