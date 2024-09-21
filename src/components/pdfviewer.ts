import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CFile } from "../types/files";
import { readFile } from "@tauri-apps/plugin-fs";
import myviewer from "../public/pdfjs/web/viewer.html";
@customElement("pdf-viewer")
export class pdfviewer extends LitElement {
  @property({ type: Object }) file: CFile | null = null;
  static styles = [
    css`
      iframe {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  async connectedCallback(): void {
    super.connectedCallback();
    if (!this.file) {
      return;
    }

    const file_to_read = await readFile(this.file.path);
    const fileBlob = new Blob([file_to_read], { type: "application/pdf" });
    const fileUrl = URL.createObjectURL(fileBlob);

    const iframe = this.shadowRoot?.querySelector("iframe");
    const htmlUrl = new URL("../public/pdfjs/web/viewer.html", import.meta.url);
    console.log(htmlUrl);

    iframe.src = htmlUrl.href + `?file=${fileUrl}`;
  }

  render() {
    return html`<iframe id=""></iframe> `;
  }
}
