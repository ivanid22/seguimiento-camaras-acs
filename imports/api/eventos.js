import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Eventos = new Mongo.Collection('eventos');

if(Meteor.isServer) {
  Meteor.publish('eventos', function(camara_id) {
    return Eventos.find({camara_id: camara_id});
  });
}


Meteor.methods({
  'eventos.insert'(camara_id, timestamp, descripcion) {
    const validation = new SimpleSchema({
      timestamp: {
        type: Number
      },
      camara_id: {
        type: String
      },
      descripcion: {
        type: String,
        min: 5
      }
    }).validate({timestamp: timestamp, camara_id: camara_id, descripcion: descripcion});
    Eventos.insert({timestamp, camara_id, descripcion});
  },
  'eventos.remove'(evento_id) {
    if(evento_id) {
      Eventos.remove({_id: evento_id});
    }
  }
})
