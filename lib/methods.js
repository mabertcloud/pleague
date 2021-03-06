import check from 'check';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

Meteor.methods({
    newGame(newgame){
      console.log('[LOG] Creating '+JSON.stringify(newgame));
      // Creating {
      //   "teamRed":{
      //     "_id":"Eqa7CT5737j2kySYt",
      //     "attacker":"nzSeeC7qxvopYbHSh",
      //     "defender":"MEti7mYPLqrauSdZd"
      //   },
      //   "teamBlue":{
      //     "_id":"83545jQkcFMZTP6PF",
      //     "attacker":"qDMGSTtLrx8FfFxnz",
      //     "defender":"7SAe4GFHskxy8bRzv"
      //   }
      // }
      return Games.insert({
        teamRed: newgame.teamRed,
        teamBlue: newgame.teamBlue,
        teamRedScore: 0,
        teamBlueScore: 0,
        startDate: new Date()
      });

    },
    newTeam(newteam){
      //newteam => {players: [this.playerOne._id, this.playerTwo._id]}
      let tr = Teams.findOne( { $and: [ { players: { $in: [newteam.players[0]] } }, { players: { $in: [newteam.players[1]] } } ] } );
      if (tr) {
        return tr;
      } else {
        let tr_id = Teams.insert(newteam);
        tr = Teams.findOne(tr_id);
        return tr;
      }
    },
    newPlayer(newplayer){
        let testPlayerName = Players.findOne({ name : { $regex : new RegExp(newplayer.name, "i") } });
        if (testPlayerName) {
            throw new Meteor.Error('player-already-exists',
            'Player already exists');
        }

        check(newplayer.name, String);
        newplayer.elo = 1500;
        newplayer.joinDate = new Date();

        if (Meteor.userId() && newplayer.claim) {
            //logged in user creates new player
            console.log('Create player claimed by: ', Meteor.userId());
            newplayer.belongsTo = Meteor.userId();
        }

        Players.insert(newplayer);
    }
});
