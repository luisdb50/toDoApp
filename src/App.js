import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(-1);


  function addElement(e){
    e.preventDefault();

    if(e.target[0].value !== ""){
      let conv = list.concat([e.target[0].value]);
      setList(conv);
      e.target[0].value = "";
    }
  }

  function delElement(i){
    list.splice(i, 1);
    setList(list.slice());
    setEdit(-1);
  }

  function saveElement(e){
    e.preventDefault();
   
    let temp = list;
    let index = e.target[1].value;
    let value = e.target[0].value;
    
    if(value !== ""){
      temp.splice(index,1, value);
      setList(temp);
    }
    setEdit(-1);
  }

  function renderShowMode(index, value){
    return(
      <tr key={index}>
        <td>{index +1}</td>
        <td>{value}</td>
        <td className="icons">
          <FontAwesomeIcon 
            onClick={()=> delElement(index)} 
            icon={faTrashAlt} />
          <FontAwesomeIcon 
            onClick={()=> setEdit(index)} 
            icon={faEdit} />
        </td>
      </tr>
    );
  }

  function renderEditMode(index, value){
    return(
      <tr key={index}>
          <td>{index +1}</td>
          <td>
            <form onSubmit={saveElement}>
              <InputGroup>
                <FormControl
                  placeholder={value}
                  aria-label={value}
                />
                <InputGroup.Append>
                  <Button 
                    variant="outline-secondary"
                    value={index}
                    type="submit">
                    <FontAwesomeIcon icon={faSave} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </form>
          </td>
          <td className="icons">
            <FontAwesomeIcon 
              onClick={()=> delElement(index)} 
              icon={faTrashAlt} />
            <FontAwesomeIcon 
              onClick={()=> setEdit(index)} 
              icon={faEdit} />
          </td>
        
      </tr>
    );
  }

  return (
    <div className="App">
      <Container>
        <form onSubmit={addElement}>
          <InputGroup>
            <FormControl
              placeholder="Ingrese la tarea"
              aria-label="Ingrese la tarea"
            />
            <InputGroup.Append>
              <Button 
                variant="outline-secondary" 
                type="submit">
                Guardar
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((value, index)=>{
                return(
                  edit === index 
                  ? renderEditMode(index, value) 
                  : renderShowMode(index, value) 
                );
              })
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
