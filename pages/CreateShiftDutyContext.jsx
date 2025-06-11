

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ShiftDutyContext = createContext();

// export const ShiftDutyProvider = ({ children }) => {
//   const [shiftDuties, setShiftDuties] = useState([]);

//   // Load from localStorage on initial render
//   useEffect(() => {
//     const storedDuties = localStorage.getItem('shiftDuties');
//     if (storedDuties) {
//       setShiftDuties(JSON.parse(storedDuties));
//     }
//   }, []);

//   // Save to localStorage whenever shiftDuties changes
//   useEffect(() => {
//     localStorage.setItem('shiftDuties', JSON.stringify(shiftDuties));
//   }, [shiftDuties]);

//   const addShiftDuty = (duty) => {
//     setShiftDuties((prev) => [...prev, duty]);
//   };

//   return (
//     <ShiftDutyContext.Provider value={{ shiftDuties, addShiftDuty }}>
//       {children}
//     </ShiftDutyContext.Provider>
//   );
// };

// export const useShiftDuty = () => useContext(ShiftDutyContext);

import React, { createContext, useContext, useState, useEffect } from 'react';

const ShiftDutyContext = createContext();

export const ShiftDutyProvider = ({ children }) => {
  const [shiftDuties, setShiftDuties] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('shiftDuties');
    if (stored) setShiftDuties(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('shiftDuties', JSON.stringify(shiftDuties));
  }, [shiftDuties]);

  const addShiftDuty = (duty) => {
    setShiftDuties(prev => [...prev, duty]);
  };

  return (
    <ShiftDutyContext.Provider value={{ shiftDuties, addShiftDuty }}>
      {children}
    </ShiftDutyContext.Provider>
  );
};

export const useShiftDuty = () => useContext(ShiftDutyContext);
