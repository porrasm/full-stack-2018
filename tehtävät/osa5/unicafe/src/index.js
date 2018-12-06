import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import statsReducer from './statsReducer'

const store = createStore(statsReducer)

class App extends React.Component {

    Arvostele = (arvostelu) => {

        const action = {
            type: "ZERO"
        }

        switch(arvostelu) {
            case "hyvä":
                action.type = "GOOD"
                break
            case "neutraali":
                action.type = "OK"
                break
            case "huono":
                action.type = "BAD"
                break
            case "nollaa":
                action.type = "ZERO"
                break
            default:
        }

        return store.dispatch(action)
    }

    napit() {
        return (
            <div>
                <Button onClick={() => this.Arvostele("hyvä")} teksti="hyvä" />
                <Button onClick={() => this.Arvostele("neutraali")} teksti="neutraali" />
                <Button onClick={() => this.Arvostele("huono")} teksti="huono" />
            </div>
        )
    }

    render() {
        const state = store.getState()
        const values = {
            hyvä: state.good,
            neutraali: state.ok,
            huono: state.bad
        }

        return (
            <div>
                <h1>anna palautetta</h1>

                {this.napit()}

                <h1>statistiikka</h1>

                {Statistics(values)}

                <Button onClick={() => this.Arvostele("nolllaa")} teksti="nollaa" />

            </div>
        )
    }
}

const StatisticsOld = (props) => {

    if (Palautteita(props) === 0) {
        return(
            <p>ei yhtään palautetta annettu</p>
        )
    } else {
        return (
            <div>
                <Statistic teksti="hyvä" arvo={store.hyvä} />
                <Statistic teksti="neutraali" arvo={props.neutraali} />
                <Statistic teksti="huono" arvo={props.huono} />
                <Statistic teksti="keskiarvo" arvo={Keskiarvo(props)} />
                <Statistic teksti="positiivisia" arvo={Positiivisia(props)} />
            </div>
        )
    }
}
const Statistics = (values) => {

    

    if (Palautteita(values) === 0) {
        return(
            <p>ei yhtään palautetta annettu</p>
        )
    } else {
        return (
            <table>
                <tbody>
                <StatisticRow teksti="hyvä" arvo={values.hyvä} />
                <StatisticRow teksti="neutraali" arvo={values.neutraali} />
                <StatisticRow teksti="huono" arvo={values.huono} />
                <StatisticRow teksti="keskiarvo" arvo={Keskiarvo(values)} />
                <StatisticRow teksti="positiivisia" arvo={Positiivisia(values)} />
                </tbody>
            </table>
        )
    }
}

const Statistic = ({ teksti, arvo}) => {
    return(
        <p>{teksti} {arvo}</p>
    )
}
const StatisticRow = ({ teksti, arvo}) => {
    return(
        <tr>
            <td>{teksti}</td>
            <td>{arvo}</td>
        </tr>
    )
}

const Button = ({ onClick, teksti }) => (
    <button onClick={onClick}>
        {teksti}
    </button>
)

const Palautteita = (values) => {
    return (values.hyvä + values.neutraali + values.huono)
}
const Keskiarvo = (valuse) => {
    const ka = 1.0 * (valuse.hyvä * 1 + valuse.huono * -1) / Palautteita(valuse)
    return Math.round(ka * 10) / 10
}
const Positiivisia = (values) => {
    const pos = 1.0 * (values.hyvä) / (values.hyvä + values.neutraali + values.huono)
    return (Math.round(pos * 1000) / 10) + "%"
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}
renderApp()

store.subscribe(renderApp)