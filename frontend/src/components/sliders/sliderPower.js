import './slider.css';
import Slider from 'react-slider';

const MIN = 50;
const MAX = 1000;

const SliderPower = ({ values, setValues }) => {

  return (
  
      <div className='slider-app'>
        <div className="slider-box">
          <h3>Power <span>Range</span></h3>
          <div className="slider-values">{values[0]} - {values[1]}
          <small>
            Current Range: {values[1] - values[0]}
          </small>
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

export default SliderPower;
