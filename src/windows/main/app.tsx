import React from 'react'
import { useLogEntriesContext } from './../../shared/context/log-entries.context'
import { RegisterForm } from './../../shared/ui/register-form'


interface Props {

}

const App: React.FC<Props> = (props) => {

    const {state, addLogEntry} = useLogEntriesContext()

    // Hooks
    // const states = useSelector(() => controller.states);

    return (
        <div className='container text-center gap-4 space-x-4 space-y-4'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
               Hello world! boo
            </h1>

            {state.entries.map((entry) => {

                return <p>{entry.date.toString()} - {entry.activity}</p>
            })}

            <RegisterForm />

        </div>
    )

}

export default App;