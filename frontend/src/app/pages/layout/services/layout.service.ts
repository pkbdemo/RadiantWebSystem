import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public smallLeftBar: boolean = false;
  public settingsVisible: boolean = false;
  public rightSidebarVisible: boolean = true;
  public darkLayout: boolean = false;
  public searchVisible: boolean = false;
  public currentTheme: string = "theme-blush";
  //新增盡職調查 右側顯示氣泡
  public InProfressCount: number = 0;

  public smallLeftBarShow: Subject<boolean> = new Subject<boolean>();
  public settingsShow: Subject<boolean> = new Subject<boolean>();
  public darkLayoutShow: Subject<boolean> = new Subject<boolean>();
  public rightSidebarShow: Subject<boolean> = new Subject<boolean>();
  public searchShow: Subject<boolean> = new Subject<boolean>();
  public themeChange: Subject<string> = new Subject<string>();
  public InProfressChange: Subject<number> = new Subject<number>();
  constructor() {
    // Left bar subscribers
    this.smallLeftBarShow.subscribe((value) => {
      this.smallLeftBar = value;
    });

    // Settings bar subscribers
    this.settingsShow.subscribe((value) => {
      this.settingsVisible = value;
    });

    // Dark Layout subscribers
    this.darkLayoutShow.subscribe((value) => {
      this.darkLayout = value;
    });

    // Right bar subscribers
    this.rightSidebarShow.subscribe((value) => {
      this.rightSidebarVisible = value;
    });

    // Search subscribers
    this.searchShow.subscribe((value) => {
      this.searchVisible = value;
    });

    // Theme Change subscribers
    this.themeChange.subscribe((value) => {
      this.currentTheme = value;
    });

    this.InProfressChange.subscribe((value) => {
      this.InProfressCount = value;
    });
  }

  /**
   * Left Bar Size Toggle Function
   */
  toggleLeftBar() {
    if (this.smallLeftBar) {
      this.smallLeftBarShow.next(false);
    } else {
      this.smallLeftBarShow.next(true);
    }
  }

  /**
   * settings Toggle Function
   */
  toggleSettings() {
    if (this.settingsVisible) {
      this.settingsShow.next(false);
    } else {
      this.settingsShow.next(true);
    }
  }

  /**
   * Dark Layout Function
   */
  turnDark() {
    this.darkLayoutShow.next(true);
  }

  /**
   * Light Layout Function
   */
  turnLight() {
    this.darkLayoutShow.next(false);
  }

  /**
   * Right Bar Size Toggle Function
   */
  toggleRightBar() {
    if (this.rightSidebarVisible) {
      this.rightSidebarShow.next(false);
    } else {
      this.rightSidebarShow.next(true);
    }
  }

  /**
   * Show Search Function
   */
  showSearch() {
    this.searchShow.next(true);
  }

  /**
   * Hide search Function
   */
  hideSearch() {
    this.searchShow.next(false);
  }

  changeTheme(theme) {
    this.themeChange.next(theme);
  }

  setInProfressCount(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getInProfressCount(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  removeInProfressCount(key) {
    return localStorage.removeItem(key);
  }
}
