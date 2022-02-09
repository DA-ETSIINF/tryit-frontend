export class TimerType {
    seconds: number = 0;
    minutes: number = 0;
    hours: number = 0;
    days: number = 0;
    constructor(seconds: number){
        this.days = Math.floor(seconds / (3600 * 24));
        seconds = seconds % (3600 * 24);
        this.hours = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        this.minutes = Math.floor(seconds / 60)
        this.seconds = Math.floor(seconds % 60);
    };
}