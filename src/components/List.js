import React from 'react';

const List = (props) => {
  const { items, removeItemHandler } = props;
  console.log('Rerendering List...');
  return (
    <ul>
      {items.map(({ id, name }) => (
        <li key={id} onClick={removeItemHandler.bind(this, id)}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default List;
