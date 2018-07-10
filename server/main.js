import { Meteor } from 'meteor/meteor';
import { Camaras } from '../imports/api/camaras';
import { Eventos } from '../imports/api/eventos';
import { Revisiones } from '../imports/api/revisiones';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // Accounts.createUser({
  //   username: 'admin',
  //   password: 'acstecnologia',
  //   email: 'idiaz@acstecnologia.com.ar'
  // })
});
