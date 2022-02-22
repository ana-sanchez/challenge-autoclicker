import { LitElement, html, css } from 'lit-element';

import { NormalizeCss } from '../styles/normalize.js';

export class HeaderPrimary extends LitElement{

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
      .header_nav--link {
        border: 1px solid var(--brown);
        border-radius: 3px;
        padding: 5px;
        font-size: .875rem;
        cursor:pointer;
      }

      `
    ]
  }

  render() {
    return html`
      <header class="header">
        <h2 class="header_title">Cookie clicker</h2>
        <nav class="header_nav">
          <ul>
            <li class="header_nav--link"><a aria-label="Go to login" aria-labelledby="Go to login" href="/">Exit</a></li>
            <li class="header_nav--link"><a aria-label="Go to ranking view" aria-labelledby="Go to login" href="/ranking">Ranking</a></li>
          </ul>
        </nav>

      </header>
    `;
  }

}

customElements.define('header-primary', HeaderPrimary);
