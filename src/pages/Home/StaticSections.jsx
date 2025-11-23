import React from 'react';
import '../Home/button.css'
import image1 from '../../assets/download.jpg'
import image2 from '../../assets/download (1).jpg'
import image3 from '../../assets/download (2).jpg'

const StaticSections = () => {
    return (
        <div className='my-9'>
            <h1 data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0" className='text-center text-5xl max-lg:text-4xl'>Top Categories</h1>
            <div className='mx-auto px-3 my-9 max-sm:max-w-[430px] max-w-[1200px] gap-10 grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-3'>

                <div data-aos="zoom-out-down" className="cards">
                    <div className="w-full h-full cards2">
                        <div className='pb-2.5'>
                            <img className='rounded-t-2xl w-full h-[250px]' src={image1} alt="" />
                            <h1 className='mt-2 text-2xl text-center'>Digital Marketing</h1>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-out-down" className="cards">
                    <div className="w-full h-full cards2">
                        <div className='pb-2.5'>
                            <img className='rounded-t-2xl w-full h-[250px]' src={image2} alt="" />
                            <h1 className='mt-2 text-2xl text-center'>Programming</h1>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-out-down" className="cards">
                    <div className="w-full h-full cards2">
                        <div className='pb-2.5'>
                            <img className='rounded-t-2xl w-full h-[250px]' src={image3} alt="" />
                            <h1 className='mt-2 text-2xl text-center'>Logo Design</h1>
                        </div>
                    </div>
                </div>
            </div>
            <h1 data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0"  className='text-center text-5xl max-lg:text-4xl max-sm:text-3xl mb-3'>About The Platform </h1>
            <p data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0"  className='text-center text-gray-300'>PlatformName is a leading job marketplace that connects job seekers with employers. <br />Our platform providers a seamless experience for finding and posting jobs</p>
        </div>
    );
};

export default StaticSections;