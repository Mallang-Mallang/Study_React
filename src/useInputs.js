import { useCallback, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = "";
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInputs(initalForm) {
  const [form, dispatch] = useReducer(reducer, initalForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    // setForm((form) => ({ ...form, [name]: value }));
    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  }, []);
  // const reset = useCallback(() => setForm(initalForm), [initalForm]);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return [form, onChange, reset];
}

export default useInputs;
