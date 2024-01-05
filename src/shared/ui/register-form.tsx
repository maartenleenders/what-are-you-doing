import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useLogEntriesContext } from '../context/log-entries.context'

type FormValues = {
    activity: string
}

export const RegisterForm = () => {

    const {
        register,
        handleSubmit,
        reset,
      } = useForm<FormValues>()
      const { addLogEntry } = useLogEntriesContext()

      const onSubmit: SubmitHandler<FormValues> = ({ activity }) => {
        addLogEntry({
            activity,
            date: new Date()
        })
        reset()
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("activity")} />
            <input type="submit" />
        </form>
    )
}