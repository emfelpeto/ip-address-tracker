import iconArrow from '../images/iconArrow.svg'

export function Form({handleForm, handleInput}) {
    return (
        <form className="header_form" onSubmit={handleForm}>
            <input
                type="text"
                name="search"
                placeholder="Search for any IP address or domain"
                onChange={handleInput} />
            <button type="submit">
                <img
                    src={iconArrow}
                    alt="Right arrow" />
            </button>
        </form>
    )
}