import outdoor from './outdoor.PNG'

export const ChooseOutdoor = () => {
    return(
        <div className="outdoor_container">
            <div>
                <img className='outdoor_image' src={outdoor} alt='outdoor'></img>
            </div>
            <div><h2>Climb Outdoor</h2></div>
        </div>
    )
}