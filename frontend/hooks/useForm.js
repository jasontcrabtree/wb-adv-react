import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    // Destructure the input name, value and type
    let { name, value, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      value[0] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value, // bc we destructured we are able to use the much shorter name and value
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  // 21:25 lesson 22 for explanation of this
  // Short explanation: Turn your object into an array, map over it, set item's value to null, then turn back into object
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }

  // when dealing with an object of multiple pieces of state we:
  /*
  0. Create a state object for our inputs
  1. Set entire thing to be an object
  2. Copy the existing state (inputs)
  3. Update the changed piece of state via {...spread}
  4. Use a dynamic/variable property name to update the correct state data within one form
  `[e.target.name]: e.target.value`
  5. Note: As the [e.target.name] is the last piece of data in the react hook, it will always be the last change on the state data, so we don't need to update further up the function — it automatically updates it as the last thing to run, and resets/overrides the state, as we want
  6. If you want to surface data or functionality from a custom hook you need to return it
  7. Return the things we want to surface from the custom hook
  */

  return { inputs, handleChange, resetForm, clearForm };
}
