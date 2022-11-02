/**
 * Modal.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Modal from './Modal';

 export default {
   title: 'Modal',
   component: Modal,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Modal />;

 Default.storyName = 'default';
