/* eslint-disable import/no-extraneous-dependencies */
import { css } from 'lit-element';

export const NormalizeCss = css `

* {
  box-sizing : border-box
 }

 html {
   font-size: 1rem;
   line-height: 1.15; /* 1 */
   -webkit-text-size-adjust: 100%; /* 2 */

 }
 body {
  margin: 0;
}
main {
  display: block;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
p {
  margin: 0;
}
hr {
  box-sizing: border-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}
b,
strong {
  font-weight: bolder;
}
img {
  border-style: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}
button,
input { /* 1 */
  overflow: visible;
}

button,
select { /* 1 */
  text-transform: none;
}
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  color: inherit;
  background-color: inherit;
  border: none;
}
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
fieldset {
  margin: 0;
  padding: 0;
  border: 0;
}

textarea {
  overflow: auto;
}
[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
.hidden {
  display: none;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

ol, ul {
	list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
a{
  cursor: pointer;
}

select:focus,
button:focus{
  outline: none;
}

blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar,
body::-webkit-scrollbar,
:host::-webkit-scrollbar,
main::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
html, body, :host, main{
  -ms-overflow-style: none;
}`;

export default NormalizeCss;
