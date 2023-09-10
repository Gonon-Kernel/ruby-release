function linksGenerator() {
	function anchor(displayName, linkName, variant) {
		const anchorTag = document.createElement('a');
		anchorTag.textContent = displayName;
		anchorTag.href = `https://github.com/Gonon-Kernel/ruby-release/releases/download/${linkName}/GononKernel-${linkName}${variant}-ruby-Stable-?.zip`;
		return anchorTag;
	}
	const linkSpan = document.createElement('span');
	linkSpan.append(
		anchor('KSU', 'R1', '-KSU'),
		anchor('non KSU', 'R1', '')
	);
	return linkSpan;
}


const styles = `
:host {
	display: block;
	padding-top: 0.5rem;
	margin: 5rem 1rem;
	background: var(--article);
	border-radius: 0.5rem;
	width: auto;
	animation: slide 0.5s ease-out;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

button {
	border-radius: 0.5rem;
	height: 2rem;
	color: var(--accent);
	background: none;
	border: none;
	font-size: inherit;
	font-family: "Geologica";
	transition: all 0.5s;
	user-select: none;
}

button:active {
	background-color: var(--accent);
	color: var(--text);
}

a {
	font-weight: bold;
	text-decoration: none;
	color: inherit;
}

span {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	color: var(--accent);
}

span:nth-of-type(1) {
	background-color: var(--article2);
	margin-top: -0.5rem;
	border-radius: 0.5rem 0.5rem 0 0;
}

span:nth-of-type(2) {
	padding-bottom: 1rem
}

ul {
	text-decoration: none;
	list-style-type: none;
	text-align: left;
	padding: 0 10vw;
	margin:0;
	height:0;
	overflow: hidden;
	transition: height 150ms ease-in-out;
}

`;


customElements.define('release-item', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" })

		const span = document.createElement('span');

		const version = document.createElement('p');
		const date = document.createElement('p');
		const changelogButton = document.createElement('button');
		changelogButton.textContent = 'Changelog';
		changelogButton.onclick = () => {
			const ul = this.shadowRoot.querySelector('ul');
			ul.style.height = ul.style.height ? '' : ul.scrollHeight + 'px';
		}
		span.append(
			version,
			date,
			changelogButton
		);
		const style = document.createElement('style');
		style.textContent = styles;

		const ul = document.createElement('ul');
		ul.appendChild(document.createElement('slot'))

		this.shadowRoot.append(
			style,
			span,
			ul,
			document.createElement('br'),
			linksGenerator()
		);
	}


	connectedCallback() {
		this.shadowRoot.querySelectorAll('p')[0].textContent = this.dataset.version;
		this.shadowRoot.querySelectorAll('p')[1].textContent = this.dataset.date.slice(0, -5);
		const links = this.shadowRoot.querySelectorAll('a');
		for (const link of links)
			link.href = link.href.replace('?', this.dataset.date);

	}

});