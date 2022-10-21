import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <ThreeCircles
            height="200"
            width="200"
            color="#4fa94d"
            wrapperStyle={{ justifyContent: 'center' }}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#0509fa"
            innerCircleColor="#faf205"
            middleCircleColor="#02f3f7"
        />
    );
};
