import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0
        }
    }

    Arvostele = (newValue, arvostelu) => {
        return() => {
            this.setState({ [arvostelu]: newValue })
        }
    }

    napit() {
        return (
            <div>
                <Button onClick={this.Arvostele(this.state.hyvä + 1, "hyvä")} teksti="hyvä" />
                <Button onClick={this.Arvostele(this.state.neutraali + 1, "neutraali")} teksti="neutraali" />
                <Button onClick={this.Arvostele(this.state.huono + 1, "huono")} teksti="huono" />
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>

                {this.napit()}

                <h1>statistiikka</h1>

                {Statistics(this.state)}

            </div>
        )
    }
}

const Statistics = (props) => {

    if (Palautteita(props) === 0) {
        return(
            <p>ei yhtään palautetta annettu</p>
        )
    } else {
        return (
            <div>
                <Statistic teksti="hyvä" arvo={props.hyvä} />
                <Statistic teksti="neutraali" arvo={props.neutraali} />
                <Statistic teksti="huono" arvo={props.huono} />
                <Statistic teksti="keskiarvo" arvo={Keskiarvo(props)} />
                <Statistic teksti="positiivisia" arvo={Positiivisia(props)} />
            </div>
        )
    }
}
const Statistic = ({ teksti, arvo}) => {
    return(
        <p>{teksti} {arvo}</p>
    )
}

const Button = ({ onClick, teksti }) => (
    <button onClick={onClick}>
        {teksti}
    </button>
)

const Palautteita = (props) => {
    return (props.hyvä + props.neutraali + props.huono)
}
const Keskiarvo = (props) => {
    const ka = 1.0 * (props.hyvä * 1 + props.huono * -1) / Palautteita(props)
    return Math.round(ka * 10) / 10
}
const Positiivisia = (props) => {
    const pos = 1.0 * (props.hyvä) / (props.hyvä + props.neutraali + props.huono)
    return (Math.round(pos * 1000) / 10) + "%"
}

ReactDOM.render(<App />, document.getElementById('root'));


