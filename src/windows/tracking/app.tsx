import React from 'react'

import { RegisterForm } from './../../shared/ui/register-form'
import { useCountDown} from './../../shared/hooks/countdown'
import Box from '@mui/material/Box'

const App: React.FC = () => {

    const [timeLeft] = useCountDown(10)

    if(timeLeft === 0) {
        window.close()
    }

    return (
        <Box marginTop={4} marginLeft={1} marginRight={1} marginBottom={1}>
            <RegisterForm onSubmitCorollary={() => window.close()}/>
        </Box>
    )

}
export default App;