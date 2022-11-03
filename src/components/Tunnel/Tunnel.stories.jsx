/**
 * Tunnel.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Tunnel from './Tunnel';

 export default {
   title: 'Tunnel',
   component: Tunnel,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Tunnel />;

 Default.storyName = 'default';
