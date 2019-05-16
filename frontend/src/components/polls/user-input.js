import {useState} from 'react';


export default ()=>{

  const [choice, setChoice] = useState('');

  return{
    choice,
    onChange: event=>{
      return setChoice(event.target.value);
    }

  }

}
