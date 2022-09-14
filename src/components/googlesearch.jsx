import React, {useState} from 'react';
import '../App.css';

function toggleActive(isActive) {
    return (isActive) ? "" : "-active";
}

function GoogleSearch() {
    const [searchState, renderSearch] = useState({
        id: "input-google-search"
    });
    const toggleFocus = () => {
        renderSearch({
            id: `input-google-search${toggleActive(
                searchState.id.indexOf("active") > -1
            )}`
        });
    }

    return (
        <span className="form" title="Search Google" id="google-search">
            <form method="GET" action="https://www.google.com/search?/" 
                autoComplete="off" target="_blank">
                <input 
                    type="text" 
                    name="q" 
                    id={searchState.id}
                    placeholder="Search Google"
                    onFocus={toggleFocus}
                    onBlur={toggleFocus}
                />
            </form>
        </span>
    );
}

export default GoogleSearch;