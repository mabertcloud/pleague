import { Filter } from '../entities';

export default class player extends Filter {
  filter(player_id) {
    if (!player_id) return;

    let player = Players.findOne({ _id: player_id });
    return JSON.stringify(player.players);
  }
}
