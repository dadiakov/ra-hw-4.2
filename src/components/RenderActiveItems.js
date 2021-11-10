import React from 'react';
import ActivityItem from './ActivityItem';
import PropTypes from 'prop-types';

export default function RenderActiveItems({ activeItems, deleteItem }) {
    if (activeItems.length === 0) return null;
    return (
      <React.Fragment>
        {activeItems.map((e) => (
          <ActivityItem activeItem={e} key={e.id} deleteItem={deleteItem} />
        ))}
      </React.Fragment>
    );
}

RenderActiveItems.propTypes = {
    activeItems: PropTypes.array.isRequired,
    deleteItem: PropTypes.func,
}

RenderActiveItems.defaultProps = {
    deleteItem: () => console.log('Тут, вероятно, должна быть какая функция'),
}