export interface Play {
    id: number,
    playName: string,
    availableDate: string,
    playDate: string,
    registeredDate?: string,
    link: string,
    ticketsNumber: number,
    availableTicketsNumber: number,
    bookedTicketsNumber: number,
    imageUrl: string,
}