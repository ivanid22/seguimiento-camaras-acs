import {Meteor} from 'meteor/meteor';
import {Camaras} from './camaras';
import expect from 'expect';
import {Eventos} from './eventos';

if(Meteor.isClient) {
  describe('api camaras', function() {
    it('should add cameras to collections', function() {
      const cam = {
        nombre: 'testname',
        ubicacion: 'testlocation'
      };
      Camaras.insert(cam);
      const res = Camaras.findOne();
      expect(res.nombre).toBe(cam.nombre);
    })

    it('should store events', function() {
      const cam = {
        nombre: 'cam1',
        ubicacion: 'dock 1'
      };
      Meteor.call('camaras.insert', cam);
      Meteor.subscribe('camaras');
      const camdb = Camaras.findOne({nombre: cam.nombre, ubicacion: cam.ubicacion});
      Meteor.call('eventos.insert', camdb._id, 100, 'test');
      const eventodb = Eventos.findOne({camara_id: camdb._id});
      expect(eventodb.camara_id).toBe(camdb._id);
    })

  })
}
