import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Camaras} from '../api/camaras';
import {Eventos} from '../api/eventos';
import moment from 'moment';

export class AgregarEventoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'soft',
      modalShow: false,
      error: '',
      descripcionEvento: 'Reseteo por software'
    }
  }

  cerrarModal() {
    $('#formModal').modal('toggle');
    this.setState({
      error: '',
      selectedOption: 'soft',
      descripcionEvento: 'Reseteo por software'
    });

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

  onSubmit() {
    Meteor.call('eventos.insert', this.props.camara._id, moment().valueOf(), this.state.descripcionEvento, (err, res) => {
      if(err) {
        this.setState({error: err.reason});
      }
      else {
        this.cerrarModal();
      }
    })
  }

  render() {
    return(
      <div>
        <button className="btn btn-primary" data-toggle="modal" data-target="#formModal" aria-labelledby="modalLabel" aria-hidden="true">Agregar evento</button>
        <div className="modal fade" id="formModal" ref="modalRef" role="dialog" data-backdrop="static" data-keyboard="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">Agregar Evento en {this.props.camara.nombre}</h5>
              </div>
              <div className="modal-body">
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
                </form>
              </div>
              <div className="modal-footer">
                <button  type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Agregar</button>
                <button className="btn btn-secondary" onClick={this.cerrarModal.bind(this)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker((props) => {
    const cam = Session.get('camaraActiva');
    if (cam) {
      Meteor.subscribe('camaras');
      return {
        camara: Camaras.findOne({_id: cam})
      }
    }
    else return undefined;
})(AgregarEventoForm);
