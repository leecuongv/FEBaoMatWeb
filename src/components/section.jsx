
const Section = props => {
    return (
        <div className="section">
            {props.children}
        </div>
    )
}

export const SectionHeading = props => {
    return (
        <div className="section__heading">
            {props.children}
        </div>
    )
}

export const SectionBody = props => {
    return (
        <div className="section__body">
            {props.children}
        </div>
    )
}

export default Section