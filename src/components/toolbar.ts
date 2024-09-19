import gsap from 'gsap';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tool-bar')
export class Toolbar extends LitElement {
  @property({ type: Boolean }) left_panel = true
  static styles = css`
    :host {
      display: block;
    }

    .container_toolbar {
      display: grid;
      grid-template-columns: 250px 1fr 250px;
      grid-template-areas: "left main right";
      height: 40px;
      background-color: var(--theme-secondary-bg-color);
      color: var(--theme-text-color);

    }

    .left_toolbar {
      grid-area: left;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-bottom: 0.5px solid var(--theme-text-color);
    }

    .main-content_toolbar {
      grid-area: main;
      display: flex;
      align-items: center;
      justify-content: center;

      border-bottom: 0.5px solid var(--theme-text-color);
    }

    .right_toolbar {
      grid-area: right;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-left: 0.5px solid var(--theme-text-color);
      border-bottom: 0.5px solid var(--theme-text-color);
    }
  `;

  sidebar_left_panel() {
    const panel = document.querySelector("my-app")?.shadowRoot?.querySelector("main-view")?.shadowRoot?.querySelector(".left");
    const main_content = document.querySelector("my-app")?.shadowRoot?.querySelector("main-view")?.shadowRoot?.querySelector(".main-content");
    const panel2 = document.querySelector("my-app")?.shadowRoot?.querySelector("main-view")?.shadowRoot?.querySelector(".right");
    // Obtenemos el ancho actual del main_content
    const currentWidth = main_content?.clientWidth || 0;
    const newWidth = this.left_panel ? currentWidth + 250 : currentWidth - 250;
    const tl = gsap.timeline();

    tl.to(panel as HTMLElement, {
      duration: 0.5,
      ease: "expo.out",
      xPercent: this.left_panel ? -100 : 0,
    }, 0)
      .to(main_content, {
        duration: 0.5,
        ease: "expo.out",
        x: this.left_panel ? "-100px" : 0,
      }, 0)



    this.left_panel = !this.left_panel;

    console.log(`New width: ${newWidth}px`);
  }

  render() {
    return html`
      <div class="container_toolbar">
        <div class="left_toolbar">
          <cy-icon @click=${this.sidebar_left_panel}  .icon=${"Sidebar"} ></cy-icon>
        </div>
        <div class="main-content_toolbar">

          Tabs
        </div>
        <div class="right_toolbar">
          Right
        </div>
      </div>
    `;
  }
}
