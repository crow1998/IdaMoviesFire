import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toHour"
})
export class ToHourPipe implements PipeTransform {
  transform(value: number): string {
    let returnValue = value.toString();

    if (value > 0 && value / 60 < 1) {
      returnValue = value + " Minutes";
    } else {
      const hours = parseInt((value / 60).toString(), 10);
      const minutes = value - hours * 60;

      returnValue =
        minutes > 9 ? `${hours}h:${minutes}m` : `${hours}h:0${minutes}m`;
    }

    return returnValue;
  }
}
