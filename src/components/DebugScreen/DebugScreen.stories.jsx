/**
 * DebugScreen.jsx
 */
 import * as React from 'react';

 // Component(s)
 import DebugScreen from './DebugScreen';

 export default {
   title: 'DebugScreen',
   component: DebugScreen,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <DebugScreen />;

 Default.storyName = 'default';
