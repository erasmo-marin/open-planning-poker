import { VotingScale } from "./../models/VotingScale";
import { Votation } from "./../models/Votation";
import { Player } from "./../models/Player";
//import RoomService from '../services/RoomService';
import { makeAutoObservable } from "mobx";

//const roomService = new RoomService();

const defaultScale: VotingScale = {
  label: "Default",
  value: [0, 1, 2, 3, 5, 8, 13, 21, 44],
};

const defaultPlayers = [
  {
    id: 1,
    name: "Chalo",
  },
  {
    id: 2,
    name: "Brayan",
  },
  {
    id: 3,
    name: "Ender",
  },
  {
    id: 4,
    name: "Ro",
  },
  {
    id: 5,
    name: "Julian",
  },
  {
    id: 6,
    name: "Sebas",
  },
  {
    id: 7,
    name: "Sergio",
  },
  {
    id: 8,
    name: "Rafa",
  },
];

const defaultVotation: Votation = {
  id: 1,
  scale: defaultScale,
  players: defaultPlayers,
  votes: [
    {
      player: defaultPlayers[0],
      vote: 2,
    },
    {
      player: defaultPlayers[1],
      vote: 5,
    },
    {
      player: defaultPlayers[2],
      vote: 13,
    },
    {
      player: defaultPlayers[3],
      vote: 21,
    },
    {
      player: defaultPlayers[4],
      vote: 13,
    },
    {
      player: defaultPlayers[5],
      vote: 44,
    },
    {
      player: defaultPlayers[6],
      vote: 5,
    },
    {
      player: defaultPlayers[7],
      vote: 0,
    },
  ],
};

class GameStore {
  me?: Player;
  players: Array<Player> = defaultPlayers;
  votation?: Votation = defaultVotation;
  hostId?: string;

  constructor() {
    makeAutoObservable(this);
  }

  startNewVotation = () => {
    this.votation = {
      id: new Date().valueOf(),
      scale: defaultScale,
      players: this.players,
      votes: [],
    };
  };

  registerNewPlayer = ({ id, name }: { id: number; name: string }) => {
    this.players.push({
      id,
      name,
    });
  };

  registerVote = () => {};

  get votationAverage() {
    return 0;
  }

  get missingVotes() {
    return 0;
  }
}

const gameStore = new GameStore();
export default gameStore;
