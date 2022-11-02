/**
 * AnimatedText.jsx
 */
 import * as React from 'react';

 // Component(s)
 import AnimatedText from './AnimatedText';

 export default {
   title: 'AnimatedText',
   component: AnimatedText,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <AnimatedText />;

 Default.storyName = 'default';
