import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/components/login-component.js';
import '../src/components/game-component.js';
import '../src/components/ranking-component.js';
import '../src/UI/input-default.js';
import '../src/UI/button-default.js';
import '../src/UI/header-primary.js';
import '../src/service/app-service.js';


describe('LoginComponent', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<login-component></login-component>`);
  });

  it('renders a header', () => {
    const header = element.shadowRoot.querySelector('header');
    expect(header).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('GameComponent', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<game-component></game-component>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('InputDefault', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<input-default></input-default>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('ButtonDefault', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<button-default></button-default>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('HeaderPrimary', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<header-primary></header-primary>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('RankingComponent', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<ranking-component></ranking-component>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
