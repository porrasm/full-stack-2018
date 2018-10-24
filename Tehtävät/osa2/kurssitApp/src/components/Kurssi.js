import React from 'react'

const Kurssi = ({kurssi}) => {
    return(
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.nimi}</h1>
    )
}

const Sisalto = (props) => {

    const osat = props.osat.map(osaParameter => <Osa key={osaParameter.id} osa={osaParameter}/>)

    return (
        <div>
            {osat}
        </div>
    )
}
const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Yhteensa = ({osat}) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const total = osat.map(osa => osa.tehtavia).reduce(reducer)

    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

export default Kurssi