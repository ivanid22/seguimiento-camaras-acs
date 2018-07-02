import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Camaras} from '../api/camaras';
import {Eventos} from '../api/eventos';
import {browserHistory} from 'react-router';
import {withTracker} from 'meteor/react-meteor-data';
import {NavBar} from './NavBar';
import moment from 'moment';
import {FormGroup, FormControl, ControlLabel, Button, Alert, Form, Label, Input, FormFeedback} from 'reactstrap';


export class AgregarEvento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      descripcionEvento: 'Reseteo por software',
      selectedOption: 'soft'
    }
  }

  cerrar() {
    this.setState({
      descripcionEvento: 'Reseteo por software',
      error: '',
      selectedOption: 'soft'
    });
    browserHistory.replace('/');
  }

  handleToggle(e) {
    this.setState({selectedOption: e.target.value});
    if(e.target.value==='soft') {
      this.setState({descripcionEvento: 'Reseteo por software'});
    }
    else if (e.target.value==='hard') {
      this.setState({descripcionEvento: 'Reseteo fisico'});
    }
    else {
      this.setState({descripcionEvento: this.refs.txtarea.value});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if(Session.get('camaraActiva')) {
        const res = Meteor.call('eventos.insert', Session.get('camaraActiva'), moment().valueOf(), this.state.descripcionEvento, (err, res) => {
          if(!err) {
            this.cerrar();
          }
          else {
            console.log(err)
            this.setState({error: err.details});
          }
        });
      }
    }

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <form>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="descripcionEventoGroup" id="softResetId" value="soft" checked={this.state.selectedOption === 'soft'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="softResetId">Reseteo por software</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="descripcionEventoGroup" id="hardResetId" value="hard" checked={this.state.selectedOption === 'hard'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="hardResetId">Reseteo fisico</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="descripcionEventoGroup" id="otherId" value="other" checked={this.state.selectedOption === 'other'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="hardResetId">Otro</label>
                <div className="form-group">
                  <label htmlFor="descripcionText">Descripcion</label>
                  <textarea className="form-control" rows="5" id="descripcionText" ref="txtarea" disabled={!(this.state.selectedOption === 'other')} value={this.state.descripcionEvento} onChange={(e) =>{this.setState({descripcionEvento: e.target.value})}}/>
                </div>
              </div>
            </div>
            {this.state.error !== '' ? <div className="alert alert-danger"><strong>Error! </strong><p>{this.state.error}</p></div> : undefined }
            <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Agregar</button>
            <button className="btn btn-secondary" onClick={() => {browserHistory.replace('/')}}>Cerrar</button>
          </form>
        </div>
      </div>

    )
  }
}
