import indoor from './indoor.jpg'

export const ChooseIndoor = () => {
    return(
        <div className="indoor_container">
            <div>
                <img className='indoor_image' src={indoor} alt='indoor'></img>
            </div>
            <div><h2>Climb Indoor</h2></div>
        </div>
    )
}