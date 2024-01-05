import React from 'react'

type LogEntry = {
    activity: string
    date: Date
}

type State = {
    entries: LogEntry[]
}

interface Props {

}

const App: React.FC<Props> = (props) => {
    // Hooks
    // const states = useSelector(() => controller.states);

    return (
        <div className='container text-center gap-4 space-x-4 space-y-4'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
               Hello world! boo 
            </h1>

        </div>
    )

}

export default App;