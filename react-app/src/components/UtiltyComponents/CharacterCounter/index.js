import { useState } from "react";

function CharacterCounter ({characters, characterLimit}) {
    const [charactersLeft, setCharactersLeft] = useState(characterLimit - characters)
    return (
        <div>
            <p>{charactersLeft}</p>
        </div>
    )
}

export default CharacterCounter;