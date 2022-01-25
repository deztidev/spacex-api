import React, { Component } from 'react';

import Loader from '../components/Loader.jsx';
import Card from '../components/Card.jsx';
import Modal from '../components/Modal.jsx';

import logo from '../assets/images/spacex-logo.png';

class PreviousLaunches extends Component {
	state = {
		previous: [
			{
				links: {
					patch: {},
				},
				date_utc: '',
			},
		],
		rockets: [],
		index: 0,
		previousLaunchIsOpen: false,
	};

	async componentDidMount() {
		this.setState({ loading: true, error: null });
		try {
			const response = await fetch(
				'https://api.spacexdata.com/v4/launches/past'
			);
			const previous = await response.json();
			this.setState({ previous: previous.reverse() });

			const rocketsResponse = await fetch(
				'https://api.spacexdata.com/v4/rockets'
			);
			const rockets = await rocketsResponse.json();
			this.setState({ loading: false, rockets: rockets });
		} catch (error) {
			this.setState({ loading: false, error: error });
		}
	}

	handlePreviousLaunch = i => {
		this.setState(state => ({
			previousLaunchIsOpen: !state.previousLaunchIsOpen,
			index: i,
		}));
	};

	render() {
		if (this.state.loading) {
			return <Loader />;
		}
		return (
			<>
				<div className='cards-container less-margin'>
					{this.state.previous.map((previous, i) => (
						<Card key={i}>
							<img
								className={`container__image`}
								style={
									previous.links.patch.small
										? { objectFit: 'contain' }
										: {
												objectFit: 'contain',
												position: 'relative',
												left: '2%',
												filter: 'brightness(0)',
										  }
								}
								src={
									previous.links.patch.small
										? previous.links.patch.small
										: logo
								}
								alt={previous.name}
							/>
							<div className='container__info'>
								<h2 className='container__title'>
									{previous.name}
								</h2>
								<p className='container__paragraph'>
									{previous.details}
								</p>
								<button
									className='container__button'
									onClick={() => this.handlePreviousLaunch(i)}
								>
									View More
								</button>
							</div>
						</Card>
					))}
				</div>
				{this.state.previousLaunchIsOpen ? (
					<Modal handleClick={this.handlePreviousLaunch}>
						<h2>{this.state.previous[this.state.index].name}</h2>
						<img
							className='modal__image'
							style={
								this.state.previous[this.state.index].links
									.patch.small
									? { objectFit: 'contain' }
									: {
											objectFit: 'contain',
											position: 'relative',
											left: '2%',
											filter: 'brightness(0)',
									  }
							}
							src={
								this.state.previous[this.state.index].links
									.patch.small
									? this.state.previous[this.state.index]
											.links.patch.small
									: logo
							}
							alt={this.state.previous[this.state.index].name}
						/>
						<div className='info-container'>
							<span className='info-container__items'>
								<h3>Date</h3>
								{this.state.previous[
									this.state.index
								].date_utc.slice(0, 10)}
							</span>
							<span className='info-container__items'>
								<h3>Success</h3>{' '}
								{this.state.previous[this.state.index]
									.success ? (
									<span role='image' aria-label='true icon'>
										✅
									</span>
								) : (
									<span role='image' aria-label='false icon'>
										❌
									</span>
								)}
							</span>
							<span className='info-container__items'>
								<h3>Flight Number</h3>
								{
									this.state.previous[this.state.index]
										.flight_number
								}
							</span>
							<span className='info-container__items'>
								<h3>Rocket</h3>
								{this.state.previous[this.state.index].rocket ==
									this.state.rockets[0].id && 'Falcon 1'}
								{this.state.previous[this.state.index].rocket ==
									this.state.rockets[1].id && 'Falcon 9'}
								{this.state.previous[this.state.index].rocket ==
									this.state.rockets[2].id && 'Falcon Heavy'}
								{this.state.previous[this.state.index].rocket ==
									this.state.rockets[3].id && 'Starship'}
							</span>
						</div>
						<p className='modal__paragraph'>
							{this.state.previous[this.state.index].details}
						</p>
						<a
							href={
								this.state.previous[this.state.index].links
									.webcast
							}
							target='_blank'
						>
							<button className='modal__link-button'>
								Watch it on youtube
							</button>
						</a>
					</Modal>
				) : null}
			</>
		);
	}
}

export default PreviousLaunches;
