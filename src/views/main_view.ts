import { Store } from '@tauri-apps/plugin-store';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { CFile } from '../types/files';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
@customElement('main-view')
export class main_view extends LitElement {
  @property({ type: Object }) file: CFile | null = null;
  @property({ type: String }) markdown: string = "pepitc";

  static styles = [
    css`

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

  

        .container {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          flex: 1; 

        }

        .main-content {
          flex: 0 0 50vw; 
        }

  

    `
  ];


  handleMarkdownChange(event: CustomEvent) {

    if (this.file && this.file.extension && this.file.extension.Markdown) {
      const updatedFile = {
        ...this.file,
        extension: {
          ...this.file.extension,
          Markdown: {
            ...this.file.extension.Markdown,
            content: event.detail

          }
        }
      };

      this.file = updatedFile;
      invoke("save_files", { file: this.file })

    }
  }


  connectedCallback() {
    super.connectedCallback();

    const initializeStoreAndEvents = async () => {
      const store = new Store('store.bin');

      const val = await store.get('app_store');
      console.log(val);

      const currentFileListener = await listen('set_current_file', (event) => {
        let file: CFile = event.payload?.file;
        if (file) {
          this.file = file;
        }
      });

    };


    initializeStoreAndEvents();


  }

  render() {

    return html`
  
  <div class="container">
    <div class="sidebar left">
      <file-system></file-system>
    </div>
    <div class="main-content">
      <markdown-editor
      @markdown-changed=${this.handleMarkdownChange}
          .markdown=${this.file?.extension.Markdown.content}>
      </markdown-editor>
    </div>
    <div class="sidebar right">right</div>
  </div>
`;
  }
}

