/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import checkDateValidity from './checkDateValidity';
import RenderActiveItems from './RenderActiveItems';
import PropTypes from 'prop-types';

const defaultItem = {
    id: '',
    traningDate: '',
    traningDist: '',
    mls: '',
};


export default function Activity({ activities }) {
    const [activeItem, setActiveItem] = useState(defaultItem);
    const [activeItems, setActiveItems] = useState(activities);
  
    const getInputValue = ({ target }) => {
      setActiveItem((prev) => ({ ...prev, [target.name]: target.value }));
    };
  
    const formSubmit = (e) => {
      if (checkDateValidity(activeItem.traningDate)) {
        activeItem.mls = checkDateValidity(activeItem.traningDate);
      } else {
        e.preventDefault();
        alert('Не верно введена дата. Формат ДД.ММ.ГГ');
        return null;
      }
      checkDate(activeItem)
        ? addDistance(activeItem)
        : setActiveItems((prev) => {
            activeItem.id = uuidv4();
            return [...prev, activeItem].sort(sortByField('mls'))
            }
          );
      setActiveItem(defaultItem);
      e.preventDefault();
    };
  
    const checkDate = (activeItem) => {
      return activeItems.some((e) => e.traningDate === activeItem.traningDate);
    };
  
    const sortByField = (field) => {
      return (a, b) => (a[field] < b[field] ? 1 : -1);
    };
  
    const addDistance = (activeItem) => {
      const index = activeItems.findIndex(
        (e) => e.traningDate === activeItem.traningDate
      );
      const oldDist = +activeItems[index].traningDist;
      const newDist = +activeItem.traningDist + oldDist;
      setActiveItems((prev) => {
        prev[index].traningDist = newDist;
        return prev;
      });
    };
  
    const deleteItem = (id) => {
      const index = activeItems.findIndex((e) => e.id == id);
      setActiveItems((prev) => {
        const newArray = [...prev];
        newArray.splice(index, 1);
        return newArray;
      });
    };
  
    return (
      <React.Fragment>
        <form onSubmit={formSubmit}>
          <label htmlFor="traningDate">Дата (ДД.ММ.ГГ)</label>
          <input
            value={activeItem.traningDate}
            id="traningDate"
            name="traningDate"
            onChange={getInputValue}
            type="text"
            required
          />
          <label htmlFor="traningDist">Пройдено км</label>
          <input
            value={activeItem.traningDist}
            id="traningDist"
            name="traningDist"
            onChange={getInputValue}
            type="text"
            required
          />
          <button>Записать</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Дата (ДД.ММ.ГГ)</th>
              <th>Пройдено км</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <RenderActiveItems
              activeItems={activeItems}
              deleteItem={deleteItem}
            />
          </tbody>
        </table>
      </React.Fragment>
    );
  }

Activity.propTypes = {
    activities: PropTypes.array,
}

Activity.defaultProps = {
    activities: [],
}