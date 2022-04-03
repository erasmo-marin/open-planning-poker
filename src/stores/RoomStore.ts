import { Player } from "../models/Player";
import ClientService from "../services/ClientService";
import HostService from "../services/HostService";
import { makeAutoObservable } from "mobx";
import gameStore from "./GameStore";

type HostAction =
  | "ADD_PLAYER"
  | "REMOVE_PLAYER"
  | "CREATE_NEW_VOTATION"
  | "UPDATE_VOTATION"
  | "VOTE"
  | "REVEAL_CARDS"
  | "SYNC_STATE";

type ClientAction = "ADD_PLAYER" | "VOTE";

type Action = {
  type: HostAction | ClientAction;
  value: any;
};

class RoomStore {
  isHost: boolean = false;
  client?: ClientService;
  host?: HostService;
  roomId?: string;
  connected: boolean = false;
  game = gameStore;

  constructor() {
    makeAutoObservable(this, { game: false });
  }

  *initClient(roomId: string) {
    this.roomId = roomId;
    this.client = new ClientService();
    yield this.client.connect(this.roomId, this.handleMessageFromHost);
    this.isHost = false;
    this.connected = true;
  }

  *initHost() {
    this.host = new HostService();
    this.roomId = yield this.host.connect();
    this.host.listen(this.handleMessageFromClient);
    this.connected = true;
    this.isHost = true;
  }

  parseActionMessage = (actionMessage: string) => {
    const decoded = JSON.parse(actionMessage);
    return {
      type: decoded?.type,
      value: decoded?.value,
    };
  };

  serializeActionMessage = (action: Action) => {
    return JSON.stringify(action);
  };

  execRoomAction = (action: Action) => {
    if (this.host) {
      this.execHostAction(action);
    } else if (this.client) {
      this.execClientAction(action);
    }
  };

  execHostAction = (action: Action) => {
    switch (action.type) {
      case "ADD_PLAYER":
        gameStore.registerNewPlayer(action.value as Player);
        break;
      case "REMOVE_PLAYER":
        break;
      case "CREATE_NEW_VOTATION":
        gameStore.startNewVotation();
        break;
      case "UPDATE_VOTATION":
        break;
      case "VOTE":
        const { player, vote } = action.value;
        gameStore.setVote(player, vote);
        break;
      case "REVEAL_CARDS":
        gameStore.setIsRevealed(action.value);
        break;
      default:
        console.warn("Unknown message received from host");
        break;
    }
    this.host?.broadcast(
      this.serializeActionMessage({
        type: "SYNC_STATE",
        value: {
          players: gameStore.players,
          votation: gameStore.votation,
          isRevealed: gameStore.isRevealed,
        },
      })
    );
  };

  execClientAction = (action: Action) => {
    switch (action.type) {
      case "ADD_PLAYER":
      case "VOTE":
        this.client?.send(this.serializeActionMessage(action));
        break;
      default:
        console.warn("Invalid client message type");
        break;
    }
  };

  handleMessageFromHost = (actionMessage: string) => {
    const { type, value } = this.parseActionMessage(actionMessage);
    switch (type) {
      case "SYNC_STATE":
        gameStore.setState(value);
        break;
      default:
        console.warn("Unknown message received from host");
        break;
    }
  };

  handleMessageFromClient = (actionMessage: string) => {
    const action = this.parseActionMessage(actionMessage);
    switch (action.type) {
      case "ADD_PLAYER":
      case "VOTE":
        this.execHostAction(action);
        break;
      default:
        console.warn("Unknown message received from host");
        break;
    }
  };
}

const room = new RoomStore();
export default room;
