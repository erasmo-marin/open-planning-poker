import { Player } from "./Player";
import { VotingScale } from "./VotingScale";

export type Vote = { player: Player; vote: number | null };

export interface Votation {
  id: string;
  scale: VotingScale;
  players: Array<Player>;
  votes: Array<Vote>;
}
