import {Meteor} from 'meteor/meteor';
import React from 'react';
import DetalleCamaraContainer from './DetalleCamara';
import ListaCamarasContainer from './ListaCamaras';
import ListaEventosContainer from './ListaEventos';
import {withTracker} from 'meteor/react-meteor-data';
import {Link, browserHistory} from 'react-router';
import {NavBar} from './NavBar'


export class Dashboard extends React.Component {

  render() {
    return(
      <div>
        <NavBar/>
        <div className="desktopcontent">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <ListaCamarasContainer/>

              </div>
              <div className="col-lg-9 col-md-9">
                <ListaEventosContainer/>
              </div>
            </div>
          </div>
        </div>
        <div className="mobilecontent">
          <div className="container">
            <ListaCamarasContainer/>
            <div className="mt-3 list-group">
                {!!this.props.camaraActiva ? <button className="btn btn-secondary" onClick={() => {browserHistory.replace('/eventos')}}>Eventos</button> : undefined}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker((props) => {
    return {
      camaraActiva: Session.get('camaraActiva')
    }
})(Dashboard);
