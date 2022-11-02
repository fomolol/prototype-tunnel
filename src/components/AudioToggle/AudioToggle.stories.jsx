/**
 * AudioToggle.jsx
 */
 import * as React from 'react';

 // Component(s)
 import AudioToggle from './AudioToggle';

 export default {
   title: 'AudioToggle',
   component: AudioToggle,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <AudioToggle />;

 Default.storyName = 'default';
