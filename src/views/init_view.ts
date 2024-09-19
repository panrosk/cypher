import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js'

@customElement('init-view')
export class init_view extends LitElement {
  static styles = [
    css`

      .container {
          width: inherit;
          height: 100vh;
          
      }

      .logo {
        position:absolute;
        top:0;
        left:0;
        padding:40px

      }

      .screen {
        width: inherit;
        height:100%;
        display:flex;
        flex-direction:row;

      }

      .left_container {
        width:25vw;
        height:inherit;
        border-right: 2px solid;
        display: flex;
        flex-direction:column;
        justify-content:center;
        padding-left:40px;
      }

      .right_container {
        width:75vw;
        height:100%;
        display: flex;
        flex-direction:column;
        justify-content:center;
        place-items:center;
        background-color:var(--theme-secondary-bg-bolor);
        padding-right:40px
      }

      .commands {
        width:100%
      }

      h1 {
        font-size: var(--header-size)
      }
    `
  ];

  render() {
    return html`
      <div class="container">
        <div class="logo">
          logo
        </div>
        <div class="screen">
          <div class="left_container ">
            <div>
              <h1 class="">Cypher</h1>
              <p>
                Open Source Knowledge <br> Management  for all.
              </p>
            </div>
          </div>
          <div class="right_container ">
            <div class="commands">
              <open-dir></open-dir>
              <create-dir></create-dir>
            </div>
          </div>
        </div>

      </div>

    `;
  }
}

