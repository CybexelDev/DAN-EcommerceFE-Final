import React from 'react'

function AboutWaveSection() {
  return (
    <div className='w-full h-full'>
        <div className="relative w-full h-full bg-[#f6f0f4]">
  {/* Wave top divider */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    <svg
      className="relative block w-full h-[100%]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill="#ffffff"   // top section color
        d="M0,224L48,182.7C96,161,172,119,268,124C384,129,480,183,576,208.7C672,205,708,213,864,181.3C960,149,1056,107,1152,100.3C1248,100,1344,132,1392,164L1440,200L1440,0L0,0Z"
      ></path>
    </svg>
  </div>

  {/* Section content */}
  <div className="relative z-10 px-8 py-20 text-center">
    <h2 className="text-3xl font-bold text-gray-800">Wave Section</h2>
    <p className="mt-4 text-lg text-gray-600">
      This section has a smooth wave at the top
    </p>
  </div>
</div>
    </div>
  )
}

export default AboutWaveSection