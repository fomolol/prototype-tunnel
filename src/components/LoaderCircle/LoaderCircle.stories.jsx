/**
 * LoaderCircle.jsx
 */
 import * as React from 'react';

 // Component(s)
 import LoaderCircle from './LoaderCircle';

 export default {
   title: 'LoaderCircle',
   component: LoaderCircle,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <LoaderCircle />;

 Default.storyName = 'default';
