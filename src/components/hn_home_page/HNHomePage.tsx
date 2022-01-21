import { HNHeader } from '../hn_header/HNHeader';
import { HNBody } from '../hn_body/HNBody';
import pic from '../../assets/images/dummy.png';

export const HNHomePage = () => {
    return (
        <div className='home'>
            <div className='title-container'>
                <HNHeader />
                <img src={pic} alt="Anonymous photo" id='dummy-pic' />
            </div>
            <HNBody />
        </div>
    );
}