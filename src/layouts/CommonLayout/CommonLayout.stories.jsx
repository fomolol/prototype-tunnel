/**
 * CommonLayout.jsx
 */
 import * as React from 'react';

 // Component(s)
 import CommonLayout from './CommonLayout';

 export default {
   title: 'CommonLayout',
   component: CommonLayout,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <CommonLayout />;

 Default.storyName = 'default';
