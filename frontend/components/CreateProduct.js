import React from 'react';
import useForm from '../hooks/useForm';

function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: '',
    price: 0,
  });

  return (
    <div>
      <h2>Create New Product</h2>

      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            name="price"
            id="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
