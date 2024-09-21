import { Store } from "@tauri-apps/plugin-store";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CFile } from "../types/files";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";

@customElement("main-view")
export class main_view extends LitElement {
  @property({ type: Object }) file: CFile | null = null;
  @property({ type: String }) viewer: "Markdown" | "Pdf" | "" = "";

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      background-color: var(--theme-bg-color);
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;
      color: var(--theme-text-color);
    }

    .sidebar {
      width: 250px;
      background-color: var(--theme-secondary-bg-color);
      padding: 10px;
    }

    .sidebar.left {
      border-right: 0.5px solid var(--theme-text-color);
    }

    pdf-viewer {
      width: 100%;
      height: 100%;
    }
    .main-content {
      flex: 1;
      background-color: var(--theme-bg-color);
      padding: 20px !important;
      border: 20px;
      overflow: scroll;
    }

    .sidebar.right {
      border-left: 0.5px solid var(--theme-text-color);
    }
  `;

  handleMarkdownChange(event: CustomEvent) {
    if (this.file && this.file.extension && this.file.extension.Markdown) {
      const updatedFile = {
        ...this.file,
        extension: {
          ...this.file.extension,
          Markdown: {
            ...this.file.extension.Markdown,
            content: event.detail,
          },
        },
      };

      this.file = updatedFile;
      invoke("save_files", { file: this.file });
    }
  }

  renderView() {
    switch (this.viewer) {
      case "":
        return html` <div>hola</div> `;

      case "Markdown":
        return html`
          <markdown-editor
            @markdown-changed=${this.handleMarkdownChange}
            .markdown=${this.file?.extension.Markdown.content}
          >
          </markdown-editor>
        `;

      case "Pdf":
        return html` <pdf-viewer .file=${this.file}></pdf-viewer> `;

      default:
        return html` <div>Viewer type not recognized.</div> `;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    const initializeStoreAndEvents = async () => {
      const store = new Store("store.bin");

      const val = await store.get("app_store");
      console.log(val);

      const currentFileListener = await listen("set_current_file", (event) => {
        let file: CFile = event.payload?.file;
        if (file) {
          this.file = file;

          if (typeof this.file.extension == "object") {
            const type = Object.keys(this.file.extension)[0];
            console.log(type);
            this.viewer = type;
          } else {
            this.viewer = file.extension;
          }
        }
      });
    };

    initializeStoreAndEvents();
  }

  render() {
    return html`
      <tool-bar class="tool-bar"></tool-bar>
      <div class="container">
        <div class="sidebar left">
          <file-system></file-system>
        </div>
        <div class="main-content">${this.renderView()}</div>
        <div class="sidebar right">right</div>
      </div>
    `;
  }
}
