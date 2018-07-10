import {Meteor} from 'meteor/meteor';
import {Revisiones} from './revisiones';
import expect from 'expect';
import {Accounts} from 'meteor/accounts-base';



describe('revisiones api', function() {

  beforeEach(function() {

    if(Meteor.isClient) {
        Meteor.loginWithPassword('test@test.com', '123456789');
      Meteor.subscribe('revisiones');

    }
  })

  it('should add records to Revisiones', function(){

    Meteor.call('revisiones.insert', 234, 'test');
    expect(Revisiones.findOne()).toExist();
  })
})
