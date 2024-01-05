import React from 'react'
import { Dispatch,SetStateAction,  useCallback, useState, useEffect} from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
  ): [T, SetValue<T>] {

    const broadcastChannel = new BroadcastChannel(`${key}_channel`);

    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = useCallback((): T => {
      // Prevent build error "window is undefined" but keeps working
      if (typeof window === 'undefined') {
        return initialValue
      }
  
      try {
        const item = window.localStorage.getItem(key)
        return item ? (parseJSON(item) as T) : initialValue
      } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error)
        return initialValue
      }
    }, [initialValue, key])
  
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(readValue)
  
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue: SetValue<T> = (value) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value
  
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(newValue))
  
        // Save state
        setStoredValue(newValue)
  
        // We dispatch a custom event so every useLocalStorage hook are notified
        broadcastChannel.postMessage(newValue)
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error)
      }
    }
  
    useEffect(() => {
      setStoredValue(readValue())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    broadcastChannel.onmessage = (ev) => {
        if(JSON.stringify(ev.data) !== JSON.stringify(storedValue)) {
            setStoredValue(ev.data)
        }
    };
  
    return [storedValue, setValue]
  }
  
  // A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
    try {
      return value === 'undefined' ? undefined : JSON.parse(value ?? '', jsonDateReviver)
    } catch {
      console.log('parsing error on', { value })
      return undefined
    }
  }

  function jsonDateReviver(_key: string, value: any) {
    // plug this regex into regex101.com to understand how it works
    // matches 2019-06-20T12:29:43.288Z (with milliseconds) and 2019-06-20T12:29:43Z (without milliseconds)
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,}|)Z$/;

    if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
    }

    return value;
}