import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';

/*
* See: https://github.com/airbnb/enzyme/issues/1501
* * Needs react-dom
* * recommended to use react-native-mock
*
* Might add react-native-mock/mock require later
* */

Enzyme.configure({ adapter: new Adapter() });
