import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

const SEED_USERNAME = 'ibr';
const SEED_PASSWORD = 'password';



Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);
});
