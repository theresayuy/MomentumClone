import React, {useState} from 'react';

import './style.css';
import { toggleActive } from './utils';

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
        <div className="GoogleSearch" title="Search Google">
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
        </div>
    );
}

export default GoogleSearch;