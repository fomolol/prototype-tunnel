/**
 * Cursor.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Cursor from './Cursor';

 export default {
   title: 'Cursor',
   component: Cursor,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Cursor />;

 Default.storyName = 'default';
