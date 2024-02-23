import React, { useRef } from "react";

const Dropdown = ({ handleDelete, setIsEdit }) => {
  const checkbox = useRef();

  return (
    <div>
      <label className="popup">
        <input ref={checkbox} type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Actions</legend>
          <ul>
            <li>
              <button
                onClick={() => {
                  // checkbox change
                  checkbox.current.checked = false;
                  setIsEdit(true);
                }}
              >
                <img src="edit.svg" />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <img src="delete.svg" alt="" />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  );
};

export default Dropdown;
