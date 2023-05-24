import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-stats",
  templateUrl: "./card-stats.component.html",
  styleUrls: ['./card-stats.component.scss']
})
export class CardStatsComponent implements OnInit {
  @Input() loading = true;
  @Input()
  get statSubtitle(): string {
    return this._statSubtitle;
  }
  set statSubtitle(statSubtitle: string) {
    this._statSubtitle = statSubtitle === undefined ? "Traffic" : statSubtitle;
  }
  private _statSubtitle = "Traffic";

  @Input()
  get statTitle(): string {
    return this._statTitle;
  }
  set statTitle(statTitle: string) {
    this._statTitle = statTitle === undefined ? "" : statTitle;
  }
  private _statTitle = "";

 

  @Input()
  get statPercent(): string {
    return this._statPercent;
  }
  set statPercent(statPercent: string) {
    this._statPercent = statPercent === undefined ? undefined : statPercent;
  }
  private _statPercent = "";

  // can be any of the text color utilities
  // from tailwindcss
  @Input()
  get statPercentColor(): string {
    return this._statPercentColor;
  }
  set statPercentColor(statPercentColor: string) {
    this._statPercentColor =
      statPercentColor === undefined ? "text-emerald-500" : statPercentColor;
  }
  private _statPercentColor = "text-emerald-500";



  @Input()
  get statIconName(): string {
    return this._statIconName;
  }
  set statIconName(statIconName: string) {
    this._statIconName =
      statIconName === undefined ? "far fa-chart-bar" : statIconName;
  }
  private _statIconName = "far fa-chart-bar";

  // can be any of the background color utilities
  // from tailwindcss
  @Input()
  get statIconColor(): string {
    return this._statIconColor;
  }
  set statIconColor(statIconColor: string) {
    this._statIconColor =
      statIconColor === undefined ? "bg-red-500" : statIconColor;
  }
  private _statIconColor = "bg-red-500";

  constructor() {}

  ngOnInit(): void {}
}
