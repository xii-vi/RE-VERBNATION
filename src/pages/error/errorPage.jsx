import { Link } from 'react-router-dom';
import errorPage from "../../assest/errorPage.png"
export const ErrorPage = () => {
    return (
            <div className='text-center main'>
                <img className="img-responsive error-page-img" src={errorPage} alt="error-page" />
                <h3 className='py-2'>Page not found</h3>
                <Link to="/" className='btn btn-primary'>Explore</Link>
            </div>
    )
}