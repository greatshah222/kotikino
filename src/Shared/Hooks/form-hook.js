import { useReducer, useCallback } from 'react';
import { CHECK_FORM_VALIDITY, INPUT_CHANGE } from '../Reducer/actionTypes';

const formReducer = (state, action) => {
  const { type, id, value, isValid } = action;

  switch (type) {
    case INPUT_CHANGE:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [id]: { value, isValid },
        },
      };
    case CHECK_FORM_VALIDITY:
      const totalFormValid = Object.values(state.inputs).every(
        (el) => el.isValid
      );
      return {
        ...state,
        isValid: totalFormValid,
      };

    default:
      return state;
  }
};

export const useForm = (inputs, isValid) => {
  const initialState = {
    inputs,
    isValid,
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const InputHandler = useCallback((id, value, isValid) => {
    // change the state input value
    dispatch({
      type: INPUT_CHANGE,
      id,
      value,
      isValid,
    });
    // check whole form validity
    dispatch({
      type: CHECK_FORM_VALIDITY,
      isValid,
    });
  }, []);

  return [state, InputHandler];
};
