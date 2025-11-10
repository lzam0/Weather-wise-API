import WeatherCard from "../components/WeatherCard";
import "../styles/Home.css"
import { getText } from "../utils/contentLoader";

function Home(){
    return(
        <div className="home">
            <div className="home-content">
                <h1> {getText("home", "title")} </h1>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <p className="description">
                    {getText("home", "description")}
                </p>
            </div>
        </div>
    )
}

export default Home;