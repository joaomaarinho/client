import Intro from "../components/Intro"
import Slogan from "../components/Slogan"
import ImageSlider from '../components/Slider/ImageSlider';
import { SliderData } from '../components/Slider/SliderData';
import { Button } from "../components/Button";
import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../components/HomeButton.css'

// class Home extends Page {
//     render() {
//         return (
//             <div>
//                 <Slogan/>
//                 <Intro />
//                 <div>
//                     <ImageSlider slides={SliderData}/>
//                 </div>      
//                 <div className="homeLinks">
//                 <Button className="space">pronta entrega</Button>
//                 <Button className="space">encomenda</Button>
//             </div>
//             </div>

//         )
//     }
// }

function Home() {

	const history = useHistory();

	// useEffect(() => {
	// 	axios(`https://graph.instagram.com/100660562404289?fields=id,media_type,media_url,username,timestamp&access_token=${process.env.REACT_APP_INSTAGRAM_KEY}`)
	// 		.then(res => console.log(res))
	// }, [])

	return (
		<div>
			<Slogan />
			<Intro />
			<div>
				<ImageSlider slides={SliderData} />
			</div>
			<div className="homeLinks">
				<div className="homeLinks-btn">
					<Button className="the-btn" onClick={() => history.push("/prontaentrega")}>pronta entrega</Button>
				</div>
				<div className="homeLinks-btn">
					<Button onClick={() => history.push("/encomenda")}>encomenda</Button>
				</div>
			</div>
		</div>
	)
}

export default Home