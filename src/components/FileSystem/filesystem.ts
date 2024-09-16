import { Store } from '@tauri-apps/plugin-store';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { CFile } from '../../types/files.js';


@customElement('file-system')
export class file_system extends LitElement {
  @property({ type: Object }) file: CFile | null = null;


  static styles = [
    css`
    .container {
      overflow-y: scroll;
      height: 100vh;
      margin-top:40px;
      margin-bottom:40px;
    }
    .container2 {
      
      margin-top:20px;
      margin-bottom:40px;
    }

    `
  ];



  async connectedCallback() {
    super.connectedCallback()
    const store = new Store('store.bin');

    const val = await store.get('app_store');
    this.file = val.current_files_on_directory[0]
    console.log(this.file)

  }


  render() {
    return html`
      <div class="container">
        <div class="container2">
          ${this.file?.sub?.map((file) => html`<file-item .file=${file}></file-item>`)}




        </div>
      </div>
    `;
  }
}

