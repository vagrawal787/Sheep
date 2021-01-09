class ConflictPage extends React.Component {
    render() {
        return (
            <div>
                <span className={this.props.show ? 'show' : ''}> Uh-oh, make sure you have an input in all fields! </span>
                <span className={this.props.match ? 'match' : ''}> Uh-oh, that ID is taken! Please try another one. </span>
            </div>
        )
    }
}

export default ConflictPage;