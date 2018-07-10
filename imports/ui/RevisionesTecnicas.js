import React from 'react';
import {Meteor} from 'meteor/meteor';
import RevisionesTecnicasList from './RevisionesTecnicasList';
import {NavBar} from './NavBar';
import {browserHistory} from 'react-router';
import ListaCamaraContainer from './ListaCamaras';

export default class RevisionesTecnicas extends React.Component {

  render() {
    return (
      <div>
        <NavBar/>
        <div className="mobilecontent">
          <RevisionesTecnicasList/>
          <div className="container">
            <div className="list-group">
              <button className="btn btn-primary" onClick={() => {browserHistory.replace('/agregarRevision')}}>Agregar revision</button>
              <button className="btn btn-secondary mt-2" onClick={() => {browserHistory.replace('/')}}>Volver</button>
            </div>
          </div>
        </div>
        <div className="desktopcontent">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <ListaCamarasContainer/>
              </div>
              <div className="col-lg-5 col-md-5">
                <div className="container">
                  <h4>Revisiones tecnicas</h4>
                </div>
                <RevisionesTecnicasList/>
                <div className="container-fluid">
                  <button className="btn btn-primary mt-3" onClick={() => {browserHistory.replace('/agregarRevision')}}>Agregar revision</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
