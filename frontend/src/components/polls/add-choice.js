import {useState} from 'react';

export default ()=>{
  const [choices, addChoice] = useState([]);

  return {
    choices,
    addChoice: value=>{
      return addChoice( [...choices , value]);
    }
  }
}
