export interface Play {
  id: number;
  playName: string;
  availableDate: string;
  playDate: string;
  registerDate?: string;
  link: string;
  ticketsNumber: number;
  // ticketDTOList: [];
  availableTicketsNumber: number;
}
