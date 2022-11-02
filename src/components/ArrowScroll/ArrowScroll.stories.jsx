/**
 * ArrowScroll.jsx
 */
 import * as React from 'react';

 // Component(s)
 import ArrowScroll from './ArrowScroll';

 export default {
   title: 'ArrowScroll',
   component: ArrowScroll,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <ArrowScroll />;

 Default.storyName = 'default';
