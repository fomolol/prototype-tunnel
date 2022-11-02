/**
 * Scroller.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Scroller from './Scroller';

 export default {
   title: 'Scroller',
   component: Scroller,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Scroller />;

 Default.storyName = 'default';
