/**
 * EffectsGlobal.jsx
 */
 import * as React from 'react';

 // Component(s)
 import EffectsGlobal from './EffectsGlobal';

 export default {
   title: 'EffectsGlobal',
   component: EffectsGlobal,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <EffectsGlobal />;

 Default.storyName = 'default';
