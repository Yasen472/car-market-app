import './slider.css';
import Slider from 'react-slider';

const MIN = 5000;
const MAX = 1000000;

const SliderKilometres = ({ values, setValues }) => {

  return (

    
    <div className='slider-app'>
      <div className="slider-box">
        <h3>Kilometres <span>Range</span></h3>
        <div className="slider-values">{values[0]} - {values[1]}
        </div>
        <Slider
          className="slider"
          onChange={setValues}
          value={values}
          min={MIN}
          max={MAX}
        />
      </div>
    </div>
  );
};

export default SliderKilometres;
