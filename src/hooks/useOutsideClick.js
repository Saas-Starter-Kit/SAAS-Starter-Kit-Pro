import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;

//import React, { useRef } from "react";

//import useOutsideClick from "./useOutsideClick";

//function MyComponent() {
//  const ref = useRef();

//  useOutsideClick(ref, () => {
//    alert('You clicked outside')
//  });

//  return (
//    <div className="App">
//      <div ref={ref}}>
//        <h4>This is a menu</h4>
//        <p>This is another content</p>
//      </div>
//      <div>
//        This is a content outside the menu
//      </div>
//    </div>
//  );
//}
