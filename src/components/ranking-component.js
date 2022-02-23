/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

import { NormalizeCss } from '../styles/normalize.js';

import { getData } from '../service/app-service.js';

import '../UI/header-secondary.js';
import '../UI/card-ranking.js';

export class RankingComponent extends LitElement {
  static get properties() {
    return {
      allUsers: {type: Array},
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
        background-color: var(--bg_color);
      }
      .wrapper {
        background-color: var(--bg_color);
        max-height: var(--app-height);
        height:100%;
        overflow: scroll;
      }
      header-secondary {
        position: fixed;
        width: 100%;
        background-color: var(--bg_color);
      }
      .main {
        max-width: 500px;
        min-width: 320px;
        width:100%;
        margin: 0 auto;
        padding: 76px 0 20px 0;
      }
      .main_list {
        gap: 20px;
        padding: 5px;
        height: calc(var(--app-height) - 97px);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
        padding:5px;
      }
    `
    ];
  }

  constructor() {
    super();
    this.allUsers = [];
  }

  render() {
    return html`
    <div class="wrapper">
      <header-secondary page="Ranking"></header-secondary>
      <main class="main">
          ${this.allUsers.length
            ? html `<ul class="main_list">${this.setMainContent(this.allUsers)}</ul>`
            : html `<p>No results</p>`}
      </main>
    </div>
    `;
  }

  async firstUpdated() {
    await new Promise((r) => setTimeout(r, 100));
    getData('user-db', 'user')
    .then(res => {
      if(res) {
        this.allUsers = res;
        this.requestUpdate();
      }
    })
  }

  setMainContent(users) {
    if(users.length) {
      return html `${users.map(user => html `<li><card-ranking .user="${user}" autoclickers="${user.progress[0]}" megaclickers="${user.progress[0]}"></card-ranking></li>`)}`
    }
  }
}
customElements.define('ranking-component', RankingComponent);
