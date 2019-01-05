import numeral from 'numeral';
import './g2';
import ChartCard from './ChartCard';
/*import Pie from './Pie';*/
import MiniProgress from './MiniProgress';
import Field from './Field';
/*import TagCloud from './TagCloud';
import TimelineChart from './TimelineChart';*/

const yuan = val => `₸ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  MiniProgress,
  ChartCard,
  Field
};

export {
  Charts as default,
  yuan,
  MiniProgress,
  ChartCard,
  Field
};
