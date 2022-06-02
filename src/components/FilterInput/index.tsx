import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

export const FilterInput = ({ value, filter, placeholder }: any) => (
  <div className=" is-flex is-justify-content-flex-end mb-4 mr-2 is-hidden-mobile">
    <div className="field">
      <p className="control has-icons-right">
        <input
          className="input placeholder-light"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={filter}
        />
        <span className="icon is-small is-right">
          <BiSearchAlt color="#9ef300" />
        </span>
      </p>
    </div>
  </div>
);
