import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('create-dir')
export class createdir extends LitElement {
  static styles = [
    css`
      .container {
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        width: 100%;
        margin:40px;
      }

      button {
        background-color:var(--theme-el-bg-color);
        color:var(--theme-el-text-color);
        width:150px;
        height:40px;
        margin-right:40px;
        border-radius:500px;
      }
      .button-info p {
        margin-top:-10px
      }
    `
  ];

  render() {
    return html`
      <div class="container"> 

        <div class="button-info">
            <h2>Create new crypt.</h2>
            <p>Create a new crypt under a folder. </p>
        </div>
     

        <div>
          <button>Create.</button>
        </div>
     

      </div>
    `;
  }
}

