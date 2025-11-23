import '../../App.css';
import FloatingLines from './FloatingLines';
import '../Home/button.css'

const HeroSection = () => {
    return (
        <div className='max-sm:h-[50vh]' style={{ width: '100%', height: '60vh' , position: 'relative' }}>
            <FloatingLines
                enabledWaves={['top', 'middle', 'bottom']}
                // Array - specify line count per wave; Number - same count for all waves
                lineCount={[10, 15, 20]}
                // Array - specify line distance per wave; Number - same distance for all waves
                lineDistance={[8, 6, 4]}
                bendRadius={5.0}
                bendStrength={-0.5}
                interactive={true}
                parallax={true}
            />
            <div className='w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[#00000085]'>
                <div className='text-4xl max-md:text-[3.5vw] max-sm:text-[6vw] text-white font-bold text-center flex flex-col gap-2.5'>
                    <h1>A Reliable
                        <br />
                        Marketplace Platform
                    </h1>
                    <p>
                        Find the perfect jog for you
                    </p>
                    <button className='shadow__btn mt-3.5 md:text-[17px] max-md:text-[2vw] max-sm:text-[4vw]'>Create a Job</button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
