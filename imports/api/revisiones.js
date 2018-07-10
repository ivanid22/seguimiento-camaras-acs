import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Revisiones = new Mongo.Collection('revisiones');

if (Meteor.isServer) {
  Meteor.publish('revisiones', function() {
    if(this.userId) {
      return Revisiones.find();
    }
    else return undefined
  });
}

Meteor.methods({
  'revisiones.insert'(timestamp, detalles) {
    if(!!Meteor.user()) {
      new SimpleSchema({
        timestamp: {
          type: Number,
          required: true
        },
        detalles: {
          type: String,
          required: false
        }
      }).validate({timestamp, detalles});
      Revisiones.insert({timestamp, detalles});
    }
  },
  'revisiones.remove'(id) {
      Revisiones.remove({_id: id});
  }
})
