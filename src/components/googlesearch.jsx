import '../App.css';

function GoogleSearch() {
    return (
        <span className="form" id="google-search" title="Search Google">
            <form method="GET" action="https://www.google.com/search?/" 
                autocomplete="off" target="_blank">
                <input type="text" name="q" id="input-google-search"/>
            </form>
        </span>
    );
}

export default GoogleSearch;