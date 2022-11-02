/**
 * LoadingScene.jsx
 */
 import * as React from 'react';

 // Component(s)
 import LoadingScene from './LoadingScene';

 export default {
   title: 'LoadingScene',
   component: LoadingScene,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <LoadingScene />;

 Default.storyName = 'default';
