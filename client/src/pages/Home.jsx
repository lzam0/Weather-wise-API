import WeatherCard from "../components/WeatherCard";
import "../styles/Home.css"

function Home(){
    return(
        <div className="home">
            <div className="home-content">
                <h1> Your Weather Companion </h1>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <p className="description">
                    Daily accurate forecast tailored for you
                </p>
            </div>
        </div>
    )
}

export default Home;