/**
 * UnsupportedOrientation.jsx
 */
 import * as React from 'react';

 // Component(s)
 import UnsupportedOrientation from './UnsupportedOrientation';

 export default {
   title: 'UnsupportedOrientation',
   component: UnsupportedOrientation,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <UnsupportedOrientation />;

 Default.storyName = 'default';
