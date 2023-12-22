import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import Timer from '../Timer'
import './index.css'
import { Player } from './styledComponents'



const FirstPage = () => {
    const [name, setName] = useState('')
    const [speed, setSpeed] = useState('')
    const [startTime, setStartTime] = useState('')
    const [runnerList, setRunnerList] = useState([])
    const [isRaceStarted, setIsRaceStarted] = useState(false)

    const onChangeName = e =>  setName(e.target.value)

    const onChangeSpeed = e => setSpeed(e.target.value)


    const onChangeTime = e => setStartTime(e.target.value)
    

    const onSubmitForm = (event) => {
        event.preventDefault()
        const newRunner = {
            id: uuidv4(),
            name,
            speed,
            startTime
        }
        setName('')
        setSpeed('')
        setStartTime('')
        setRunnerList(prevState => [...prevState, newRunner])
    }

    const onClickStartRace = () => {
        setIsRaceStarted(true)
    }

    const renderFirstPage = () => (
            <div className='main-container'>
            <form onSubmit={onSubmitForm} className='runner-details-container'>
                <div>
                    <h1 className='heading'>RUNNER DETAILS</h1>
                    <p className='para'>* You can add max 10 participants</p>
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='name'>Name</label>
                    <input className='input' id='name' type='text' value={name} onChange={onChangeName} required placeholder='Enter Name' />
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='speed'>Speed</label>
                    <input className='input' id='speed' type="text" value={speed} onChange={onChangeSpeed} required placeholder='Enter speed' />
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='time'>Start Time</label>
                    <input className='input' id='time' type="text" value={startTime} onChange={onChangeTime} required placeholder='Enter Time' />
                </div>
                <button type='submit' className='button' >+ ADD RUNNER</button>
            </form>
            <div className='participants-container'>
                <h1 className='heading2'>LIST OF PARTICITANTS</h1>
                <div className='participants-list-container'>
                    <div className='title-container'>
                        <p className='title'>Name</p>
                        <p className='title'>Speed</p>
                        <p className='title'>Start Time</p>
                        <p className='title'>End Time</p>
                    </div>
                    {runnerList.map(eachRunner => (
                        <div key={eachRunner.id} className='title-container runner'>
                        <p>{eachRunner.name}</p>
                        <p>{`${eachRunner.speed} km/h`}</p>
                        <p>{`${eachRunner.startTime}:00`}</p>
                        <p> - </p>
                    </div>
                    ))}
                </div>
                <button className='start-button' onClick={onClickStartRace} >Start Race </button>
            </div>
        </div>
    )

    const renderSecondPage = () => {
        return (
        <div className='second-container'>
                <h1 className='heading'>Elepse Time</h1>
                <Timer initialDuration={10} setRunnerList={setRunnerList} setIsRaceStarted = {setIsRaceStarted} runnerDetails = {runnerList} />
                {runnerList.map(each => (
                    <div key={each.id} className='race-track'>
                    <Player speed= {each.speed}>{each.name}</Player>
                </div>
                ))}
            </div>
    )
    }

    return (
        isRaceStarted ? renderSecondPage() : renderFirstPage() 
    )
}

export default FirstPage