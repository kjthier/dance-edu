import React, { useState, useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import QuestionForm from './QuestionForm'
import { IQuestionAnswer } from '../../types/IQuestionAnswer'
import './Questions.css'
import axios from 'axios'

type QuestionsProps = {
    userId: string
}

const Questions: React.FC<QuestionsProps> = ({ userId }) => {
    const [questions, setQuestions] = useState<IQuestionAnswer[]>([])
    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`https://dance-edu.onrender.com/api/auth/user/${userId}`)
                setUserName(response.data.firstName)
            } catch (error) {
                console.error("An error occurred while fetching student data:", error)
            }
        }
        
        fetchStudentData()
    }, [ userId ])

    const handleNewQuestion = (
        question: string,
        userName: string,
        userId: string
    ) => {
        const newQuestion: IQuestionAnswer = {
            question,
            userName,
            userId,
            timestamp: new Date().toLocaleString(),
        }
        setQuestions([...questions, newQuestion])
    }

    // only to test answers for styling purposes
    const handleTestAnswer = (id: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) => {
                if (q.userId === id) {
                    return {
                        ...q,
                        answer: 'This is a test answer.',
                        answerTimestamp: new Date().toLocaleString(), 
                    }
                }
                return q
            })
        )
    }

    return (
        <Box className='messages-container'>
            <Box className='questions-form'>
                {/* Only render the form if studentName and studentId are available */}
                {userName && userId && (
                    <QuestionForm
                        onNewQuestion={handleNewQuestion}
                        userName={userName}
                        userId={userId}
                    />
                )}
            </Box>
            <Box className='messages-list-container'>
                <Box className='messages-list-heading'>Messages</Box>
                {questions.map((q) => (
                    <Box key={q.userId} className='question-answer-box'>
                        <Text as='p' className='question-text'>
                            {q.question}
                        </Text>
                        <Text as='p' className='timestamp-text'>
                            {q.timestamp}
                        </Text>
                        {q.answer && (
                            <Text as='p' className='answer-text'>
                                {q.answer}
                            </Text>
                        )}
                        {q.answerTimestamp && (
                            <Text as='p' className='timestamp-text'>
                                {q.answerTimestamp}
                            </Text>
                        )}
                        {/* button only to test answers for styling purposes */}
                        <button onClick={() => handleTestAnswer(q.userId)}>
                            Add Test Answer
                        </button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Questions
