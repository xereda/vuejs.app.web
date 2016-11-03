db.users.drop()
var admin = {}
admin.name = 'ADMINISTRADOR';
admin.email = "admin@docmob.com.br";
admin.admin = true;
admin.active = true;
admin.password = '12345';
admin.createdById = '';
admin.updatedById = '';
admin.createdAt = new Date();
admin.updatedAt = new Date();

db.users.insert(admin);
var qAdmin = db.users.findOne()

function randomEl(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}


for(x=2; x <= 5000; x++) {
  var user = {}
  user.name = randomEl(nomes).trim().toUpperCase() + ' ' + randomEl(sobre).trim().toUpperCase();
  user.email = user.name.replace(/\s/g, '').toLowerCase() + "@mail.com";
  user.admin = true;
  user.active = true;
  user.password = '111111';
  user.createdById = qAdmin._id;
  user.updatedById = qAdmin._id;
  user.createdAt = new Date();
  user.updatedAt = new Date();

  db.users.insert(user);
}

db.people.find().snapshot().forEach(
  function (e) {
    // update document, using its own properties
    e.phone = parseInt(e.phone);

    // save the updated document
    db.people.save(e);
  }
)

db.people.find( { $text: { $search: "153035" } } )


db.users.update({}, { $set: { createdById: ObjectId('58124f84c5560561f8e2dfc0'), updatedById: ObjectId('58124f84c5560561f8e2dfc0') } }, { multi: true })

db.people.update({}, { $set: { createdById: ObjectId('58124f84c5560561f8e2dfe5'), updatedById: ObjectId('58124f84c5560561f8e2dfe5') } }, { multi: true })

db.users.ensureIndex( { email:1 }, { unique:true, dropDups:true }

mongoimport --db docmob --collection users --file docmob.users.json
