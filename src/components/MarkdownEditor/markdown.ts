import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import DOMPurify from "dompurify";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getCaretCoordinates } from "./utils";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import codetheme from "highlight.js/styles/github-dark.css?raw";
import markedFootnote from "marked-footnote";
import { invoke } from "@tauri-apps/api/core";

@customElement("markdown-editor")
export class MarkdownEditor extends LitElement {
  @property({ type: String }) markdown = "";

  @state() private edit = true;
  private renderedHTML = "";

  // Component styles
  static styles = css`
    .container {
      width: inherit;
      height: 90%;
      position: relative;
      overflow: hidden;
    }

    textarea {
      width: 100%;
      height: 100%;
      border: none;
      font-family: inherit;
      font-size: inherit;
      outline: none;
      overflow-x: hidden;
      overflow-y: scroll;
      box-sizing: border-box;
      background-color: inherit;
      color: inherit;
      padding: 20px;
    }

    .render {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 20px;
      box-sizing: border-box;
      background-color: inherit;
      color: inherit;
      word-wrap: break-word;
      white-space: normal;
    }

    #mirror {
      visibility: hidden;
      white-space: pre-wrap;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    #popup {
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
      z-index: 20;
    }

    .commands {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      border: none;
      padding: 10;
      margin: 0;
      background-color: inherit;
      color: inherit;
      font: inherit;
      cursor: pointer;
      outline: none;
    }

    ${unsafeCSS(codetheme)}
  `;

  protected render() {
    return html`
      <div class="container">
        <button class="commands" @click=${this.toggleEdit}>
          ${this.edit
            ? html`
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-markdown"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M9.146 8.146a.5.5 0 0 1 .708 0L11.5 9.793l1.646-1.647a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.5 5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5"
                  />
                  <path
                    d="M3.56 11V7.01h.056l1.428 3.239h.774l1.42-3.24h.056V11h1.073V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H2.5V11z"
                  />
                </svg>
              `
            : html`
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              `}
        </button>
        ${this.edit
          ? html`
              <textarea
                @keydown=${this.onKeyDown}
                .value=${this.markdown}
                @input=${this.onInput}
              ></textarea>
            `
          : html` <div class="render">${this.renderMarkdown()}</div> `}
      </div>
    `;
  }

  private toggleEdit() {
    this.edit = !this.edit;
    if (!this.edit) {
      const marked = new Marked(
        markedHighlight({
          langPrefix: "hljs language-",
          highlight(code, lang, _info) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
          },
        }),
      )
        .use(markedFootnote())
        .use({
          gfm: true,
        });
      const markdown_html = marked.parse(this.markdown);

      this.renderedHTML = DOMPurify.sanitize(markdown_html);
    }
  }

  private onInput(event: InputEvent) {
    const value = event.target.value as string;
    const text = this.parseOnInput(value as string);
    this.markdown = text;
    this.dispatchEvent(
      new CustomEvent("markdown-changed", {
        detail: this.markdown,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private parseOnInput(string: string) {
    if (string.endsWith("-")) {
      return string + " "; // Dash followed by a space for lists
    }

    if (string.endsWith("[")) {
      return string + "]"; // Complete the bracket for links or images
    }

    if (/\d\.$/.test(string)) {
      return string + " "; // Add space after number for ordered list
    }

    return string;
  }

  private onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        const textarea = event.target as HTMLTextAreaElement;
        const currentValue = textarea.value;

        const lines = currentValue.split("\n");

        const lastLine = lines[lines.length - 1];

        if (lastLine.trim().startsWith("-")) {
          event.preventDefault(); // Prevent default Enter key behavior

          const updatedValue = currentValue + "\n- ";

          textarea.value = updatedValue;

          textarea.setSelectionRange(updatedValue.length, updatedValue.length);
        }
        break;

      default:
        break;
    }
  }

  private renderMarkdown() {
    return html` ${unsafeHTML(this.renderedHTML)} `;
  }
}
