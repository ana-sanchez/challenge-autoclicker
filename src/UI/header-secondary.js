import { LitElement, html, css } from 'lit-element';

import { NormalizeCss } from '../styles/normalize.js';

export class HeaderSecondary extends LitElement{
  static get properties() {
    return {
      page: {type: String}
    };
  }

  static get styles() {
    return [
      NormalizeCss,
      css`
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px 20px 20px;
        max-width: 600px;
        width: 100%;
        margin: 0px auto;
        border-bottom: 1px solid rgb(206, 200, 200);
      }
      .header_title {
        width:100%;
        font-size:1.313rem;
        color: var(--black);
        font-family: var(--font);
        font-weight:700;
      }
      .header_nav > * {
        display:inline-flex;
        gap:10px;
      }
      .header_nav--button {
        border: 1px solid var(--brown);
        border-radius: 3px;
        padding: 5px;
        font-size: .875rem;
        cursor:pointer;
      }
      `
    ]
  }

  constructor() {
    super();
    this.page = '';
  }

  render() {
    return html`
      <header class="header">
        <h2 class="header_title">${this.page}</h2>
        <button type="button" class="header_nav--button" aria-label="Go back" aria-labelledby="Go back" @click="${() => window.history.back()}">Back</button>
      </header>
    `;
  }

}

customElements.define('header-secondary', HeaderSecondary);
