import React from 'react'
import './wtsp.css'
import { MessageCircle } from 'lucide-react';

const Whatsapp = () => {
    return (
        <>
            <a href="https://api.whatsapp.com/send?phone=+971509836868&text=Hi this from DaralnahdaTrading" class="float" target="_blank">
                <MessageCircle className='my-float' />
            </a>
        </>
    )
}

export default Whatsapp