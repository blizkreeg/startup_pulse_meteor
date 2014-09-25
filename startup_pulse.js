Companies = new Meteor.Collection('company_list_3')

if (Meteor.isClient) {
  Template.trending.companies = function() {
    return Companies.find({});
  }

  Template.company.helpers({

  });

  Template.company.events({
    'click .bump': function() {
      Companies.update({_id: this._id }, {$inc: { votes: 1 }})
    }
  });

  // // counter starts at 0
  // Session.setDefault("counter", 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get("counter");
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set("counter", Session.get("counter") + 1);
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var companies = JSON.parse(HTTP.get('http://localhost:8080/company-hunt-api').content);
    console.log(companies);
    for(var i = 0;i < companies.length; i++) {
      var c = Companies.findOne({uuid: companies[i].uuid});
      if(!c) {
        Companies.insert({
          date: new Date(),
          uuid: companies[i].uuid,
          name: companies[i].properties.name,
          short_description: companies[i].properties.short_description,
          image_url: ('http://images.crunchbase.com/image/upload/c_pad,h_58,w_58/' + companies[i].properties.image_id),
          votes: 0 });
      }
    }
  });
}
