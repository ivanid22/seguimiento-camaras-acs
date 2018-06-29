import React from 'react';
import {Camaras} from '../api/camaras';
import {Session} from 'meteor/session';
import {Meteor} from 'meteor/meteor';
import {NavBar} from './NavBar';
import {withTracker} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

export default class AgregarCamaraForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeloValue: '',
      ubicacionValue: 'Alero Norte',
      nombreValue: '',
      selectedOption: 'AN',
      error: ''
    };
  }

  handleNombreChange(e) {
    this.setState({
      nombreValue: e.target.value
    });
  }

  handleModeloChange(e) {
    this.setState({
      modeloValue: e.target.value
    });
  }

  handleToggle(e) {
    this.setState({selectedOption: e.target.value});
    if(e.target.value==='AN') {
      this.setState({ubicacionValue: 'Alero Norte'});
    }
    else if (e.target.value==='emb') {
      this.setState({ubicacionValue: 'Embolsado'});
    }
    else {
      this.setState({ubicacionValue: this.refs.txtarea.value});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    Meteor.call('camaras.insert', {
      nombre: this.state.nombreValue,
      ubicacion: this.state.ubicacionValue,
      estado: 'Activa',
      modelo: this.state.modeloValue
    }, (err, res) => {
      if(!err) {
        browserHistory.replace('/');
      }
      else {
        this.setState({error: err.reason})
      }
    })
  }

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="nombreText">Nombre</label>
              <input className="form-control" type="text" id="nombreText" value={this.state.nombreValue} onChange={this.handleNombreChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="modeloText">Modelo</label>
              <input className="form-control" type="text" id="modeloText" value={this.state.modeloValue} onChange={this.handleModeloChange.bind(this)}/>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ubicacionGroup" id="aleroNorteId" value="AN" checked={this.state.selectedOption === 'AN'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="softResetId">Alero Norte</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ubicacionGroup" id="embolsadoId" value="emb" checked={this.state.selectedOption === 'emb'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="hardResetId">Embolsado</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ubicacionGroup" id="otherId" value="other" checked={this.state.selectedOption === 'other'} onChange={this.handleToggle.bind(this)}/>
                <label className="form-check-label" htmlFor="hardResetId">Otro</label>
                <div className="form-group">
                  <label htmlFor="ubicacionText">Ubicacion</label>
                  <textarea className="form-control" rows="5" id="ubicacionText" ref="txtarea" disabled={!(this.state.selectedOption === 'other')} value={this.state.ubicacionValue} onChange={(e) =>{this.setState({ubicacionValue: e.target.value})}}/>
                </div>
              </div>
            </div>
            {this.state.error !== '' ? <div className="alert alert-danger"><strong>Error! </strong><p>{this.state.error}</p></div> : undefined }
            <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Agregar camara</button> <button className="btn btn-secondary ml-3" onClick={() => {browserHistory.replace('/')}}>Cancelar</button>
          </form>
        </div>
      </div>
    )
  }
}
