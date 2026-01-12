import React from 'react'
import './wtsp.css'
import { MessageCircle } from 'lucide-react';

const Whatsapp = () => {
    return (
        <>
            <a href="https://api.whatsapp.com/send?phone=+9710509836868&text=Hi%21%20this%20m%C3%from%20DnadarTrading" class="float" target="_blank">
                <MessageCircle className='my-float' />
            </a>
        </>
    )
}

export default Whatsapp