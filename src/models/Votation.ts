import { Player } from "./Player";
import { VotingScale } from "./VotingScale";

export interface Votation {
  id: number;
  scale: VotingScale;
  players: Array<Player>;
  votes: Array<{ player: Player; vote: number }>;
}
