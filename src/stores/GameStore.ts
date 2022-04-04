import { votationState } from "./../models/Votation";
import { VotingScale } from "../models/VotingScale";
import { Votation } from "../models/Votation";
import { Player } from "../models/Player";
import { makeAutoObservable } from "mobx";

const defaultScale: VotingScale = {
  label: "Default",
  value: [0, 1, 2, 3, 5, 8, 13, 21, 44],
};

class GameStore {
  me?: Player;
  players: Array<Player> = [];
  votation?: Votation;

  constructor() {
    makeAutoObservable(this);
    this.startNewVotation();
  }

  startNewVotation() {
    this.votation = {
      id: String(new Date().valueOf()),
      scale: defaultScale,
      state: "STARTED",
      votes: this.players.map((player) => ({
        player,
        vote: null,
      })),
    };
  }

  setScale(scale: VotingScale) {
    if (this.votation) this.votation.scale = scale;
  }

  setVote(player: Player, value: number) {
    if (!this.votation) return;
    const vote = this.votation.votes.find(
      (vote) => vote.player.id === player.id
    );
    if (vote) vote.vote = value;
  }

  setMe(me: Player) {
    this.me = me;
  }

  registerNewPlayer(player: Player) {
    this.players.push(player);
    if (this.votation) {
      this.votation.votes.push({ vote: null, player });
    }
  }

  registerVote(player: Player, value: number) {
    const foundVote = this.votation?.votes.find(
      (vote) => vote.player.id === player.id
    );
    if (foundVote) foundVote.vote = value;
  }

  setVotationState(state: votationState) {
    if (this.votation) this.votation.state = state;
  }

  finishVotation = () => {
    if (this.votation) this.votation.state = "FINISHED";
  };

  setState({
    players,
    votation,
  }: {
    players: Array<Player>;
    votation: Votation;
  }) {
    this.players = players;
    this.votation = votation;
  }

  get validVotesCount() {
    return (
      this.votation?.votes.filter((vote) => vote.vote !== null).length || 0
    );
  }

  get votationAverage() {
    if (!this.votation) return 0;
    const votes = this.votation.votes
      .filter((vote) => vote.vote !== null)
      .map((vote) => vote.vote);
    const sum = (votes as Array<number>).reduce((a, b) => a + b, 0);
    return sum / votes.length;
  }
}

const gameStore = new GameStore();
export default gameStore;
