import './Header.css';

export function Header({onOpen}) {
    return (
        <header>
            <h1>Process Library</h1>
            <button onClick={onOpen}>Create New</button>
        </header>
    );
}