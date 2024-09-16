import { LitElement, html, css } from 'lit';
import { customElement, property } from "lit/decorators.js";

type Route = '/' | '/main';

@customElement('my-app')
export class MyApp extends LitElement {
  static styles = css`
  main {
      background-color:var(--theme-bg-color);
      color:var(--theme-text-color);
      overflow:hidden
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
    window.history.pushState({}, '', path);
    this.route = path;
  }

  render() {
    return html`
      
      <main>
        ${this.route === '/' ? html`<init-view></init-view>` : ''}
        ${this.route === '/main' ? html`<main-view></main-view>` : ''}
      </main>
    `;
  }
}


