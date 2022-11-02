/**
 * Text.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Text from './Text';

 export default {
   title: 'Text',
   component: Text,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Text />;

 Default.storyName = 'default';
