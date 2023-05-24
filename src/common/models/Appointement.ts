export class Appointement {
    id: any;
    created_at: string = "";
    end_time: string = "";
    reason: string ="";
    start_time: string ="";
    updated_at: string ="";
    patient: any;
    constructor(data: any){
        this.id = data.id;
        this.reason = data.attributes.reason;
        this.start_time =  data.attributes.start_time;
        this.end_time = data.attributes.end_time;
        this.created_at = data.attributes.created_at;
        this.updated_at = data.attributes.updated_at;
        this.patient = data.relationships
    }

    checkDateOfEvent(year: number, month: number){
        const start = new Date(this.start_time);
           
        if(start.getMonth() == month && start.getFullYear() == year){
            return true;
        }
        return false;
    }

    getDay(){
        const start = new Date(this.start_time);
        return start.getDate()
    }

    getStartTime(){
        const time = new Date(this.start_time);
        time.getTime()
    }
    getEndTime(){
        const time = new Date(this.end_time)
        
        time
    }
}