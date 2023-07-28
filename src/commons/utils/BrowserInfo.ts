export default class BrowserInfo {
  readonly userAgent: string;

  readonly platform: string;

  readonly desktopPlatforms = "win16|win32|win64|mac|macintel";

  readonly appName: string;

  readonly origin: string;

  readonly hostname: string;

  readonly href: string;

  readonly isMobile: boolean;

  readonly platformType: "ANDROID" | "IOS" | "MOBILE" | "PC";

  readonly isSafari: boolean;

  readonly isFirefox: boolean;

  readonly isChrome: boolean;

  readonly browserName: string;

  constructor() {
    const { userAgent, platform, appName } = window.navigator;
    const { origin, protocol, hostname, port, href } = window.location;

    this.userAgent = userAgent;
    this.platform = platform;
    this.appName = appName;
    this.origin = origin || `${protocol}//${hostname}:${port}`;
    this.hostname = hostname;
    this.href = href;
    this.isMobile = this.checkMobileAgent().any() || this.checkMobilePlatform();
    this.platformType = this.checkMobileAgent().get();

    const browserName = this.getBrowserName();
    this.isSafari = browserName === "safari";
    this.isFirefox = browserName === "firefox";
    this.isChrome = browserName === "chrome";
    this.browserName = browserName;
  }

  private getBrowserName(): string {
    let browser = "";
    const { userAgent, appName } = this;
    const userAgentToLowerCase = userAgent.toLowerCase();

    if (
      appName === "Microsoft Internet Explorer" ||
      userAgentToLowerCase.indexOf("trident") > -1 ||
      userAgentToLowerCase.indexOf("edge/") > -1
    ) {
      browser = "ie";
      if (appName === "Microsoft Internet Explorer") {
        browser += 10;
      } else if (userAgentToLowerCase.indexOf("trident") > -1) {
        browser += 11;
      } else if (userAgentToLowerCase.indexOf("edge/") > -1) {
        browser = "edge";
      }
    } else if (userAgentToLowerCase.indexOf("safari") > -1) {
      if (userAgentToLowerCase.indexOf("opr") > -1) {
        browser = "opera";
      } else if (userAgentToLowerCase.indexOf("chrome") > -1) {
        browser = "chrome";
      } else {
        browser = "safari";
      }
    } else if (userAgentToLowerCase.indexOf("firefox") > -1) {
      browser = "firefox";
    }

    return browser;
  }

  private checkMobilePlatform(): boolean {
    return this.desktopPlatforms.indexOf(this.platform.toLowerCase()) < 0;
  }

  private checkMobileAgent() {
    const { userAgent } = this;

    return {
      Android: () => {
        return userAgent.match(/Android/i) != null;
      },
      BlackBerry: () => {
        return userAgent.match(/BlackBerry/i) != null;
      },
      IOS: () => {
        return userAgent.match(/iPhone|iPad|iPod/i) != null;
      },
      Opera: () => {
        return userAgent.match(/Opera Mini/i) != null;
      },
      Windows: () => {
        return userAgent.match(/IEMobile/i) != null;
      },
      any: () => {
        return (
          this.checkMobileAgent().Android() ||
          this.checkMobileAgent().BlackBerry() ||
          this.checkMobileAgent().IOS() ||
          this.checkMobileAgent().Opera() ||
          this.checkMobileAgent().Windows()
        );
      },
      get: () => {
        if (this.checkMobileAgent().Android()) {
          return "ANDROID";
        } else if (this.checkMobileAgent().IOS()) {
          return "IOS";
        } else if (this.checkMobileAgent().any()) {
          return "MOBILE";
        } else {
          return "PC";
        }
      },
    };
  }
}
