import '../App.css';
import {Modal} from './extra';

function LinksModal() {
    return <p>Links Modal</p>
}

function LinksButton() {
    return (
        <span className="LinksButton">
            <button id="links-btn">LINKS</button>
        </span>
    );
}

export {LinksButton, LinksModal};