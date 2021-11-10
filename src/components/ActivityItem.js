import PropTypes from 'prop-types';

export default function ActivityItem({ activeItem, deleteItem }) {
    if (activeItem.traningDate === undefined) return null;
    return (
      <tr id={activeItem.id}>
        <td>{activeItem.traningDate}</td>
        <td>{activeItem.traningDist}</td>
        <td>
          <span
            onClick={(e) => {
              deleteItem(e.target.closest('tr').id);
            }}
          >
            ✘
          </span>
        </td>
      </tr>
    );
  }

ActivityItem.propTypes = {
    activeItem: PropTypes.object.isRequired,
    deleteItem: PropTypes.func,
}

ActivityItem.defaultProps = {
    deleteItem: () => console.log('Тут, вероятно, должна быть какая функция'),
}