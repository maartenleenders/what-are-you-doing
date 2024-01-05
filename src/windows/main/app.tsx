import React from 'react'
import { useLogEntriesContext } from './../../shared/context/log-entries.context'
import { RegisterForm } from './../../shared/ui/register-form'
import { MainMenu } from '../../shared/ui/main-menu'
import { Box } from '@mui/material'
import { LogEntriesTable } from '../../shared/ui/log-entries'

interface Props {

}

const App: React.FC<Props> = (props) => {

    return (
        <>
        <MainMenu width={300} />

        <Box style={{marginLeft: 300}} padding={2}>
            <LogEntriesTable />
            <RegisterForm />
        </Box>
      
        </>
    )

}

export default App;