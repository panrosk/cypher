import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

type Route = "/" | "/main";

@customElement("my-app")
export class MyApp extends LitElement {
  static styles = css`
    main {
      overflow: hidden;
      height:100vh;
      width: 100vw;
    }
  `;

  @property({ type: String })
  route: Route = window.location.pathname as Route;

  constructor() {
    super();
  }

  firstUpdated() {
    window.onpopstate = () => {
      this.route = window.location.pathname as Route;
    };
  }

  public navigate(e: MouseEvent, path: Route) {
    e.preventDefault();
    window.history.pushState({}, "", path);
    this.route = path;
  }

  render() {
    return html`
      <main>
        ${this.route === "/main" ? html`<init-view></init-view>` : ""}
        ${this.route === "/" ? html`<main-view></main-view>` : ""}
      </main>
    `;
  }
}
