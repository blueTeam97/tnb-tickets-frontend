import { Play } from './Play';

export interface Ticket {
    id: number;
    userId: number;
    playId: number;
    status: string;
    bookDate: string;
    pickUpDate: string;
    playDTO : Play;
    email? : String;
}
