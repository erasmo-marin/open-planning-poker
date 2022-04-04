import { Player } from "./Player";
import { VotingScale } from "./VotingScale";

export type votationState = "STARTED" | "FINISHED";
export type Vote = { player: Player; vote: number | null };

export interface Votation {
  id: string;
  scale: VotingScale;
  votes: Array<Vote>;
  state: votationState;
}
