import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Camaras = new Mongo.Collection('camaras');

if(Meteor.isServer) {
  Meteor.publish('camaras', function() {
    return Camaras.find();
  });
}

Meteor.methods({
  'camaras.insert'(camara) {
    new SimpleSchema({
      nombre: {
        type: String,
        min: 1,
        required: true
      },
      ubicacion: {
        type: String,
        min: 1,
        required: true
      },
      modelo: {
        type: String,
        min: 1,
        required: true
      },
      estado: {
        type: String
      }
    }).validate(camara);
    Camaras.insert({
      ...camara
    });
  }
})
