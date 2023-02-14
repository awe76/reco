import { memo } from 'react';
import './Header.css';

export const Header = memo(function Header({onOpen}) {
    return (
        <header>
            <h1>Process Library</h1>
            <button onClick={onOpen}>Create New</button>
        </header>
    );
});