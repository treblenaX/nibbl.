import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function FooterModule() {
    return (
        <div className="footer">
            <h1>
                Made with <FontAwesomeIcon icon={faHeart} /> by Elbert Cheng
            </h1>
        </div>
    );
}