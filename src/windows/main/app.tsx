import React from 'react'
import { useLogEntriesContext } from './../../shared/context/log-entries.context'
import { RegisterForm } from './../../shared/ui/register-form'
import { MainMenu } from '../../shared/ui/main-menu'
import { Box, Toolbar, AppBar } from '@mui/material'
import { LogEntriesTable } from '../../shared/ui/log-entries'

interface Props {

}

const App: React.FC<Props> = (props) => {

    return (
        <>
        <MainMenu width={300} />

        <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${300}px)` },
          ml: { sm: `${300}px` },
          background: '#fff'
        }}
      >
          <Box margin={2}><RegisterForm /></Box>
    </AppBar>

        <Box style={{marginLeft: 300}} marginTop={11} padding={2}>
        
            <LogEntriesTable />
           
        </Box>
      
        </>
    )

}

export default App;