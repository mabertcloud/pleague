import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';

import template from '/imports/components/games/game-in-progress.html';

class GameInProgressCtrl {
  constructor($scope, $state, $ionicPopup, $ionicHistory, gameScoreService) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$ionicPopup = $ionicPopup;
    this.$ionicHistory = $ionicHistory;
    this.gameScoreService = gameScoreService;

    console.log('in gameInProgress controller');

    this.enabled = true;

    this.helpers({
      players: () => {
        return Players.find({}, { sort: { name: 1 } });
      }
    });
  }

  scored(teamId, player) {
    console.log(teamId, player);
    this.gameScoreService.scored(teamId, player, this.game);
  }

  trashGameInProgressModal() {
    console.log(this.game);
  }
}

export default angular.module('gameinprogress', [
  angularMeteor
])
  .component('gameInProgress', {
    templateUrl: 'imports/components/games/game-in-progress.html',
    controller: ['$scope', '$state', '$ionicPopup', '$ionicHistory',  'gameScoreService', GameInProgressCtrl],
    bindings: {
      game: '<'
    }
  });
