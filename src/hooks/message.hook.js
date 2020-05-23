import { useCallback } from 'react'

export const useMessage = color => {
  return useCallback(text => {
    if (window.M && text) {
      window.M.toast({ html: text, classes: `${color} rounded` });
    }
  }, [color]);
};

