/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

import { NormalizeCss } from '../styles/normalize.js';

import { getData} from '../service/app-service.js';

import '../UI/header-secondary.js';
import '../UI/card-ranking.js';

export class RankingComponent extends LitElement {
  static get properties() {
    return {
      allUsers: {type: String},
      user: {type: String}
    };
  }

  static get styles() {
    return [
      NormalizeCss,
      css`
      :host {
        max-width: 360px;
        width:100%;
        margin: 0 auto;
      }
      .wrapper {
        height: var(--app-height);
      }
      .main {
        max-width: 500px;
        min-width: 360px;
        width:100%;
        margin: 0 auto;
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        gap:20px;
        padding: 20px;
      }
      .main_list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding:5px;
      }
    `
    ];
  }

  constructor() {
    super();
    this.users = [];
  }

  render() {
    return html`
    <div class="wrapper">
      <header-secondary></header-secondary>
      <main class="main">
        <ul class="main_list">
          ${this.allUsers
            ? html `${this.setMainContent(this.allUsers)}`
            : html `<p>No results</p>`
        }
        </ul>
      </main>
    </div>
    `;
  }

  onAfterEnter() {
    getData('user-db', 'user')
    .then(res => {
      if(res) {
        this.allUsers = res;
        this.requestUpdate()
      }
    })
  }

  setMainContent(users) {
    return html `
      ${users.map(user => html `<li><card-ranking .user="${user}"></card-ranking></li>`)}
    `
  }
}
customElements.define('ranking-component', RankingComponent);
