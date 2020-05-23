import { Play } from './Play';
import { Ticket } from './Ticket';

export default interface UserPlaysPopulator{
    userEdiblePlays:Play[],
    userLastBookedTicket:Ticket,
    bookedAvailablePlays:Play[]
}