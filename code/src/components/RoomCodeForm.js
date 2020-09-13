import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import history          from '../history'

class RoomCodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('You are entering room: ' + this.state.value);
    history.push('/Main')
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Room Code:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default RoomCodeForm;

// import React from "react";
//
// const TextInput = props => {
//   return (
//     <div>
//       <input
//         type="text"
//         value={props.value}
//         onChange={event => console.log("value changed!")}
//       />
//       <p>// place for errors</p>
//     </div>
//   );
// };
//
// export default TextInput;

// import React, { useContext, useEffect } from "react";
// import { FormCtx } from "./Form";
//
// const TextInput = props => {
//   const { id } = props;
//   const { setFields, addField, fields } = useContext(FormCtx);
//   const field = fields[id] || {};
//   const {
//     name,
//     rows,
//     value,
//     validate,
//     placeholder,
//     label = "",
//     type = "text",
//     events = {},
//     classes = {}
//   } =  field;
//   const { onChange, ...restEvents } = events;
//   const{ contClass, fieldClass, errorClass } = classes;
//
//   const handleChange = event => {
//     try {
//       setFields(event, field);
//     } catch (error) {
//       throw error;
//     }
//
//     if (typeof onChange == "function")  {
//       onChange({
//         ...field,
//         value: event.target.value
//       });
//     }
//   };
//
//   useEffect(() => {
//     addField({
//       field: props,
//       value
//     });
//   }, []);
//
//   const fieldProps = {
//     ...restEvents,
//     id,
//     name,
//     type,
//     value,
//     validate,
//     placeholder,
//     className: fieldClass,
//     onChange: handleChange
//   };
//
//   if (type === "textarea") {
//     delete fieldProps.type;
//     delete fieldProps.value;
//
//     fieldProps.defaultValue = value;
//     fieldProps.rows = rows || 2;
//   }
//
//   return field && field.value !== undefined ? (
//     <div className={contClass}>
//       {label}
//       {type === "textarea" ? (
//         <textarea {...fieldProps} />
//       ) : (
//         <input {...fieldProps} />
//       )}
//       <p className={errorClass}>// place for errors</p>
//     </div>
//   ) : (
//     ""
//   );
// };
//
// export default TextInput;
