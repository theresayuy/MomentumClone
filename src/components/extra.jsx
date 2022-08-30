import '../App.css';

function BlankSpace() {
    return <div className="BlankSpace"></div>; 
}

function TabSpace() {
    return <div className="TabSpace"></div>;
}

function Modal(props) {
    return (
        <p id={props.id}>Modal!!!</p>
    );
}

export {BlankSpace, TabSpace, Modal};