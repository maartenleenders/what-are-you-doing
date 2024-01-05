import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useLogEntriesContext } from '../context/log-entries.context'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { FormTextField } from './form/form-text-field';

type FormValues = {
    activity: string
}

interface RegisterFormProps {
    onSubmitCorollary?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ( {onSubmitCorollary} ) => {

    const {
        register,
        handleSubmit,
        control,
        reset,
      } = useForm<FormValues>()
      const { addLogEntry } = useLogEntriesContext()

      const onSubmit: SubmitHandler<FormValues> = ({ activity }) => {
        console.log('FOOO')
        addLogEntry({
            activity,
            date: new Date()
        })

        onSubmitCorollary?.();
        reset()
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1} direction="column">
                <Stack spacing={1} direction="row">
                    <FormTextField name="activity" control={control} id="outlined-basic" label="Activity" variant="outlined" style={{ width: '100%'}}/>
                    <Button type="submit" variant="contained" endIcon={<SendIcon/>}>Send</Button>
                </Stack>
            </Stack>
        </form>
    )
}