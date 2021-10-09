import React from 'react'
import { Container, Jumbotron } from 'reactstrap'
import library from './library.png';

function AboutUs() {
	return (
		<div>
		<Jumbotron fluid>
		  <Container fluid >
			<img style={{ width: '90vw', marginTop: 10, boxShadow: '1px 1px black' }} src={library} />
			<div style={{ textAlign: 'center', marginTop: 20, color: '#337ab7' }}>
				<h1 className="display-3">सार्वजनिक वाचनालय</h1>
				<h2>राजगुरूनगर</h2>
			</div>
			<p className="lead">Established in 1862 this is the oldest </p>
			<hr/>
			This website is part of Crowd sourced initaitive by Janiv Pariwar and various other organization.
			<img style={{ width: '90vw', marginTop: 10, boxShadow: '1px 1px black' }} src={library} />
			<div style={{ textAlign: 'center', marginTop: 20, color: '#337ab7' }}>
				<h1 className="display-3">सार्वजनिक वाचनालय</h1>
				<h2>राजगुरूनगर</h2>
			</div>
			<p className="lead">Established in 1862 this is the oldest </p>
			<hr/>
			This website is part of Crowd sourced initaitive by Janiv Pariwar and various other organization.

		  </Container>
		</Jumbotron>
	  </div>
	)
}

export default AboutUs
