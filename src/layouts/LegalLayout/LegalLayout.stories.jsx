/**
 * LegalLayout.jsx
 */
 import * as React from 'react';

 // Component(s)
 import LegalLayout from './LegalLayout';

 export default {
   title: 'LegalLayout',
   component: LegalLayout,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <LegalLayout />;

 Default.storyName = 'default';
