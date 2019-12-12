import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Page1Fragment from '../components/FormFragments/Page1Fragment';
import Page2Fragment from '../components/FormFragments/Page2Fragment';
import Page3Fragment from '../components/FormFragments/Page3Fragment';
import Page4Fragment from '../components/FormFragments/Page4Fragment';
import LandingPage from '../screens/landingPage';
import Font from '../themes/fonts';
import { scale } from '../utils/scaling';

const AppNavigator = createStackNavigator(
	{
		Page1Fragment: {
			screen: Page1Fragment
		},
		Page2Fragment: {
			screen: Page2Fragment
		},
		Page3Fragment: {
			screen: Page3Fragment
		},
		Page4Fragment: {
			screen: Page4Fragment
		},
		LandingPage: {
			screen: LandingPage
		}
	},
	{
		defaultNavigationOptions: {
			title: 'Multi Form Progress',
			headerStyle: {
				backgroundColor: '#A141BE',
				borderRadius: 4
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: Font.fontType.bold,
				fontSize: scale(Font.fontSize.med),
				color: '#fff',
				paddingHorizontal: scale(20)
			}
		}
	}
);

export default createAppContainer(AppNavigator);
