import React from 'react'
import { ScrollView, Alert, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { checkGooglePlayServices } from 'react-native-google-api-availability-bridge'
import WeatherCard from './cards/weather/WeatherCard'
import ShuttleCard from './cards/shuttle/ShuttleCard'
import EventsCard from './cards/events/EventsCard'
import LinksCard from './cards/links/LinksCard'
import NewsCard from './cards/news/NewsCard'
import DiningCard from './cards/dining/DiningCard'
import SpecialEventsCard from './cards/specialEvents/SpecialEventsCard'
import StudentIDCardContainer from './cards/studentId/StudentIDCardContainer'
import FinalsCard from './cards/finals/FinalsCard'
import ClassesCardContainer from './cards/classes/ClassesCardContainer'
import ParkingCard from './cards/parking/ParkingCard'
import { platformAndroid, gracefulFatalReset } from '../../util/general'
import logger from '../../util/logger'

export class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			updatedGoogle: true, // eslint-disable-line
			refreshing: false,
		}
	}

	componentDidMount() {
		logger.ga('View Loaded: Home')

		this.props.navigation.addListener('willFocus', () => {
			this.updateCards()
		})

		this._cards = []
		if (this._scrollview) {
			this._scrollview.scrollTo({ y: this.props.lastScroll, animated: false })
		}
		if (platformAndroid()) {
			this.updateGooglePlay()
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.cards !== nextProps.cards ||
			this.props.cardOrder !== nextProps.cardOrder ||
			this.props.user.isLoggedIn !== nextProps.user.isLoggedIn) {
			return true
		} else {
			return false
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.user.invalidSavedCredentials &&
			this.props.user.invalidSavedCredentials) {
			Alert.alert(
				'Logged Out.',
				'You have been logged out because your credentials could not be verified. Please try to log in again.',
				[
					{
						text: 'Cancel',
						style: 'cancel'
					},
					{
						text: 'Log in',
						onPress: () => {
							this.props.navigation.navigate('LoginScreen')
						}
					}
				]
			)
		}
	}

	updateCards = () => {
		this.props.updateDining()
		this.props.updateEvents()
		this.props.updateLinks()
		this.props.updateNews()
		this.props.updateParking()
		this.props.updateSchedule()
		this.props.updateShuttle()
		this.props.updateShuttleArrivals()
		this.props.updateSpecialEvents()
		this.props.updateStudentProfile()
		this.props.updateWeather()
	}

	pullToRefresh = () => {
		this.setState({ refreshing: true })
		this.updateCards()
		this.setState({ refreshing: false })
	}

	handleScroll = (event) => {
		if (this.props.updateScroll) {
			this.props.updateScroll(event.nativeEvent.contentOffset.y)
		}
	}

	loadCards = () => {
		const activeCards = []

		if (Array.isArray(this.props.cardOrder)) {
			this.props.cardOrder.forEach((card) => {
				if (this.props.cards[card].active) {
					// Skip cards if they require authentication
					// and user is not authenticated
					if (this.props.cards[card].authenticated) {
						if (!this.props.user.isLoggedIn) {
							return
						} else if (this.props.cards[card].classifications &&
                                   this.props.cards[card].classifications.student &&
                                   !this.props.user.profile.classifications.student) {
							return
						}
					}

					switch (card) {
						case 'specialEvents':
							activeCards.push(<SpecialEventsCard key="specialEvents" />)
							break
						case 'studentId':
							activeCards.push(<StudentIDCardContainer key="studentId" />)
							break
						case 'finals':
							activeCards.push(<FinalsCard key="finals" />)
							break
						case 'schedule':
							activeCards.push(<ClassesCardContainer key="schedule" />)
							break
						case 'weather':
							activeCards.push(<WeatherCard key="weather" />)
							break
						case 'shuttle':
							activeCards.push(<ShuttleCard key="shuttle" />)
							break
						case 'dining':
							activeCards.push(<DiningCard key="dining" />)
							break
						case 'events':
							activeCards.push(<EventsCard key="events" />)
							break
						case 'links':
							activeCards.push(<LinksCard key="links" />)
							break
						case 'news':
							activeCards.push(<NewsCard key="news" />)
							break
						case 'parking':
							activeCards.push(<ParkingCard key="parking" />)
							break
						default:
							return gracefulFatalReset(new Error('Invalid card in state: ', card))
					}
				}
			})
		}
		return activeCards
	}

	updateGooglePlay = () => {
		checkGooglePlayServices((result) => {
			if (result === 'update') {
				this.setState({ updatedGoogle: false }) // eslint-disable-line
			}
		})
	}

	render() {
		return (
			<ScrollView
				ref={(c) => { this._scrollview = c }}
				onScroll={this.handleScroll}
				scrollEventThrottle={0}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={() => this.pullToRefresh()}
					/>
				}
			>
				{/* LOAD CARDS */}
				{ this.loadCards() }
			</ScrollView>
		)
	}
}

const mapStateToProps = (state, props) => ({
	cards: state.cards.cards,
	cardOrder: state.cards.cardOrder,
	lastScroll: state.home.lastScroll,
	user: state.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	// Cards
	updateDining: () => { dispatch({ type: 'UPDATE_DINING' }) },
	updateEvents: () => { dispatch({ type: 'UPDATE_EVENTS' }) },
	updateLinks: () => { dispatch({ type: 'UPDATE_LINKS' }) },
	updateNews: () => { dispatch({ type: 'UPDATE_NEWS' }) },
	updateParking: () => { dispatch({ type: 'UPDATE_PARKING' }) },
	updateSchedule: () => { dispatch({ type: 'UPDATE_SCHEDULE' }) },
	updateShuttle: () => { dispatch({ type: 'UPDATE_SHUTTLE' }) },
	updateShuttleArrivals: () => { dispatch({ type: 'UPDATE_SHUTTLE_ARRIVALS' }) },
	updateSpecialEvents: () => { dispatch({ type: 'UPDATE_SPECIAL_EVENTS' }) },
	updateStudentProfile: () => { dispatch({ type: 'UPDATE_STUDENT_PROFILE' }) },
	updateWeather: () => { dispatch({ type: 'UPDATE_WEATHER' }) },
	// Scroll
	updateScroll: (scrollY) => { dispatch({ type: 'UPDATE_HOME_SCROLL', scrollY }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
