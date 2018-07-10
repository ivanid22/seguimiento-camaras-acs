import React from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Revisiones} from '../api/revisiones';
import {NavBar} from './NavBar';
import moment from 'moment';
import {browserHistory} from 'react-router';

class RevisionesTecnicasListItem extends React.Component {
   constructor(props) {
     super(props);
   }

   eliminar() {
     if(window.confirm('Desea eliminar la entrada de revision técnica?')) {
       console.log(this.props.revision._id);
       Meteor.call('revisiones.remove', this.props.revision._id);
     }
   }

   render() {
     return(
       <div className="list-group-item list-group-item-action">
         <div className="revisiones-list-item">
           <h5>{moment(this.props.revision.timestamp).format('D/M/YY H:mm:ss')}</h5>
           <textarea rows="3" disabled>{this.props.revision.detalles}</textarea>
           <button onClick={this.eliminar.bind(this)} className="btn btn-secondary mt-1">Eliminar</button>
         </div>
       </div>
     )
   }
}

export class RevisionesTecnicasList extends React.Component {
  constructor(props) {
    super(props);
  }

    renderRevisiones() {
      if(this.props.revisiones.length > 0) {
        return(this.props.revisiones.map((revision) => {
          return <RevisionesTecnicasListItem key={revision._id} revision={revision}/>
        }))
      }
      else return <h3>No existen revisiones técnicas</h3>;
    }

    render() {
        return(
            <div className="container">
              <div className="list-group mt-3">
                {this.renderRevisiones()}
              </div>
            </div>
        )
    }
}

export default withTracker((props) => {
  Meteor.subscribe('revisiones');
  return {
    revisiones: Revisiones.find({}, {sort: [['timestamp', 'desc']]}).fetch()
  }
})(RevisionesTecnicasList);
