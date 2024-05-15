import React from 'react'
import {Link} from 'react-router-dom'

function LightingPage() {
  return (
    <div>
      <h1 className='text-title-lg'>Lighting & Modules</h1>
      <p className='text-gray-600 mb-7'>Control Dimmers, Appliance Modules and Outlets.</p>
      <h5 className='text-title-sm'>Have the lights come on to greet you</h5>
      <p className='mb-7'>It's a good morning when you wake up to coffee brewing and lights on to greet you at just the right time.

How many times have you made it to work and realized you forgot to turn off the lights in your home? SmartFOX® Home and a Dimmer Module make it easy to operate lights when you're not at home.</p>

<Link className='underline text-blue-600'>See which devices we support </Link>

<h5 className='text-title-sm mt-5'>You'll also need a Z-Wave bridge</h5>
<p>Wirelessly connects compatible Z-Wave products to the internet allowing you complete control over your home from wherever you are.</p>

<button className='text-white bg-foxColor p-2 mt-5 '>Shop Now</button>
    </div>
  )
}

export default LightingPage