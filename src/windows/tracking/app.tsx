import React from 'react'
import { useLogEntriesContext } from './../../shared/context/log-entries.context'
import { RegisterForm } from './../../shared/ui/register-form'
import { useCountDown} from './../../shared/hooks/countdown'

interface Props {

}

const App: React.FC<Props> = (props) => {

    const {state, addLogEntry} = useLogEntriesContext()

    const [timeLeft] = useCountDown(10)

    if(timeLeft === 0) {
        window.close()
    }

    // Hooks
    // const states = useSelector(() => controller.states);

    return (
        <div className='container text-center gap-4 space-x-4 space-y-4'>
            <RegisterForm />
            {timeLeft}
        </div>
    )

}

export default App;