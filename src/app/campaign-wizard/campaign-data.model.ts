export class CampaignData {
    public name: string;
    public budget: number;
    public bid: number;
    public start: string;
    public end: string;
    public devices: string[]

    constructor(
        name: string,
        budget: number,
        bid: number,
        start: string,
        end: string,
        devices: string[]
    ) {
        this.name = name,
        this.budget = budget,
        this.bid = bid,
        this.start = start,
        this.end = end
        this.devices = devices
    }
}