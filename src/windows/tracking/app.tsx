import React from 'react'

import { RegisterForm } from './../../shared/ui/register-form'
import { useCountDown} from './../../shared/hooks/countdown'

const App: React.FC = () => {

    const [timeLeft] = useCountDown(10)

    if(timeLeft === 0) {
        window.close()
    }

    return (
        <div className='container text-center gap-4 space-x-4 space-y-4'>
            <RegisterForm onSubmitCorollary={window.close} />
            {timeLeft}
        </div>
    )

}

export default App;