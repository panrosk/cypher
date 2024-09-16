import { open } from '@tauri-apps/plugin-dialog';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { invoke } from '@tauri-apps/api/core';

@customElement('open-dir')
export class opendir extends LitElement {
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
        outline:none;
      }
      .button-info p {
        margin-top:-10px
      }
    `
  ];

  private async onClickOpen() {
    const file = await open({
      multiple: false,
      directory: true,
    });

    invoke("set_current_dir", { dir: file })

    const my_app = document.querySelector("my-app") as any;
    my_app.route = "/main"
  }


  render() {
    return html`
      <div class="container"> 
        <div class="button-info">
            <h2>Open a new folder</h2>
            <p>Choose an existing folder as your crypt</p>
        </div>
        <div>
          <button aria-hidden="true" @click=${this.onClickOpen}>Open.</button>
        </div>
      </div>
    `;
  }
}

