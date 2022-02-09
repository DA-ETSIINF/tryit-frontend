export class TimerType {
    seconds: string = "";
    minutes: string = "";
    hours: string = "";
    days: string = "";
    constructor(seconds: number){
        this.days = Math.floor(seconds / (3600 * 24)).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
        seconds = seconds % (3600 * 24);
        this.hours = Math.floor(seconds / 3600).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
        seconds = seconds % 3600;
        this.minutes = Math.floor(seconds / 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
        this.seconds = Math.floor(seconds % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
    };
}