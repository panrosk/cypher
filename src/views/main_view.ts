import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { Store } from '@tauri-apps/plugin-store';


@customElement('main-view')
export class main_view extends LitElement {


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

  async connectedCallback() {
    super.connectedCallback()
    // const store = new Store('store.bin');
    //
    // const val = await store.get('app_store');
    // console.log(val);


  }

  render() {
    const file = {
      "file_type": "Directory",
      "relative_path": "root",
      "sub": [
        {
          "file_type": "Directory",
          "relative_path": "folder1",
          "sub": [
            {
              "file_type": "File",
              "relative_path": "file1.txt",
              "extension": "txt"
            },
            {
              "file_type": "File",
              "relative_path": "file2.js",
              "extension": "js"
            }
          ]
        },
        {
          "file_type": "Directory",
          "relative_path": "folder2",
          "sub": [
            {
              "file_type": "File",
              "relative_path": "file3.html",
              "extension": "html"
            }
          ]
        },
        {
          "file_type": "File",
          "relative_path": "readme.md",
          "extension": "Markdown"
        }
      ]
    };



    return html`
  
  <div class="container">
    <div class="sidebar left">
      <file-system></file-system>
    </div>
    <div class="main-content">
      <markdown-editor></markdown-editor>
    </div>
    <div class="sidebar right">right</div>
  </div>
`;
  }
}

