import React from 'react';

const Input = ({ name, placeholder, onInput, value = '' }) => (
    <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={onInput}
        value={value}
    />
);

export default Input;