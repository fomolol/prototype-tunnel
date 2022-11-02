/**
 * @file useCursorStyle
 * Helper to quickly change the cursor style.
 */
import * as React from 'react';
import { useCursor } from '@/contexts/CursorContext/useCursorContext';

export const useCursorStyle = () => {
  const [state, dispatch] = useCursor();

  const addCursorBorder = React.useCallback(() => {
    dispatch({ type: 'ADD_CURSOR_BORDER' });
  }, [dispatch]);

  const removeCursorBorder = React.useCallback(() => {
    dispatch({ type: 'REMOVE_CURSOR_BORDER' });
  }, [dispatch]);

  const addCursorColor = React.useCallback(
    color => {
      dispatch({ type: 'ADD_CURSOR_COLOR', payload: color });
    },
    [dispatch],
  );

  const resetCursorColor = React.useCallback(() => {
    dispatch({ type: 'RESET_CURSOR_COLOR' });
  }, [dispatch]);

  const lockCursorPosition = React.useCallback(
    coordinates => {
      dispatch({ type: 'LOCK_CURSOR_POSITION', payload: coordinates });
    },
    [dispatch],
  );

  return {
    ...state,
    addCursorColor,
    resetCursorColor,
    addCursorBorder,
    removeCursorBorder,
    lockCursorPosition,
  };
};
