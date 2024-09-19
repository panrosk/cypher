
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CFile } from '../../types/files.js';
import { emit } from '@tauri-apps/api/event';


@customElement('file-item')
export class FileItem extends LitElement {
  @property({ type: Object }) file: CFile | null = null;
  @state() isExpanded = false;

  static styles = css`
    .file-item {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      font-size: 14px;
       
    }
    .file-line {
      display: flex;
      gap: 8px;
      cursor: pointer;
      padding: 8px 0;
    }
  `;

  handleToggle() {
    this.isExpanded = !this.isExpanded;
  }

  async onFileClick(file: CFile | null) {
    if (file) {
      this.setCurrentFile(file)
    }
  }

  async setCurrentFile(file: CFile) {
    emit("set_current_file", {
      file: file
    });
  }

  render() {
    return html`
      <div class="file-item">
        ${this.file?.file_type === 'File'
        ? html`
              <div class="file-line" @click=${() => this.onFileClick(this.file)}>
                <cy-icon .icon=${this.file?.extension}></cy-icon>
                <span>${this.file?.relative_path}</span>
              </div>
            `
        : html`
              <div class="file-line" @click=${this.handleToggle}>
                <cy-icon .icon="Directory" .open=${this.isExpanded}></cy-icon>
                <span>${this.file?.relative_path}</span>
              </div>
              ${this.isExpanded && this.file?.sub && this.file?.sub.length > 0
            ? html`
                    <div class="file-item">
                      ${this.file.sub.map(
              (subFile) =>
                html`<file-item .file=${subFile}></file-item>`
            )}
                    </div>
                  `
            : ''}
            `}
      </div>
    `;
  }
}

