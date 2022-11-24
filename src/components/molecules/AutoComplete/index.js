import React, { useState } from 'react'
import { Input } from '../../atoms'
import styles from './AutoComplete.module.css'

const AutoComplete = ({ className, defaultValue, suggestions, suggestionObjectKeyId, suggestionObjectKey, onSelect, emptyDataMessage, ...rest }) =>
{
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [input, setInput] = useState(defaultValue ? defaultValue : '')
    const [isChoosing, setIsChoosing] = useState(false)

    suggestionObjectKeyId = typeof suggestionObjectKeyId === 'string' ? suggestionObjectKeyId : 'id'

    const onInputChange = e =>
    {
        const userInput = e.target.value
        const unLinked = suggestions.filter(suggestion => suggestion[suggestionObjectKey].toLowerCase().indexOf(userInput.toLowerCase()) > -1)

        setInput(e.target.value)
        setFilteredSuggestions(unLinked)
        setActiveSuggestionIndex(0)
        setShowSuggestions(true)
    }

    const onInputKeyDown = e =>
    {
        if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()

        if(e.key === 'ArrowUp' && activeSuggestionIndex > 0)
        {
            setActiveSuggestionIndex(activeSuggestionIndex-1)
        }
        else if(e.key === 'ArrowDown' && activeSuggestionIndex < (filteredSuggestions.length-1))
        {
            setActiveSuggestionIndex(activeSuggestionIndex+1)
        }
        else if(e.key === 'Enter' && showSuggestions)
        {
            e.preventDefault()
            const selectedSuggestion = filteredSuggestions.filter((suggestion, index) => index === activeSuggestionIndex)
            onSuggestionClicked(selectedSuggestion[0][suggestionObjectKeyId], selectedSuggestion[0][suggestionObjectKey])
        }
    }

    const onInputBlur = () =>
    {
        if(showSuggestions && isChoosing === false)
        {
            onSelect('')
            setInput('')
            setFilteredSuggestions([])
            setActiveSuggestionIndex(0)
            setShowSuggestions(false)
        }
    }

    const onSuggestionClicked = (currVal, currName) =>
    {
        onSelect(currVal)
        setInput(currName)
        setFilteredSuggestions([])
        setActiveSuggestionIndex(0)
        setShowSuggestions(false)
    }

    const Suggestions = () =>
    {
        return (
            <ul
                onMouseEnter={() => (isChoosing === false && filteredSuggestions.length) && setIsChoosing(true)}
                onMouseLeave={() => isChoosing === true && setIsChoosing(false)}
                className={styles['suggestions-wrapper']}
            >
                {filteredSuggestions.length ? (
                    filteredSuggestions.map((suggestion, index) =>
                    {
                        let currClassName = ''
                        if(index === activeSuggestionIndex) currClassName = 'active'
                        
                        return (
                            <li
                                className={`${styles['suggestion-item']}${currClassName !== '' ? ' ' + styles[currClassName] : ''}`}
                                onClick={() => onSuggestionClicked(suggestion[suggestionObjectKey], suggestion[suggestionObjectKey])}
                                key={index}
                            >
                                {suggestion[suggestionObjectKey]}
                            </li>
                        )
                    })
                ) : (
                    <li className={styles['suggestion-empty']}>
                        {typeof emptyDataMessage === 'string' ? emptyDataMessage : 'Tidak ada data.'}
                    </li>
                )}
            </ul>
        )
    }

    return (
        <div className={styles.wrapper}>
            <Input
                type="text"
                value={input}
                onChange={onInputChange}
                onKeyDown={onInputKeyDown}
                onBlur={onInputBlur}
                {...rest}
            />
            {showSuggestions && input && (<Suggestions />)}
        </div>
    )
}

export default AutoComplete